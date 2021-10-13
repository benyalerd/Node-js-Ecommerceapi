const mongoose = require('mongoose');
const Merchant = require('./Merchant');

const Shop = mongoose.model('Shop', new mongoose.Schema({
merchant :{
    type: mongoose.Schema.Types.ObjectId,
    ref: Merchant
},
tel :{
    type:String,
    match:/((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/
},
email :{
    type:String,
    match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
},
isActive:Boolean,
isDelete:Boolean,
address:String,
shopName:String,
CoverImg:String
}));

module.exports.Shop = Shop;