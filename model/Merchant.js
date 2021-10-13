const mongoose = require('mongoose');
const Merchant = mongoose.model('Merchant', new mongoose.Schema({
Role:{
    type:String,
        require:true
},
password :{
    type:String,
    require:true,
    trim:true,
},
salt :{
    type:String,
    require:true
},
name :String,
lastname:String,
address:String,
tel :{
    type:String},
email :{
    type:String},
isActive:Boolean,
isDelete:Boolean
}));

module.exports.Merchant =  Merchant;