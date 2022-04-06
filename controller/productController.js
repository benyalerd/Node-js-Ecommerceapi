const express = require('express');
const router = express.Router();
const {Product} = require('../model/Product');
const {ProductSKU} = require('../model/ProductSKU');
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
        if(product == null)return res.status(200).send({errorMsg:"",isError:false});
        return res.status(200).send({errorMsg:"success",isError:false,productList:product});
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
        
        let product = new Product({shop:req.body.shopId,merchant:req.body.merchantId,isActive:true,stock:req.body.stock,fullPrice:req.body.fullPrice,productName:req.body.productName,productDesc:req.body.productDesc,createdDate:new Date(),createdBy:req.body.merchantId,ImagePath:req.body.imagePath});
        product = await product.save({ session });      
        var productId = product._id;
        for (const element of req.body.productSku) {
            var x = null;
            x.toString();
                let sku = new ProductSKU({product:productId,skuName:element.skuName,option:element.option,value:element.value,imagePath:element.imagePath});
                sku = await sku.save({ session });
            };
        
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
        
        const productSku = await ProductSku.findById(req.body.productId);
       
        product["productSku"] = productSku;

        return res.status(200).send(product);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/deleteProductDetail",auth,async(req,res)=>{
    try
    {
        const product = await Product.findById(req.body.productId);      
        if(product == null)return res.status(200).send({errorMsg:"not found product",isError:true});
        product = await product.remove();

        const result = await ProductSku.remove({product:ObjectId(req.body.productId)});

        return res.status(200).send(product);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/updateProductDetail",auth,async(req,res)=>{
    const session = await conn.startSession();
    try
    {
        session.startTransaction();    
        const product = await Product.findById(req.body.productId);      
        if(product == null)return res.status(200).send({errorMsg:"not found product",isError:true});
        if(req.body.productName != null &&req.body.productName == ""){
            product.productName  = req.body.productName
        }
        if(req.body.productDesc != null &&req.body.productDesc == ""){
            product.productDesc  = req.body.productDesc
        }
        if(req.body.imagePath != null &&req.body.imagePath == ""){
            product.imagePath  = req.body.imagePath
        }
        if(req.body.isActive != product.isActive){
            product.isActive  = req.body.isActive
        }
        if(req.body.stock != product.stock){
            product.stock  = req.body.stock
        }
        if(req.body.fullPrice != product.fullPrice){
            product.fullPrice = req.body.fullPrice
        }
        product.updatedDate = new Date();
        product.createdBy = req.body.merchantId;
        product = await product.save({session});

        const result = await ProductSku.remove({product:ObjectId(req.body.productId)},{session});
        for (const element of req.body.productSku)
            {
            let sku = new ProductSKU({product:productId,skuName:element.skuName,option:element.option,value:element.value,imagePath:element.imagePath});
            sku = await sku.save({session});
            };
                  
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