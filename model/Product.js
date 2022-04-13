const mongoose = require('mongoose');
const Shop = require('./Shop');
const Merchant = require('./Merchant');

const Product = mongoose.model('Product', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
    },
    merchant :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    isActive:Boolean,
    minPrice:{
        type:Number,
        min:0
    },
    maxPrice:{
        type:Number,
        min:0
    },
    productName:String,
    productDesc:String,
    createdDate:Date,
    createdBy:String,
    updatedDate:Date,
    updatedBy:String,
    imagePath:String,
    stock:{
        type:Number,
        min:0
    }
}));

module.exports.Product = Product;