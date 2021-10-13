const mongoose = require('mongoose');
const Promotion = require('./Promotion');
const Product = require('./Product');

const PromotionDetail = mongoose.model('PromotionDetail', new mongoose.Schema({
    promotion :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Promotion
},
product :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product
}

}));

module.exports.PromotionDetail = PromotionDetail;