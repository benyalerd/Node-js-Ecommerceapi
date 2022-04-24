const express = require('express');
const router = express.Router();
const config = require('config');
const {emailValidation} = require('../helper/validation/validation');
const {logConfiguration} = require('../helper/logging/logging');
const {Merchant} = require('../model/Merchant');
const winston = require('winston');
const jwt = require('jsonwebtoken');

const logger = winston.createLogger(logConfiguration);

router.post("/",async(req,res)=>{
    try
    {
const {error} = emailValidation(req.body);
if(error)return res.status(200).send({errorMsg:error.details[0].message,isError:true});
var user = await Merchant.findOne({email:req.body.email});
if(!user)return res.status(200).send({errorMsg:"Invalid email or password.",isError:true});
console.log(user.salt);
const validatePassword = await HashPassword(req.body.password,user.salt);
if(validatePassword != user.password)return res.status(200).send({errorMsg:"Invalid email or password.",isError:true});
const token = jwt.sign({id:user._id,fullname:user.name+" "+user.lastname,email:user.email,role:user.role,
tel:user.tel},config.get('jwtPrivateKey'));
return res.status(200).send({token:token,isError:false,errorMsg:"success"});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

module.exports = router