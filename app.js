const express               = require("express"),
      app                   = express(),
      path                  = require("path"),
      ejs                   = require("ejs"),
      mongoose              = require("mongoose"),
      User                  = require("./db/models/user"),
      Token                 = require("./db/models/token"),
      seedDb                = require("./db/seeds/seed"),
      bodyParser            = require("body-parser"),
      session               = require("express-session"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      bcrypt                = require("bcryptjs"),
      nodemailer            = require("nodemailer"),
      flash                 = require("connect-flash"),
      helmet                = require("helmet");
      
      
// Require routes
const indexRoute            = require("./routes/index.js"),
      expertsRoute          = require("./routes/experts.js"),
      profileRoute          = require("./routes/profile.js");

// General configurations
app.set("view engine","ejs");
app.use(helmet());
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({
    exdended:false
}));

// Connect to database
mongoose.connect("mongodb://localhost/user",{useNewUrlParser:true});
seedDb()

// Passport configuration
app.use(session({
    secret:"eifeif6ew5f46ewf9969fjiwe6565qe6fewfwefjewjfiewjfewfkeif56f54e6f5sdfm",
    resave:false,
    saveUninitialized:false    
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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
        if (isMatch) {return done(null, user);
        } else {
          return done(null, false)      
        }   
        }))
        return done(null, user);
    })
}))

// Set local variable
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error")
  next();
});  

// Use routes
app.use("/profil", profileRoute);
app.use("/experti", expertsRoute);
app.use("/", indexRoute);


// Server listen
app.listen(3000,(err,data)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log("Aplikacia spustena na serveri")
        
    }
})

module.exports = app;

