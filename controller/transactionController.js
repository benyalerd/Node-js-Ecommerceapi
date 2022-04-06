const express = require('express');
const router = express.Router();
const {Transaction} = require('../model/Transaction');
const {TransactionDetail} = require('../model/TransactionDetail');
const {logConfiguration} = require('../helper/logging/logging');
const winston = require('winston');
const config = require('config');
const {auth} = require('../middleware/auth');
const {Shop} = require('../model/Shop');
const ObjectId = require('mongodb').ObjectID;
const {transactionStatusValidation} = require('../helper/validation/validation');
const {transactionType} = require('../model/enum/enum');

const logger = winston.createLogger(logConfiguration);

router.post("/searchTransaction",auth,async(req,res)=>{
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
       if(req.body.orderCode != null && req.body.orderCode != ""){
           query["orderCode"] = { $regex: req.body.orderCode   }
       }
      
       if(Object.keys(transactionType).includes(req.body.tabType)){
        query["tranType"] = tranType;
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
        let transaction = await Transaction.find(query)
        .sort(sorting)
        .limit(req.body.limit)
        .skip(req.body.page*req.body.limit)
        .exec();
        if(transaction == null)return res.status(200).send({errorMsg:"",isError:false});
        return res.status(200).send({errorMsg:"success",isError:false,transactionList:transaction});
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});


router.post("/getTransactionDetail",auth,async(req,res)=>{
    try
    {
        const transaction = await Transaction.findById(req.body.transactionId);
        
        if(transaction == null)return res.status(200).send({errorMsg:"not found transaction",isError:true});
        
        const transactionDetail = await TransactionDetail.findById(req.body.transactionId);
       
        transaction["transactionDetail"] = transactionDetail;

        return res.status(200).send(transaction);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});

router.post("/updateTransactionDetail",auth,async(req,res)=>{
    try
    {
        const transaction = await Product.findById(req.body.transactionId);      
        if(transaction == null)return res.status(200).send({errorMsg:"not found transaction",isError:true});
        if(req.body.paymentImg != null &&req.body.paymentImg == ""){
            transaction.paymentImg  = req.body.paymentImg
        }
        if(req.body.tranType > 0){
            const isValid = transactionStatusValidation(req.body.tranType,transaction.tranType)
            if(!isValid)return res.status(200).send({errorMsg:"status is incorrect",isError:true});
            transaction.tranType  = req.body.tranType
        }
        
        transaction.updatedDate = new Date();
        transaction.createdBy = req.body.merchantId;
        transaction = await transaction.save();

        
        return res.status(200).send(transaction);
    }
    catch(err){
        logger.error(JSON.stringify(err));
        console.log(err);
        return res.status(200).send({errorMsg:err.message,isError:true});
        
    }
});