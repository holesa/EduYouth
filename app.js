const express               = require('express');
const app                   = express();
const path                  = require('path');
const ejs                   = require('ejs');
const mongoose              = require('mongoose');
mongoose.connect('mongodb://localhost/user',{useNewUrlParser:true});
const User                  = require('./models/user');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const passport              = require('passport');
const LocalStrategy         = require('passport-local');
const bcrypt                = require('bcryptjs');
const flash                 = require('connect-flash');
const LinkedInStrategy      = require('passport-linkedin-oauth2').Strategy;



app.set('view engine','ejs')
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({
    exdended:false
}))

// Express session
app.use(session({
    secret:'eifeif6ew5f46ewf9969fjiwe6565qe6fewfwefjewjfiewjfewfkeif56f54e6f5sdfm',
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
passport.use(new LocalStrategy((username,password,done)=>{
User.findOne({username:username},(err, user)=>{
        console.log(username)
        console.log(password)
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
  clientID: '',
  clientSecret: '',
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  profileFields: [
    "formatted-name",
    "headline",
    "id",
    "public-profile-url",
    "email-address",
    "location",
],
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    console.log(profile)
    let savedProfil =new User({
      linkedin:[{
        id:profile.id
      }]
    }).save().then((newUser)=>{
      console.log(newUser)
    })
    // To keep the example simple, the user's LinkedIn profile is returned to
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
      res.redirect('/prihlasenie')
    }
}

/*
// Global variables
app.use(function(req, res, next){
res.locals.success = req.flash('success');
res.locals.error   = req.flash('error');
next()
})
*/

// Homepage
app.get('/',(req,res)=>{
    res.render('index')
})


// Registracia LOCAL
app.route('/registracia')
    .get((req,res)=>{
    res.render('registracia')
})
    .post((req,res)=>{
    let hash = bcrypt.hashSync(req.body.password, 14)
    req.body.password = hash    
    let newUser = new User(req.body);
    newUser.save(err=>{
        if(err){
            /*
            let error =  'Vyskytla sa chyba, skuste to znovu.'
           console.log('ERROR 1')
            if(err.code === 11000){
             error = 'Tato emailova edresa sa uz pouziva.'
             console.log('ERROR 2')
         }
         console.log('ERROR 3')
            return res.redirect('/registracia');

            */
           console.log(err)
            res.redirect('/registracia');
            }
          else{  
     //       passport.authenticate('local',(req,res)=>{
              res.redirect('/'+req.body.username + '/dokoncenie')
      
                //   })
               /* 
                
                res.redirect("/profil")
            */
           
        } 
        })    
    })



// Registracia expert
app.route('/:username/dokoncenie')
    .get((req, res)=>{
      let url = req.params.username
      res.render('multistep_registration',{url:url})
    })

    .post((req,res)=>{
      /*
      User.findOneAndUpdate({username:req.params.dokoncenie},{  
        fullname:req.body.fullname,
        foto:req.body.foto,
        sex:req.body.sex,
        birth:req.body.birth,
        adress:req.body.adress,
        occupation:req.body.occupation,
        skills:req.body.skills,
        phone:req.body.phone,
        contactEmail:req.body.contactEmail,
        languages:req.body.languages,
        note:req.body.note,
        },(err=>{
         if(err) throw err;
         else{
          if(req.body.authentiaction === 'local'){
        // REDIRECT
        console.log(req.body)
           res.send('POTVRD EMAIL') 
           }
         else{
          res.redirect('/'+req.body.username + '/profil')
        // REDIRECT
          }
    }
    })
  ) 
  */
    console.log(req.body)
    res.redirect('/')
})

    
// Prihlasenie
app.route('/prihlasenie')
    .get((req,res)=>{
     res.render('prihlasenie')
  })

  .post(passport.authenticate('local',{failureRedirect:'/prihlasenie'}),(req,res)=>{
     res.redirect('/' + req.body.username+'/uprava')
    });

// Profil

// Load profile
app.route('/:profil/uprava')
   .get(isLoggedIn,(req,res)=>{
   let url = req.params.profil
   
   User.findOne({username:req.params.profil},(err,data)=>{
    if(err) throw err;
    else{   
    console.log(data)  
    res.render('profil',{url:url,data:data})  
  }
   })
 // console.log(req.params)   
})

// Edit profile
   .post((req,res)=>{
    User.findOneAndUpdate({username:req.params.profil},{  
    fullname:req.body.fullname,
    foto:req.body.foto,
    sex:req.body.sex,
    birth:req.body.birth,
    adress:req.body.adress,
    occupation:req.body.occupation,
    skills:req.body.skills,
    phone:req.body.phone,
    contactEmail:req.body.contactEmail,
    languages:req.body.languages,
    note:req.body.note,
    },(err=>{
     if(err) throw err;
     else{
       res.redirect('/'+req.params.profil+'/uprava')
     }
   }))
  })




 // Hladaj expertov
app.route('/experti')
    .get((req,res)=>{
      res.render('experti')
    })



// Odhlasenie
app.get('/odhlasenie',(req,res)=>{
    req.logout();
    res.redirect('/')
})


/*
// Linkedin prihlasenie
app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/dokoncenie?username=' + req.body.username',
  failureRedirect: '/prihlasenie'
}));

*/
// Server listen
app.listen(3000,(err,data)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log('Aplikacia spustena na serveri')
        
    }
})