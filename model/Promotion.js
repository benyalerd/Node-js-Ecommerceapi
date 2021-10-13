const mongoose = require('mongoose');

const Promotion = mongoose.model('Promotion', new mongoose.Schema({
   promotionName:String,
   startDate:Date,
   endDate:Date,
   type:{
       type:Number
   },
   discount:Number
  
}));

module.exports.Promotion = Promotion;