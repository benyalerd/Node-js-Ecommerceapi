const mongoose = require('mongoose');
const Product = require('./Product');
const Sku = require('./ProductSKU');

const ProductSKU = mongoose.model('ProductSKU', new mongoose.Schema({
    Product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    Sku :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Sku
    },
    MediaType:{
        type:Number,
    },
    ImagePath:String,
    ContentType:{
        type:Number,
    }   
}));
module.exports.ProductSKU = ProductSKU;