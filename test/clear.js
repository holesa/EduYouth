const mongoose              = require("mongoose"),
      User                  = require("../db/models/user");

module.exports = function(){
// Remove users used for testing
User.findOneAndRemove({email:"testemail@gmail.com"},(err,success)=>{
    if(err) console.log(err);
    else console.log("Test data removed");
})
}