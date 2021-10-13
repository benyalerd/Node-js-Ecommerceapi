const mongoose = require('mongoose');
const Product = require('./Product');

const ProductSKU = mongoose.model('ProductSKU', new mongoose.Schema({
    Product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
   skuName:String,
   option:String,
   value:Number
}));

module.exports.ProductSKU = ProductSKU;