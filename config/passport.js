const passport      = require("passport");
const LocalStrategy = require("passport-local");
 

function config(){
    passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username:username},(err, user)=>{
        if (err) {return done(err);}
        if (!user) {return done(null, false);}
        if (!user.verifyPassword(password)) {return done(null, false)}
        return done(null, user);
    })
}))
}


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        return res.redirect("/login")
    }
}

module.exports = config;
module.exports = isLoggedIn;

 