const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const User     = require("./user");
let pass       = bcrypt.hashSync('test', 14)
const seedData = [
    {type:"expert",
    isVerified:true,
    subject:["ekologické a environmentálne vedy","ekonómia a manažment","informatika","kybernetika"],
    lecturing:["Prednášky","Hodiny"],
    city:["Trnava","Bratislava"],
    password:bcrypt.hashSync('test', 14),
    email:"ispecant@gmail.com",
    fullname:"Pavol Hrušovský",
    foto:"https://images.immediate.co.uk/production/volatile/sites/3/2018/08/Simpsons_SO28_Gallery_11-fb0b632.jpg?quality=90&resize=620,413",
    pohlavie:"Muž",
    birth:"1.1.1991",
    adress:"Bajkalská 5",
    occupation:"Podnikateľ",
    skills:"Manažment, Účtovníctvo",
    phone:"0908425789",
    contactEmail:"ispecant@gmail.com",
    languages:"Slovenský, Anglický",
    note:"Tu je moja poznámka"},

    {type:"expert",
    isVerified:true,
    subject:["biotechnológie"],
    lecturing:["Prednášky"],
    city:["Košice"],
    password:bcrypt.hashSync('test', 14),
    email:"andhox17@gmail.com",
    fullname:"Marian Privalinec",
    foto:"https://assets.fxnetworks.com/cms/prod/shows/the-simpsons/photos/swsb_character_fact_barney_550x960.png",
    pohlavie:"Muž",
    birth:"1.1.1971",
    adress:"Majská 15",
    occupation:"Biotechnológ",
    skills:"Biotechnológia",
    phone:"0908425789",
    contactEmail:"andhox17@gmail.com",
    languages:"Slovenský, Anglický",
    note:"Tu je moja poznámka"},

    {type:"profesor",
    isVerified:true,
    city:["Trnava","Bratislava"],
    password:bcrypt.hashSync('test', 14),
    email:"fake1@gmail.com",
    fullname:"Ignác Loyola",
    foto:"https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Otto_from_the_Simpsons.gif/200px-Otto_from_the_Simpsons.gif",
    pohlavie:"Muž",
    birth:"1.1.1991",
    adress:"Bajkalská 5",
    occupation:"Podnikateľ",
    skills:"Učenie",
    phone:"0908425789",
    contactEmail:"fake1@gmail.com",
    languages:"Slovenský, Anglický",
    note:"Tu je moja poznámka"},

    {type:"profesor",
    isVerified:true,
    city:["Bratislava", "Košice"],
    password:bcrypt.hashSync('test', 14),
    email:"fake2@gmail.com",
    fullname:"Michal Klinec",
    foto:"https://vignette.wikia.nocookie.net/simpsons/images/b/ba/Swsb_character_fact_skinner.png/revision/latest?cb=20190616114556",
    pohlavie:"Muž",
    birth:"1.1.1991",
    adress:"Bajkalská 5",
    occupation:"Podnikateľ",
    skills:"Učenie",
    phone:"0908425789",
    contactEmail:"fake2@gmail.com",
    languages:"Slovenský, Anglický",
    note:"Tu je moja poznámka"},
]


function seedDB(){
User.remove({},(err)=>{
    if(err) console.log(err);
})


seedData.forEach(data=>{
    User.create(data,(err, createdUsers)=>{
        if(err) {console.log(err)}
    })
})

}
module.exports=seedDB