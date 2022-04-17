const express = require('express');
const router = express.Router();
const {merchantValidation,emailValidation,telValidation} = require('../helper/validation/validation');
const {Merchant} = require('../model/Merchant');
const {GenerateSalt,HashPassword} = require('../helper/authentication/HashPassword')
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('config');
const {auth} = require('../middleware/auth');

const logger = winston.createLogger(logConfiguration);

router.post("/register",async(req,res)=>{
    try
    {
const {error} = merchantValidation(req.body);
if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
var isExistEmail = await Merchant.find({email:req.body.email});
if(Object.keys(isExistEmail).length > 0)return res.status(200).send({errorMsg:"email is already exist.",isError:true});
var salt = await GenerateSalt();
var hashPassword = await HashPassword(req.body.password,salt);
let merchant = new Merchant({name:req.body.name,lastname:req.body.lastname,email:req.body.email,role:req.body.role,
tel:req.body.tel,salt:salt,password:hashPassword,isActive:true,isDelete:false,LastupdatedDate:new Date()});
merchant = await merchant.save();
const token = jwt.sign({id:merchant._id,fullname:merchant.name+" "+merchant.lastname,email:merchant.email,role:merchant.role,
tel:merchant.tel},config.get('jwtPrivateKey'));
return res.status(200).send({token:token,errorMsg:"success",isError:false,email:merchant.email,name:merchant.name,lastname:merchant.lastname,tel:merchant.tel,id:merchant._id});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/editmerchant",auth,async(req,res)=>{
    try
    {
let merchant = await Merchant.findById(req.body.merchantId);
if(merchant == null)return res.status(200).send({errorMsg:"not found merchant",isError:true});
if(req.body.name!= null && req.body.name!= "")
{
    merchant.name = req.body.name;
}
if(req.body.lastname!= null && req.body.lastname!= "")
{
    merchant.lastname = req.body.lastname;
}
if(req.body.tel!= null && req.body.tel!= "")
{
    const {error} = telValidation({email:req.body.tel});
   if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
    merchant.tel = req.body.tel;
}

merchant.LastupdatedDate = new Date();
merchant = await merchant.save();
return res.status(200).send({errorMsg:"success",isError:false,email:merchant.email,name:merchant.name,lastname:merchant.lastname,tel:merchant.tel,id:merchant._id});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/getmerchant",auth,async(req,res)=>{
    try
    {
    let merchant = await Merchant.findById(req.body.merchantId);
    if(merchant == null)return res.status(200).send({errorMsg:"not found merchant",isError:true});
    else if(merchant.isActive != true || merchant.isDelete != false){
        return res.status(200).send({errorMsg:"not found merchant",isError:true});
    }
    return res.status(200).send({errorMsg:"success",isError:false,role:merchant.role,email:merchant.email,name:merchant.name,lastname:merchant.lastname,tel:merchant.tel,id:merchant._id});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

module.exports = router