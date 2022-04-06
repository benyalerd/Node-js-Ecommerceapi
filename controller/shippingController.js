const express = require('express');
const router = express.Router();
const {Shipping} = require('../model/Shipping');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const {auth} = require('../middleware/auth');
const logger = winston.createLogger(logConfiguration);
const {shippingValidation} = require('../helper/validation/validation');
const ObjectId = require('mongodb').ObjectID;

router.post("/getAllShipping",auth,async(req,res)=>{
    try
    {
let allShipping = await Shipping.find({shop:ObjectId(req.body.shopId)}).populate('master');
if(Object.keys(allShipping).length = 0)return res.status(200).send({errorMsg:"",isError:false});
return res.status(200).send({Shippings:allShipping,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/addShipping",auth,async(req,res)=>{
    try
    {
const {error} = shippingValidation(req.body);
if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
const shop = await Shop.findById(req.body.shopId);
if(shop == null)return res.status(200).send({errorMsg:"not found shop",isError:true});
else if(shop.isActive != true || shop.isDelete != false){
    return res.status(200).send({errorMsg:"not found shop",isError:true});
}
let shipping = new Shipping({shop:req.body.shopId,master:req.body.masterId,price:req.body.price,minDay:req.body.minDay,maxDay:req.body.maxDay,masterName:req.body.masterName,masterImg:req.body.masterImg,createdDate:new Date(),createdBy:req.body.merchantId});
shipping = await shipping.save();
return res.status(200).send({shopId:shipping.shopId,masterId:shipping.masterId,price:shipping.price,minDay:shipping.minDay,maxDay:shipping.maxDay,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/editShipping",auth,async(req,res)=>{
    try
    {
let shipping = await Shipping.findOne({_id:ObjectId(req.body.id)});
if(shipping == null)return res.status(200).send({errorMsg:"not found shipping",isError:true});
if(req.body.price!= null && req.body.price!= "")
{
    shipping.price = req.body.price;
}
if(req.body.minDay!= null && req.body.minDay!= "")
{
    shipping.minDay = req.body.minDay;
}
if(req.body.maxDay!= null && req.body.maxDay!= "")
{
    shipping.maxDay = req.body.maxDay;
}

shipping.updatedBy = req.body.merchantId;
shipping.updatedDate = new Date();
shipping = await Shipping.save();
return res.status(200).send({errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({shopId:shipping.shopId,masterId:shipping.masterId,price:shipping.price,minDay:shipping.minDay,maxDay:shipping.maxDay,errorMsg:"success",isError:false});
        
    }
});

router.post("/deleteShipping",auth,async(req,res)=>{
    try
    {
let shipping = await Shipping.findOne({_id:ObjectId(req.body.id)});
if(shipping == null)return res.status(200).send({errorMsg:"not found shipping",isError:true});

shipping = await shipping.remove();
return res.status(200).send({errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({shopId:shipping.shopId,masterId:shipping.masterId,price:shipping.price,minDay:shipping.minDay,maxDay:shipping.maxDay,errorMsg:"success",isError:false});
        
    }
});


module.exports = router