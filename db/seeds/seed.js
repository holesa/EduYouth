const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const User     = require("../models/user");
let pass       = bcrypt.hashSync("test", 14)
const seedData = [
    {role:"expert",
    isVerified:true,
    subject:["ekologické a environmentálne vedy","ekonómia a manažment","informatika","kybernetika"],
    lecturing:["Prednášky","Hodiny"],
    city:["Trnava","Bratislava"],
    password:bcrypt.hashSync("test", 14),
    email:"majl@gmail.com",
    firstName:"Pavol",
    secondName:"Hrušovský",
    occupation:"Podnikateľ",
    education:"VŠ strojnícka, Košice",
    contactEmail:"majl@gmail.com",
    note:"Tu je moja poznámka"}, 

    {role:"expert",
    isVerified:true,
    subject:["biotechnológie"],
    lecturing:["Prednášky"],
    city:["Košice"],
    password:bcrypt.hashSync("test", 14),
    email:"andhox17@gmail.com",
    firstName:"Marian",
    secondName:"Privalinec",
    occupation:"Biotechnológ",
    education:"VŠ ekonomická, Košice",
    contactEmail:"andhox17@gmail.com",  
    note:"Tu je moja poznámka"},

    {role:"profesor",
    isVerified:true,
    password:bcrypt.hashSync("test", 14),
    email:"fake1@gmail.com",
    firstName:"Ignác",
    secondName:"Loyola",
    occupation:"Podnikateľ",
    education:"VŠ ekonomická, Prešov",
    contactEmail:"fake1@gmail.com",
    note:"Tu je moja poznámka"},

    {role:"profesor",
    isVerified:true,
    password:bcrypt.hashSync("test", 14),
    email:"fake2@gmail.com",
    firstName:"Michal",
    secondName:"Klinec",
    occupation:"Podnikateľ",
    education:"VŠ právnická, Praha",
    contactEmail:"fake2@gmail.com",
    note:"Tu je moja poznámka"},
]


 function seedDB(){
// User.remove({},(err)=>{
//     if(err) console.log("Mam error remove");
// })


seedData.forEach(data=>{
    User.create(data,(err, createdUsers)=>{
        if(err) {console.log("Mam error create")}
        else{"Seed has been created"}
    })
})

}
module.exports=seedDB