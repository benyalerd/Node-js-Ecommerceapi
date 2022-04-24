const express = require('express');
const router = express.Router();
const {Product} = require('../model/Product');
const {ProductSKU} = require('../model/ProductSKU');
const {ProductContent} = require('../model/ProductContent');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const config = require('config');
const {auth} = require('../middleware/auth');
const {Shop} = require('../model/Shop');
const ObjectId = require('mongodb').ObjectID;
const {productValidation} = require('../helper/validation/validation');
const conn = require('../database/db')

const logger = winston.createLogger(logConfiguration);

router.post("/searchProduct",auth,async(req,res)=>{
    
    try
    {
        
        if(!req.body.limit){
            req.body.limit = 10;
        }
        if(!req.body.page){
            req.body.page = 0;
        }      
       var query = {"shop":ObjectId(req.body.shopId)};
       var sorting = {};
       if(req.body.productName != null && req.body.productName != ""){
           query["productName"] = { $regex: req.body.productName   }
       }
       if(req.body.isActive == true){
        query["isActive"] = req.body.isActive;
       }
       if(req.body.tabType == 2){
        query["stock"] = { $lte : 0 };
       }
       if(req.body.sortingValue != null &&req.body.sortingValue != "" )
       {
           if(req.body.sortingDesc)
           {
            sorting[req.body.sortingValue] = -1
           }
           else{
            sorting[req.body.sortingValue] = 1
           }
       }
       else{
        sorting["_id"] = 1
       }
        let product = await Product.find(query)
        .sort(sorting)
        .limit(req.body.limit)
        .skip(req.body.page*req.body.limit)
        .exec();

        for (const element of product) {
            var path = await ProductContent.findOne( { "product": element._id,"contentType":1 } );         
            
            
            element.imagePath = path.imagePath;
            
        };
    
        let totalRecord = await Product.find(query).count();
        if(product == null)return res.status(200).send({errorMsg:"",isError:false});
        return res.status(200).send({errorMsg:"success",isError:false,productList:product,totalRecord:totalRecord});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/addProduct",auth,async(req,res)=>{
    const session = await conn.startSession();
    try
    {
        session.startTransaction();    

        const {error} = productValidation(req.body);
        if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
        
        const shop = await Shop.findById(req.body.shopId);        
        if(shop == null)return res.status(200).send({errorMsg:"not found shop",isError:true});
        else if(shop.isActive != true || shop.isDelete != false){
            return res.status(200).send({errorMsg:"not found shop",isError:true});
        }
        
        let product = new Product({stock:req.body.stock,shop:req.body.shopId,merchant:req.body.merchantId,isActive:true,maxPrice:req.body.maxPrice,minPrice:req.body.minPrice,productName:req.body.productName,productDesc:req.body.productDesc,createdDate:new Date(),createdBy:req.body.merchantId,ImagePath:req.body.imagePath});
        product = await product.save({ session });      
        var productId = product._id;
        
        for (const element of req.body.productMainContent) {
             element.product = productId;            
        };

        for (const element of req.body.productSku) {
                let sku = new ProductSKU({stock:element.stock,fullPrice:element.fullPrice,product:productId,skuName:element.skuName,option:element.option,value:element.value,imagePath:element.imagePath});
                sku = await sku.save({ session });
                var skuId = sku._id;
                element.ProductSkuContent.product = productId;
                element.ProductSkuContent.skuId = skuId;
                req.body.productMainContent.push(element.ProductSkuContent);
        };
        await ProductContent.insertMany(req.body.productMainContent,{session});
       
        await session.commitTransaction();
        return res.status(200).send(product);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        await session.abortTransaction();
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
    session.endSession();
});

router.post("/getProductDetail",auth,async(req,res)=>{
    try
    {
        const product = await Product.findById(req.body.productId);
        
        if(product == null)return res.status(200).send({errorMsg:"not found product",isError:true});
        
        const productSku = await ProductSKU.find({product:ObjectId(req.body.productId)});
        const productContent = await ProductContent.find({product:ObjectId(req.body.productId)});
        const productMainContent = [];
        const productSkuList = [];
        let skuName = "";
        for (const element of productContent) {
            if(element.contentType == 1 || element.contentType == 2){
                productMainContent.push(element);
            }
            else if(element.contentType == 3){
                var sku = productSku.find(x => x._id == element.skuId);
                if(sku)
                {
                  skuName = sku.skuName;
                  var newSku = {
                    "productSkuContent":element,
                    "product":sku.product,
                    "skuName":sku.skuName,
                    "option":sku.option,
                    "stock":sku.stock,
                    "fullPrice":sku.fullPrice
                  }
                  productSkuList.push(newSku);
                }
            }
        }
        return res.status(200).send({maxPrice:product.maxPrice,minPrice:product.minPrice,skuName:skuName,errorMsg:"success",isError:false,productName:product.productName,productDesc:product.productDesc,productMainContent:productMainContent,productSkuList:productSkuList,stock:product.stock,isActive:product.isActive});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/deleteProduct",auth,async(req,res)=>{
    const session = await conn.startSession();
    try
    {
        session.startTransaction();    

        let product = await Product.findOne({_id:req.body.productId});      
        if(product == null)return res.status(200).send({errorMsg:"not found product",isError:true});
        product = await product.remove({session});

        const result = await ProductSKU.remove({product:ObjectId(req.body.productId)},{session});
        const contentResult = await ProductContent.remove({product:ObjectId(req.body.productId)},{session});
        await session.commitTransaction();
        return res.status(200).send(product);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        await session.abortTransaction();
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/updateProductDetail",auth,async(req,res)=>{
    const session = await conn.startSession();
    try
    {
        session.startTransaction();    
        let product = await Product.findById(req.body.productId);      
        if(product == null)return res.status(200).send({errorMsg:"not found product",isError:true});
        if(req.body.productName != null &&req.body.productName == ""){
            product.productName  = req.body.productName
        }
        if(req.body.productDesc != null &&req.body.productDesc == ""){
            product.productDesc  = req.body.productDesc
        }
        if(req.body.isActive != product.isActive){
            product.isActive  = req.body.isActive
        }
        if(req.body.stock != product.stock){
            product.stock  = req.body.stock
        }
        if(req.body.maxPrice != product.maxPrice){
            product.maxPrice = req.body.maxPrice
        }
        if(req.body.minPrice != product.minPrice){
            product.minPrice = req.body.minPrice
        }
        product.updatedDate = new Date();
        product.createdBy = req.body.merchantId;
        product = await product.save({session});

        const contentResult = await ProductContent.remove({product:ObjectId(req.body.productId)},{session});
        
        for (const element of req.body.productMainContent) {
            element.product = req.body.productId;            
       };

        const result = await ProductSKU.remove({product:ObjectId(req.body.productId)},{session});
        for (const element of req.body.productSku)
            {
                let sku = new ProductSKU({stock:element.stock,fullPrice:element.fullPrice,product:req.body.productId,skuName:element.skuName,option:element.option,value:element.value,imagePath:element.imagePath});
                sku = await sku.save({ session });
            var skuId = sku._id;
                element.ProductSkuContent.product = req.body.productId;
                element.ProductSkuContent.skuId = skuId;
                req.body.productMainContent.push(element.ProductSkuContent);
        };
            await ProductContent.insertMany(req.body.productMainContent,{session});

            await session.commitTransaction();
            return res.status(200).send(product);
        }
        catch(err){
            logger.error(JSON.stringify(err));
            console.log(err);
            await session.abortTransaction();
            return res.status(200).send({errorMsg:err.message,isError:true});
            
        }
        session.endSession();
});

module.exports = router