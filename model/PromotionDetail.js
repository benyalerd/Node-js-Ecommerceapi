const mongoose = require('mongoose');
const Promotion = require('./Promotion');
const Product = require('./Product');

const Shop = mongoose.model('Shop', new mongoose.Schema({
    promotion :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Promotion
},
product :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product
}

}));

export default Shop;