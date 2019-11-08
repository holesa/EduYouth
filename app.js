const express               = require("express");
const app                   = express();
const path                  = require("path");
const ejs                   = require("ejs");
const mongoose              = require("mongoose");
mongoose.connect("mongodb://localhost/user",{useNewUrlParser:true});
const User                  = require("./models/user");
const Token                 = require("./models/token");
const Interne               = require("./models/interne");
const seedDb                = require("./models/seed")
const bodyParser            = require("body-parser");
const session               = require("express-session");
const passport              = require("passport");
const LocalStrategy         = require("passport-local");
const bcrypt                = require("bcryptjs");
const flash                 = require("connect-flash");
const nodemailer            = require("nodemailer")
const LinkedInStrategy      = require("passport-linkedin-oauth2").Strategy;



seedDb()
app.set("view engine","ejs")
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({
    exdended:false
}))

// Express session
app.use(session({
    secret:"eifeif6ew5f46ewf9969fjiwe6565qe6fewfwefjewjfiewjfewfkeif56f54e6f5sdfm",
    resave:false,
    saveUninitialized:false    
}))

// Connect Flash
app.use(flash());



//PASSPORT//
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// Config Local strategy  
passport.use(new LocalStrategy({usernameField: "email", 
passwordField: "password"},(email,password,done)=>{
User.findOne({email:email},(err, user)=>{
        if (err) {return done(err);}
        if (!user) {return done(null, false);}
        if (bcrypt.compare(password,user.password,(err,isMatch)=>{
        if (err) throw err;
         if(isMatch) {return done(null, user);
        } else {
          return done(null, false)      
        }   
        }))
        return done(null, user);
    })
}))


/*
// Config Linkedin strategy  
passport.use(new LinkedInStrategy({
  clientID: "",
  clientSecret: "",
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  profileFields: [
    "formatted-name",
    "headline",
    "id",
    "public-profile-url",
    "email-address",
    "location",
],
  scope: ["r_emailaddress", "r_basicprofile"],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    console.log(profile)
    let savedProfil =new User({
      linkedin:[{
        id:profile.id
        oauth:true
      }]
    }).save().then((newUser)=>{
      console.log(newUser)
    })
    // To keep the example simple, the user"s LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, savedProfil);
  });
}));
*/


// Middlewere to verify logged users
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
         next();
    } else{
      res.redirect("/prihlasenie")
    }
}

// Global variables
app.use(function(req, res, next){
//res.locals.success = req.flash("success");
//res.locals.error   = req.flash("error");
res.locals.currentUser = req.user 
next()
})


// Homepage
app.get("/",(req,res)=>{
    res.render("index")
})


// Registracia LOCAL
app.route("/registracia")
    .get((req,res)=>{
    res.render("registracia")
})
    .post((req,res)=>{
    let hash = bcrypt.hashSync(req.body.password, 14)
    req.body.password = hash    
    let newUser = new User(req.body);
    newUser.save((err,user)=>{
        if(err){
            /*
            let error =  "Vyskytla sa chyba, skuste to znovu."
           console.log("ERROR 1")
            if(err.code === 11000){
             error = "Tato emailova edresa sa uz pouziva."
             console.log("ERROR 2")
         }
         console.log("ERROR 3")
            return res.redirect("/registracia");

            */
           console.log(err)
            res.redirect("/registracia");
            }
          else{  
            req.login(user, function(error) {
              if (error) throw error; 
              else{
              res.redirect("/dokoncenie");
              }
            });
        } 
        })    
    })



// Registracia expert

app.route("/dokoncenie")
    .get(isLoggedIn,(req, res)=>{
      res.render("multistep_registration")
    })

    .post(isLoggedIn,(req,res)=>{
      console.log(req.body)
      User.findOneAndUpdate({password:req.user.password},  
        req.body,(err=>{
         if(err) throw err;
         else{
          if(req.user.isVerified === false){
        // Ak sa registroval cez email, verifikuje email
       
          // Generuj token
            let token = Math.floor(Math.random()*100000)
              let newToken = new Token({
                _userId:req.user.id,
                token:token,
                createdAt: new Date()
              })
             newToken.save(err=>{
               if(err)throw err;
             })
      
            // Link určený na verifikáciu
             link ="http://"+req.get("host")+"/overenie?id="+token
            
            // Obsah email
            let content = "<p>Prosim potvrdte klinknutim na tento link aktivaciu svojho uctu</p>" + link
          
           
            // Posli email
             // create reusable transporter object using the default SMTP transport
                  let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "feedtheyouth20@gmail.com", // generated ethereal user
                        pass: ">{%n.;jbCTAs7:&q" // generated ethereal password
                    },
                    tls:{
                      rejectUnauthorized:false
                    }
                });

                // send mail with defined transport object
                transporter.sendMail({
                    from: "'FeedTheYouth' <feedtheyouth20@gmail.com>", // sender address
                    to: req.user.email, // list of receivers
                    subject: "Hello from TheFeedTheYouth", // Subject line
                    text: "Hello again", // plain text body
                    html: content // html body
                });

             //   console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
            //    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                res.render("potvrdenie",{msg:"Potvrdzujúci email bol poslaný na Vašu emailovú adresu"})
              }

         else{
        // Ak sa registroval cez oauth, posli ho do profilu   
          res.redirect("/profil")
          }
    }
    })
  ) 
})

