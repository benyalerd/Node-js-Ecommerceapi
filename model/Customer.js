const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
username :{
    type:String,
    require:true,
    trim:true,
    lowercase:true
},
password :{
    type:String,
    require:true,
    trim:true,
},
salt :{
    type:String,
    require:true,
    maxlength:20
},
name :String,
lastname:String,
address:String,
tel :{
    type:String
},
email :{
    type:String
},
isActive:Boolean,
isDelete:Boolean,
LastupdatedDate:Date
}));

module.exports.Customer = Customer;