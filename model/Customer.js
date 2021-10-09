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
    type:String,
    match:/((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))|((\+๖๖|๐)([๐-๙]{1,2}\-?[๐-๙]{3}\-?[๐-๙]{3,4}))/
},
email :{
    type:String,
    match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
},
isActive:Boolean,
isDelete:Boolean
}));

export default Customer;