const mongoose = require('mongoose');
const Product = require('./Product');
const Sku = require('./ProductSKU');

const ProductContent = mongoose.model('ProductContent', new mongoose.Schema({
    product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    skuId:String,
    mediaType:{
        type:Number,
        enum:[1,2]
    },
    imagePath:String,
    contentType:{
        type:Number,
        enum:[1,2,3,4]
    }   
}));

module.exports.ProductContent = ProductContent;