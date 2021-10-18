const mongoose = require('mongoose');
const Merchant = require('./Merchant');

const Shop = mongoose.model('Shop', new mongoose.Schema({
merchant :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant'
},
tel :String,
email :String,
isActive:Boolean,
isDelete:Boolean,
address:String,
shopName:String,
CoverImg:String
}));

module.exports.Shop = Shop;