// Overenie usera po preklinknuti sa z emailu
app.route("/overenie")
    .get((req,res)=>{
     // Overenie zdroja a url
   //  if(req.protocol + "://" + req.get("host")===("http://" + host)){
           // Overenie tokenu
           Token.findOne({_userId:req.user.id},(err, data)=>{
           
             if(req.query.id === data.token){
               
            User.findOneAndUpdate({password:req.user.password},{isVerified:true},(err)=>{
                 if(err) throw err
                 res.redirect("/profil")
                })
     }
            else{
              res.send("Nespravny token")
       } 
      })
  /*     
    } else{
       res.send("Nespravny zdroj") 
      }  
  */
    })
    
// Prihlasenie
app.route("/prihlasenie")
    .get((req,res)=>{
     res.render("prihlasenie")
  })

  .post(passport.authenticate("local",{failureRedirect:"/prihlasenie"}),(req,res)=>{
     res.redirect("/profil")
    });

// Profil

// Load profile
app.route("/profil")
   .get(isLoggedIn,(req,res)=>{
    console.log("THIS " + req.user)
   // Overenie verifikacie uctu
   if(req.user.isVerified === false){
     res.redirect("registracia")
   } 
    
   User.findOne({password:req.user.password},(err,data)=>{
    if(err) throw err;
    else{   
    res.render("profil",{data:data})  
  }
   })
})

// Edit profile
   .post((req,res)=>{
    User.findOneAndUpdate({password:req.user.password},req.body,(err=>{
     if(err) throw err;
     else{
       res.redirect("/profil")
     }
   }))
  })


 // Hladaj expertov
app.route("/experti")
    .get((req,res)=>{
      const predmetyList = ["architektúra a urbanizmus","bezpečnostné vedy","biológia","biotechnológie","doprava","drevárstvo","ekologické a environmentálne vedy","ekonómia a manažment","elektrotechnika","farmácia","filológia","filozofia","fyzika","geodézia a kartografia","historické vedy","chémia","chemické inžinierstvo a technológie","informatika","kybernetika","lesníctvo","logopédia a liečebná pedagogika","matematika","mediálne a komunikačné štúdiá","obrana a vojenstvo","ošetrovateľstvo","politické vedy","poľnohospodárstvo a krajinárstvo","potravinárstvo","pôrodná asistencia","právo","priestorové plánovanie","psychológia","sociálna práca","sociológia a sociálna antropológia","stavebníctvo","strojárstvo","teológia","učiteľstvo a pedagogické vedy","umenie","vedy o športe","vedy o umení a kultúre","vedy o Zemi","verejné zdravotníctvo","veterinárske lekárstvo","všeobecné lekárstvo","zdravotnícke vedy","získavanie a spracovanie zemských zdrojov","zubné lekárstvo"];
      const vyucbaList = ["Prednášky","Hodiny","Poradca na sylaby", "Výučba pri kruhu"];
      const filter = {
        type:"expert",
        subject:{
          $in:req.query.predmety===undefined ? predmetyList : req.query.predmety
        },
        lecturing:{
          $in:req.query.vyucba===undefined ? vyucbaList : req.query.vyucba
        }
    }

      User.find(filter,(err,usery)=>{
        if(err) throw err;
        else{
          res.render("experti",{predmetyList:predmetyList, vyucbaList:vyucbaList, usery:usery})
        }
      })
    })

  app.route("/experti/:id")
      .get((req,res)=>{
        User.findOne({_id:req.params.id},(err,data)=>{
          console.log(data)
          res.render("expert_profilovka",{data:data})
        })
      })

  
// Odhlasenie
app.get("/odhlasenie",(req,res)=>{
    req.logout();
    res.redirect("/")
})


/*
// Linkedin prihlasenie
app.get("/auth/linkedin",
  passport.authenticate("linkedin"),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get("/auth/linkedin/callback", passport.authenticate("linkedin", {
  successRedirect: "/dokoncenie?username=" + req.body.username",
  failureRedirect: "/prihlasenie"
}));

*/
// Server listen
app.listen(3000,(err,data)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log("Aplikacia spustena na serveri")
        
    }
})

