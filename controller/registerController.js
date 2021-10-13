const express = require('express');
const router = express.Router();
const {RegisterValidation} = require('../helper/validation/validation');
const {Merchant} = require('../model/Merchant');
const {GenerateSalt,HashPassword} = require('../helper/authentication/HashPassword')
const {logConfiguration} = require('./helper/logging/logging');

const logger = winston.createLogger(logConfiguration);

router.post("/",async(req,res)=>{
    try
    {
const {error} = RegisterValidation(req.body);
if(error)return res.status(400).send(error.details[0].message);
var salt = await GenerateSalt();
console.log("salt ="+salt);
var hashPassword = await HashPassword(req.body.password,salt);
let merchant = new Merchant({name:req.body.name,lastname:req.body.lastname,email:req.body.email,role:req.body.role,
tel:req.body.tel,salt:salt,password:hashPassword});
merchant = await merchant.save();
res.status(200).send({email:merchant.email,name:merchant.name,lastname:merchant.lastname,tel:merchant.tel,id:merchant.id});
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
    }
});

module.exports = router