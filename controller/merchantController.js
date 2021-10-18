const express = require('express');
const router = express.Router();
const {merchantValidation} = require('../helper/validation/validation');
const {Merchant} = require('../model/Merchant');
const {GenerateSalt,HashPassword} = require('../helper/authentication/HashPassword')
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const config = require('config');

const logger = winston.createLogger(logConfiguration);

router.post("/register",async(req,res)=>{
    try
    {
const {error} = merchantValidation(req.body);
if(error)return res.status(400).send(error.details[0].message);
var isExistEmail = await Merchant.find({email:req.body.email});
if(Object.keys(isExistEmail).length > 0)return res.status(400).send("email is already exist.");
var salt = await GenerateSalt();
var hashPassword = await HashPassword(req.body.password,salt);
let merchant = new Merchant({name:req.body.name,lastname:req.body.lastname,email:req.body.email,role:req.body.role,
tel:req.body.tel,salt:salt,password:hashPassword,isActive:true,isDelete:false});
merchant = await merchant.save();
const token = jwt.sign({id:merchant._id,fullname:merchant.name+" "+merchant.lastname,email:merchant.email,role:merchant.role,
tel:merchant.tel},config.get('jwtPrivateKey'));
return res.header('x-auth-token',token).status(200).send({email:merchant.email,name:merchant.name,lastname:merchant.lastname,tel:merchant.tel,id:merchant._id});
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});

router.post("/editmerchant",auth,async(req,res)=>{
    try
    {
let merchant = await Merchant.findById(req.body.merchantId);
if(Object.keys(shop).length = 0)return res.status(400).send("not found shop");
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
    merchant.tel = req.body.tel;
}


shop = await shop.save();
return res.status(200).send(shop);
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});

module.exports = router