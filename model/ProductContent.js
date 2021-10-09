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
        enum:[1,2]
    },
    ImagePath:String,
    ContentType:{
        type:Number,
        enum:[1,2,3,4]
    }   
}));

export default ProductSKU;