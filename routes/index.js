const express               = require("express"),
      app                   = express(),
      middleware            = require("../middleware/index"),
      User                  = require("../db/models/user"),
      Token                 = require("../db/models/token"),
      internalData          = require("../db/seeds/internal"),
      passport              = require("passport"),
      bcrypt                = require("bcryptjs"),
      nodemailer            = require("nodemailer"),
      route                 = express.Router(),
      send_email            = require("../config/send_email");
   
// Homepage
route.get("/",(req,res)=>{
  if(req.user){
    res.redirect("/profil");
  }
  else{
    res.render("index")
  }
})

// Registration
route.route("/registracia")
    .get((req,res)=>{
    res.render("authentication/registration")
})
    .post((req,res)=>{
    if(req.body.email==="" || req.body.password===""){
      req.flash("error","Vyplňte obe polia.");
      res.redirect("/registracia");
    }
    else if(req.body.password.length<6){
      req.flash("error","Heslo musí mať aspoň 6 znakov");
      res.redirect("/registracia");
    }
    else{  
    const hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    const newUser = new User(req.body);
    newUser.save((err,user)=>{
        if(err){
           req.flash("error","Táto emailová adresa už existuje.")
           res.redirect("/registracia");
          }
        else{
          console.log("I AM USER " + user)
           req.login(user, error=>{
              if(error) throw error; 
              else{
              res.redirect("/registracny-proces");
                  }
                  });
              } 
              })    
      }
    })

// Registration process - multistep form
route.route("/registracny-proces")
    .get(middleware.isLoggedIn,(req, res)=>{
      res.render("authentication/multistep_registration",{internalData:internalData,success:false})
    })
    .post(middleware.isLoggedIn,(req,res)=>{
      let role = req.body.role;
      User.findOneAndUpdate({password:req.user.password},  
        req.body,((err,data)=>{
         if(err) throw err;
         else{ 
          const link ="http://localhost:3000/potvrdenie?token="
          const content = "<p>Prosím potvrďte kliknutím na tento link vytvorenie uctu</p>"
          const userId = data._id;
          const email = data.email;
          // Include confirmation_email file
          send_email(userId,link,content,email);
            res.render("authentication/multistep_registration",{internalData:internalData,success:true,role:role})
          }
        })
      ) 
    })

// Verify a user after he has clicked on the verification link
route.route("/potvrdenie")
    .get((req,res)=>{
           // Verify token
           Token.findOne({token:req.query.token},(err, data)=>{
              if(err) throw err;
              else if(data === null){
              res.send("Zly token");  
              }
              else{
                User.findOneAndUpdate(
                  {_id:data._userId},
                  {isVerified:true},
                  {new: true, upsert: true},
                  (err,user)=>{
                    if(err) throw err
                    else{
                        req.login(user, error =>{
                          if(error)throw error;
                          else{
                            req.flash("success","Váš účet bol verifikovaný")
                            res.redirect("/profil")
                              }
                          })
                        }
                      })    
                    }
                })
              })

// Login
route.route("/prihlasenie")
    .get((middleware.isLoggedIn),(req,res)=>{
      res.redirect("/profil")
    })
    .post(passport.authenticate("local",{
      failureRedirect:"/prihlasenie",
      failureFlash:"Nespravne prihlasovacie udaje"
    }),(req,res)=>{
     res.status(200);
     res.redirect("/profil")
    })

// Reset forgotten passsword
route.route("/strata-hesla")
    .get((req,res)=>{
      res.render("authentication/forgot");
    })
    .post((req,res)=>{
      User.findOne({email:req.body.resetEmail},(err,data)=>{
      if(err) throw err
      else if(data === null){
        req.flash("error","Email adresa neexistuje");
        res.redirect("/strata-hesla");
      }
      else{
      const userId = data._id; 
      const link ="http://localhost:3000/zmena-hesla?token=";
      const content = "<p>Prosím potvrďte kliknutím na tento link zmenu hesla</p>";
      const email = data.email;
      send_email(userId,link,content,email)
        req.flash("success","Email bol poslany");
        res.redirect("/strata-hesla");
      }  
      })
      
    })

// Create a new password    
route.route("/zmena-hesla")
    .get((req,res)=>{
      Token.findOne({token:req.query.token},(err,data)=>{
        if(err) throw err;
        else if(data === null){
        res.send("Zly token");  
        }
        else if(data.token===req.query.token){
         res.render("authentication/new_password",{error:"",token:data.token});
        }
      })
    })
     .post((req,res)=>{
       if(req.body.passwordFirst !== req.body.passwordSecond){
         res.render("authentication/new_password",{error:"Hesla sa nezhoduju"});         
       }
       else{
         const hash = bcrypt.hashSync(req.body.passwordFirst,14);
         req.body.passwordFirst = hash;
         Token.findOne({token:req.body.token},(err,data)=>{
           if(err) throw err;
           else{
            User.update({_id:data._userId},{password:req.body.passwordFirst},(err,complete)=>{
              if(err) throw err;
              else{
                res.send("Heslo bolo zmenene")
              }
            })
           }
         })
         
       } 
    })

// Logout
route.get("/odhlasenie",(req,res)=>{
req.logout();
res.redirect("/")
})

route.get("*",(req,res)=>{
  res.render("404");
})


module.exports = route;