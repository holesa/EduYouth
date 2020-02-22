const express               = require("express"),
      app                   = express(),
      middleware            = require("../middleware/index"),
      User                  = require("../db/models/user"),
      route                 = express.Router();

// Load profile
route.route("/")
   .get(middleware.isLoggedIn,(req,res)=>{
   // Check if user email is verified
   if(req.user.isVerified === false){
     res.redirect("/registracia")
   } 
    
   User.findOne({password:req.user.password},(err,data)=>{
    if(err) throw err;
    else{   
    res.render("profile",{data:data})  
  }
   })
})

  // Edit profile
   .post((req,res)=>{
    User.findOneAndUpdate({password:req.user.password},req.body,(err=>{
     if(err) throw err;
     else{
       req.flash("success","Profilové údaje boli uložené.");
       res.redirect("/profil")
     }
   }))
  })

module.exports = route;
