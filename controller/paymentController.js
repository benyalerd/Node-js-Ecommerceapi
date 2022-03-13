const express = require('express');
const router = express.Router();
const {Payment} = require('../model/Payment');
const {Shop} = require('../model/Shop');
const {logConfiguration} = require('../helper/logging/logging');
const {paymentValidation,accountNumberValidation} = require('../helper/validation/validation');
const winston = require('winston');
const {auth} = require('../middleware/auth');
const logger = winston.createLogger(logConfiguration);
const ObjectId = require('mongodb').ObjectID;

router.post("/getAllPayment",auth,async(req,res)=>{
    try
    {
        if(!req.body.limit){
            req.body.limit = 10;
        }
        if(!req.body.page){
            req.body.page = 0;
        }
        let allPayment = await Payment.find({shop:ObjectId(req.body.shopId)}).sort({ _id: 1 })
        .limit(req.body.limit)
        .skip(req.body.page*req.body.limit)
        .exec();
if(Object.keys(allPayment).length = 0)return res.status(200).send({errorMsg:"",isError:false});
return res.status(200).send({payments:allPayment,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});


router.post("/addPayment",auth,async(req,res)=>{
    try
    {
const {error} = paymentValidation(req.body);
if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
const shop = await Shop.findById(req.body.shopId);
if(shop == null)return res.status(200).send({errorMsg:"not found shop",isError:true});
let payment = new Payment({shop:req.body.shopId,master:req.body.masterId,accountName:req.body.accountName,accountNumber:req.body.accountNumber,masterName:req.body.masterName,masterImg:req.body.masterImg});
payment = await payment.save();
return res.status(200).send({shopId:shop.shopId,masterId:shop.masterId,accountName:shop.accountName,accountNumber:shop.accountNumber,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/editPayment",auth,async(req,res)=>{
    try
    {
let payment = await Payment.findOne({_id:ObjectId(req.body._id)});
if(payment == null)return res.status(200).send({errorMsg:"not found payment",isError:true});
if(req.body.accountName!= null && req.body.accountName!= "")
{
    payment.accountName = req.body.accountName;
}
if(req.body.accountNumber!= null && req.body.accountNumber!= "")
{
        const {error} = accountNumberValidation({email:req.body.accountNumber});
   if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
    payment.accountNumber = req.body.accountNumber;
}


payment = await payment.save();
return res.status(200).send({errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({shopId:shop.shopId,masterId:shop.masterId,accountName:shop.accountName,accountNumber:shop.accountNumber,errorMsg:"success",isError:false});
        
    }
});

router.post("/deletePayment",auth,async(req,res)=>{
    try
    {
let payment = await Payment.findOne({_id:ObjectId(req.body._id)});
if(payment == null)return res.status(200).send({errorMsg:"not found payment",isError:true});

payment = await Payment.remove();
return res.status(200).send({errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({shopId:shop.shopId,masterId:shop.masterId,accountName:shop.accountName,accountNumber:shop.accountNumber,errorMsg:"success",isError:false});
        
    }
});

module.exports = router