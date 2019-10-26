const express       = require('express');
const app           = express();
const path          = require('path');
const ejs           = require('ejs');
const mongoose      = require('mongoose');
mongoose.connect('mongodb://localhost/user',{useNewUrlParser:true});
const User          = require('./models/user');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt        = require('bcryptjs');
const flash         = require('connect-flash');



app.set('view engine','ejs')

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

// Middlewere to verify logged users
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
         next();
    } else{
      res.redirect('/prihlasenie')
    }
}

// Global variables
app.use(function(req, res, next){
res.locals.success = req.flash('success');
res.locals.error   = req.flash('error');
next()
})


// Homepage
app.get('/',(req,res)=>{
    res.render('index')
})


// Registracia
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
            throw err;
            }
          else{  
     //       passport.authenticate('local',(req,res)=>{
                req.flash("success","Váš účet bol práve vytvorený.")
                res.redirect('/prihlasenie')
         //   })
               /* 
                
                res.redirect("/profil")
            */
           
        } 
        })    
    })



    
// Prihlasenie
app.route('/prihlasenie')
    .get((req,res)=>{
     res.render('prihlasenie')
  })

 .post(passport.authenticate('local',{successRedirect: '/profil', failureRedirect:'/prihlasenie'}),(req,res)=>{
    });

// Profil
app.get('/profil',isLoggedIn,(req,res)=>{
    res.render('profil')
})


// Odhlasenie
app.get('/odhlasenie',(req,res)=>{
    req.logout();
    res.redirect('/')
})



// Server listen
app.listen(3000,(err,data)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log('Aplikacia spustena na serveri')
        
    }
})