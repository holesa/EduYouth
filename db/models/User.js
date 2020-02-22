const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role:{type:String},
    isVerified:{type:Boolean, default:false},
    subject:{type:Array},
    lecturing:{type:Array},
    city:{type:Array},
    password:{type:String},
    email:{type:String, unique:true},
    firstName:{type:String},
    secondName:{type:String},
    occupation:{type:String},
    education:{type:String},
    contactEmail:{type:String},
    note:{type:String}  
})



module.exports = mongoose.model("User",UserSchema);