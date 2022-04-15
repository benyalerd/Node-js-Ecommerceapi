const mongoose = require('mongoose');
const Shop = require('./Shop');
const Merchant = require('./Merchant');
const Shipping = require('./Shipping');
const Customer = require('./Customer');
const Payment = require('./Payment');

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    merchant :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    totalProductPrice:{
        type:Number,
        min:0
    },
    totalPrice:{
        type:Number,
        min:0
    },
    shipping :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    },
    orderCode:String,
    shippingName:String,
    shippingImg:String,
    shippingPrice:{
        type:Number,
        min:0
    },
    customer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    customerName:String,
    customerTel:String,
    customerEmail:String,
    customerAddress:String,
    payment :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    paymentImg:String,
    paymentName:String,
    AccountName:String,
    AccountNumber:String,
    paymentDate:Date,
    tranDate:Date,
    tranType:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8]
    },
    reason:String,
    trackingNumber:String,
    createdDate:Date,
    createdBy:String,
    updatedDate:Date,
    updatedBy:String
      
}));

module.exports.Transaction = Transaction;