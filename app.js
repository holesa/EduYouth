const express               = require("express"),
      app                   = express(),
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
      helmet                = require("helmet"),
      dotenv                = require("dotenv");
      
// Require routes
const indexRoute            = require("./routes/index"),
      expertsRoute          = require("./routes/experts"),
      profileRoute          = require("./routes/profile");

// General configurations
app.set("view engine","ejs");
app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    exdended:false
}));

// Configure env and port
dotenv.config();
const port = parseInt(process.env.PORT);

// Connect to database
const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
mongoose.connect(url, {useNewUrlParser: true},(err,res)=>{
  if(err) {
    console.log(err);
  }
  else {
    console.log('MongoDB connection succeeded.');
  }
});

// Create seed data for database - call just once
//seedDb()

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
app.listen(port,(err,data)=>{
    if (err){
        console.log(err)
    } else {
        console.log("Aplikacia spustena na serveri")
    }
})

module.exports = app;

