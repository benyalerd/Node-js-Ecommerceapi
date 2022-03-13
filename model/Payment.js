const mongoose = require('mongoose');
const Shop = require('./Shop');
const Master = require('./Master');

const Payment = mongoose.model('Payment', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    master :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
   accountName:String,
   accountNumber:String,
   masterName:String,
   masterImg:String
}));

module.exports.Payment = Payment;