const mongoose = require('mongoose');
const Shop = require('./Shop');
const Master = require('./Master');

const Payment = mongoose.model('Payment', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Shop
    },
    master :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Master
    },
   AccountName:String,
   AccountNumber:String
}));

module.exports.Payment = Payment;