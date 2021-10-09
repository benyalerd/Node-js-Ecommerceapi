const mongoose = require('mongoose');
const Shop = require('./Shop');
const Merchant = require('./Merchant');
const Shipping = require('./Shipping');
const Customer = require('./Customer');
const Payment = require('./Payment');

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Shop
    },
    merchant :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Merchant
    },
    totoalProductPrice:{
        type:Number,
        min:0
    },
    totoalPrice:{
        type:Number,
        min:0
    },
    shipping :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Shipping
    },
    shippingName:String,
    shippingImg:String,
    shippingPrice:{
        type:Number,
        min:0
    },
    customer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer
    },
    customerName:String,
    customerTel:String,
    customerEmail:String,
    payment :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Payment
    },
    paymentImg:String,
    paymentName:String,
    AccountName:String,
    AccountNumber:String,
    ImageSlip:String,
    paymentDate:Date,
    tranDate:Date,
    TranType:{
        type:Number,
        enum:[1,2,3,4,5,6]
    }
      
}));

export default Transaction;