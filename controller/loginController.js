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
if(error)return res.status(400).send(error.details[0].message);
var user = await Merchant.findOne({email:req.body.email});
console.log('user ...'+JSON.stringify(user));
if(Object.keys(user).length = 0)return res.status(400).send("Invalid email or password.");
console.log(user.salt);
const validatePassword = await HashPassword(req.body.password,user.salt);
if(validatePassword != user.password)return res.status(400).send("Invalid email or password.");
const token = jwt.sign({id:user._id,fullname:user.name+" "+user.lastname,email:user.email,role:user.role,
tel:user.tel},config.get('jwtPrivateKey'));
return res.status(200).send(token);
    }
    catch(err){
        logger.error(JSON.stringify(err.message));
        console.log(err);
        return res.status(500).send(err.message);
        
    }
});

module.exports = router