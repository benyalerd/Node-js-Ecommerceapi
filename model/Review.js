const mongoose = require('mongoose');
const Product = require('./Product');
const Shop = require('./Shop');
const Customer = require('./Customer');

const Review = mongoose.model('Review', new mongoose.Schema({
    Product :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Product
    },
    Shop :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Shop
    },
    Customer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer
    },
    textReview:String,
    imgReviewPath:String,
    Rating:{
        type:Number,
        min:0
    }

  
}));

module.exports.Review = Review;