const express = require('express');
const router = express.Router();
const {Shop} = require('../model/Shop');
const {Merchant} = require('../model/Merchant');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const {shopValidation,emailValidation,telValidation} = require('../helper/validation/validation');
const {auth} = require('../middleware/auth');
const ObjectId = require('mongodb').ObjectID;
const logger = winston.createLogger(logConfiguration);
router.post("/addshop",auth,async(req,res)=>{
    try
    {
        
const {error} = shopValidation(req.body);
if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
if(req.body.email != null && req.body.email != ""){
   const {error} = emailValidation({email:req.body.email});
   if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
}
if(req.body.tel != null && req.body.tel != ""){
  const {error} = telValidation({email:req.body.tel});
  if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
}
const merchant = await Merchant.findById(req.body.merchantId);
if(merchant == null)return res.status(200).send({errorMsg:"not found merchant",isError:true});
else if(merchant.isActive != true || merchant.isDelete != false){
    return res.status(200).send({errorMsg:"not found merchant",isError:true});
}
let shop = new Shop({shopName:req.body.shopName,coverImg:req.body.coverImg,email:req.body.email,tel:req.body.tel,
address:req.body.address,isActive:true,isDelete:false,merchant:merchant._id,createdDate:new Date(),createdBy:merchant._id});
shop = await shop.save();
return res.status(200).send({shopName:shop.shopName,coverImg:shop.coverImg,email:shop.email,tel:shop.tel,
    address:shop.address,merchant:merchant._id,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/getshop",auth,async(req,res)=>{
    try
    {
let shop = await Shop.findOne({merchant:ObjectId(req.body.merchantId)});
if(shop == null)return res.status(200).send({errorMsg:"",isError:false});
return res.status(200).send({shops:shop,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/editshop",auth,async(req,res)=>{
    try
    {
let shop = await Shop.findOne({merchant:ObjectId(req.body.merchantId)});
if(shop == null)return res.status(200).send({errorMsg:"not found shop",isError:true});
if(req.body.shopName!= null && req.body.shopName!= "")
{
    shop.shopName = req.body.shopName;
}
if(req.body.coverImg!= null && req.body.coverImg!= "")
{
    shop.coverImg = req.body.coverImg;
}
if(req.body.email!= null && req.body.email!= "")
{
    const {error} = emailValidation({email:req.body.email});
   if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
    shop.email = req.body.email;
}
if(req.body.tel!= null && req.body.tel!= "")
{
    const {error} = telValidation({email:req.body.tel});
  if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
    shop.tel = req.body.tel;
}
if(req.body.address!= null && req.body.address!= "")
{
    shop.address = req.body.address;
}
shop.updatedBy = req.body.merchantId;
shop.updatedDate = new Date();
shop = await shop.save();
return res.status(200).send({shopName:shop.shopName,coverImg:shop.coverImg,email:shop.email,tel:shop.tel,
    address:shop.address,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});


module.exports = router