const mongoose = require('mongoose');
const Shop = require('./Shop');
const Master = require('./Master');

const Shipping = mongoose.model('Shipping', new mongoose.Schema({
    shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    master :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Master'
    },
    Price:Number,
    MaxDay:Number,
    MinDay:Number
}));

module.exports.Shipping = Shipping;