const mongoose = require('mongoose');
const Product = require('./Product');

const ProductSKU = mongoose.model('ProductSKU', new mongoose.Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
   skuName:String,
   option:String,
   value:Number,
   imagePath:String
}));

module.exports.ProductSKU = ProductSKU;