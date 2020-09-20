const express               = require("express"),
      app                   = express(),
      User                  = require("../db/models/user"),
      internalData          = require("../db/seeds/internal"),
      middleware            = require("../middleware/index")
      route                 = express.Router();
      

// Hladaj expertov
route.route("/")
// Pridaj middleware
    .get(middleware.isLoggedIn,(req,res)=>{
      if(req.user.role==="expert"){
        res.send("Neoprávnený vstup")
      }
      const filter = {
        role:"expert",
        subject:{
          $in: req.query.predmety===undefined ? internalData.subjects : req.query.predmety
        },
        lecturing:{
          $in: req.query.vyucba===undefined ? internalData.teaching : req.query.vyucba
        },
        city:{
          $in: req.query.city===undefined ? internalData.city : req.query.city
        }
    }
      User.find(filter,(err,users)=>{
        if(err) throw err;
        else{
          res.render("find_experts",{internalData:internalData, users:users})
        }
      })
    })

route.route("/:id")
  .get(middleware.isLoggedIn,(req,res)=>{
    if(req.user.role==="expert"){
      res.send("Neoprávnený vstup")
    }
    User.findOne({_id:req.params.id},(err,data)=>{
      res.render("expert",{data:data})
    })
  })


module.exports = route;      

  