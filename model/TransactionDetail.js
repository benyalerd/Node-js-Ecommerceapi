const mongoose = require('mongoose');
const Transaction = require('./Transaction');
const Product = require('./Product');
const Sku = require('./ProductSKU');


const TransactionDetail = mongoose.model('TransactionDetail', new mongoose.Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    transaction :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    sku :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sku'
    },
    productImg:String,
    productName:String,
    productPrice:{
        type:Number,
        min:0
    },
    qty:{
        type:Number,
        min:0
    },
    discount:{
        type:Number,
        min:0
    },
    productFullPrice:{
        type:Number,
        min:0
    },
    skuName:String
}));

module.exports.TransactionDetail = TransactionDetail;