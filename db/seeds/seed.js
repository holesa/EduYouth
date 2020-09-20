const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const User     = require("../models/user");
const seedData = [

        // Experts
    {   
        role:"expert",
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
        note:"Tu je moja poznámka"
    }, 
    {
        role:"expert",
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
        note:"Tu je moja poznámka"
    },
    {   
        role:"expert",
        isVerified:true,
        subject:["verejné zdravotníctvo","všeobecné lekárstvo","zdravotnícke vedy"],
        lecturing:["Prednášky","Hodiny"],
        city:["Martin","Bratislava"],
        password:bcrypt.hashSync("test", 14),
        email:"majerexample@gmail.com",
        firstName:"Milan",
        secondName:"Majer",
        occupation:"Ortopéd",
        education:"Slovenská zdravotnícka univerzita v Bratislave",
        contactEmail:"majerexample@gmail.com",
        note:"Tu je moja poznámka"
    }, 
    {
        role:"expert",
        isVerified:true,
        subject:["ekonómia a manažment"],
        lecturing:["Prednášky"],
        city:["Bratislava"],
        password:bcrypt.hashSync("test", 14),
        email:"molnarovaexample@gmail.com",
        firstName:"Zuzana",
        secondName:"Molnárová",
        occupation:"Manažér",
        education:"Vysoká škola manažmentu",
        contactEmail:"molnarovaexample@gmail.com",  
        note:"Tu je moja poznámka"
    },
    {
        role:"expert",
        isVerified:true,
        subject:["umenie","vedy o umení a kultúre"],
        lecturing:["Prednášky","Poradca na sylaby"],
        city:["Bratislava","Nitra"],
        password:bcrypt.hashSync("test", 14),
        email:"examplevelits@gmail.com",
        firstName:"Pavol",
        secondName:"Velits",
        occupation:"Umelec",
        education:"Vysoká škola výtvarných umení v Bratislave",
        contactEmail:"examplevelits@gmail.com",  
        note:"Tu je moja poznámka"
    },

        // Professors
    {
        role:"profesor",
        isVerified:true,
        password:bcrypt.hashSync("test", 14),
        email:"fake1@gmail.com",
        firstName:"Ignác",
        secondName:"Martin",
        occupation:"Vysokoškolský učiteľ",
        education:"VŠ ekonomická, Prešov",
        contactEmail:"fake1@gmail.com",
        note:"Tu je moja poznámka"
    },
    {
        role:"profesor",
        isVerified:true,
        password:bcrypt.hashSync("test", 14),
        email:"fake2@gmail.com",
        firstName:"Michal",
        secondName:"Klinec",
        occupation:"Vysokoškolský učiteľ",
        education:"VŠ právnická, Praha",
        contactEmail:"fake2@gmail.com",
        note:"Tu je moja poznámka"
    },
    {
        role:"profesor",
        isVerified:true,
        password:bcrypt.hashSync("test", 14),
        email:"examplecervenec@gmail.com",
        firstName:"Peter",
        secondName:"Červenec",
        occupation:"Vysokoškolský učiteľ",
        education:"Žilinská univerzita v Žiline",
        contactEmail:"examplecervenec@gmail.com",
        note:"Tu je moja poznámka"
    },
    {
        role:"profesor",
        isVerified:true,
        password:bcrypt.hashSync("test", 14),
        email:"klimovaexample@gmail.com",
        firstName:"Michaela",
        secondName:"Klimová",
        occupation:"Vysokoškolský učiteľ",
        education:"Žilinská univerzita v Žiline",
        contactEmail:"klimovaexample@gmail.com",
        note:"Tu je moja poznámka"
    },
    {
        role:"profesor",
        isVerified:true,
        password:bcrypt.hashSync("test", 14),
        email:"ferencexample@gmail.com",
        firstName:"Pater",
        secondName:"Ferenc",
        occupation:"Vysokoškolský učiteľ",
        education:"Žilinská univerzita v Žiline",
        contactEmail:"ferencexample@gmail.com",
        note:"Tu je moja poznámka"
    },
]

 function seedDB(){
 seedData.forEach(data=>{
    User.create(data);
})

// Remove data 
// User.remove({},(err)=>{
//     if(err) console.log("Failed to remove seed data");
// })

}
module.exports=seedDB