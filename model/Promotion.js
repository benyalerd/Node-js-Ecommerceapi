const mongoose = require('mongoose');

const Promotion = mongoose.model('Promotion', new mongoose.Schema({
   promotionName:String,
   startDate:Date,
   endDate:Date,
   type:{
       type:Number,
       enum:[1,2]
   },
   discount:Number
  
}));

export default Promotion;