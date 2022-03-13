const mongoose = require('mongoose');

const Promotion = mongoose.model('Promotion', new mongoose.Schema({
   promotionName:String,
   startDate:Date,
   endDate:Date,
   type:{
       type:Number
   },
   discount:Number,
   createdDate:Date,
   createdBy:String,
   updatedDate:Date,
   updatedBy:String
  
}));

module.exports.Promotion = Promotion;