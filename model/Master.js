const mongoose = require('mongoose');

const Master = mongoose.model('Master', new mongoose.Schema({
masterName:String,
masterImg:String,
type:{
    type:Number,
    enum:[1,2]
},
}));

export default Master;