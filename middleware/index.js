const middlewareObj = {};

// Middlewere to verify logged users
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
         next();
    } else{
      res.redirect("/prihlasenie")
    }
}

module.exports = middlewareObj;