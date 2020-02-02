const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type:{type:String},
    isVerified:{type:Boolean, default:false},
    subject:{type:Array},
    lecturing:{type:Array},
    city:{type:Array},
    password:{type:String},
    email:{type:String, unique:true},
    fullname:{type:String},
    foto:{type:String},
    sex:{type:String},
    birth:{type:String},
    adress:{type:String},
    occupation:{type:String},
    skills:{type:String},
    phone:{type:String},
    contactEmail:{type:String},
    languages:{type:String},
    note:{type:String},
    linkedin:[new mongoose.Schema({
           id:String,
           firstName:String,
           lastName:String
    })]
})



module.exports = mongoose.model('User',UserSchema);