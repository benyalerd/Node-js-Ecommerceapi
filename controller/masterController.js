const express = require('express');
const router = express.Router();
const {Master} = require('../model/Master');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const {auth} = require('../middleware/auth');
const logger = winston.createLogger(logConfiguration);

router.post("/getMasterData",auth,async(req,res)=>{
    try
    {
let master = await Master.find({type:req.body.type});
if(Object.keys(master).length = 0)return res.status(200).send({errorMsg:"",isError:false});
return res.status(200).send({masters:master,errorMsg:"success",isError:false});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

module.exports = router