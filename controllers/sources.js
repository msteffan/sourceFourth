var express = require("express");
var router = express.Router();
var Source = require("../db/connection").models.Source;
var User = require("../db/connection").models.User;

function error(res, req){
  response.status(500);
  response.json({error: message})
}

//GET a user's sources
router.get("/sources", function(req, res){
    console.log(req);
  User.findOne({ where: {id: req.query.userId}})
  .then(function(user){
    Source.findAll({where: {userId: user.id}})
    .then(function(sources, err){
        //console.log("I worked", sources);
        res.json(sources);
        //console.log(err);
    })

  });
});

//POST to sources
router.post("/sources", function(req, res){
    console.log(req);
    User.findOne({ where: {id: req.query.userId }}).then(function(user){
        var source = {
            name: req.query.name,
            profession: req.query.profession,
            location: req.query.location,
            userId: user.id
        };
      Source.create(source).then(function(source, err){
        res.json(source);
        //console.log(err);
        });
    })

  });

//patch specific source
router.put("/sources/:id", function(req, res){
  Source.findById(req.params.id).then(function(source){
    if(!source) return error(res, "not found");
    source.updateAttributes(req.body).then(function(updatedSource){
      res.json(updatedSource);
    });
  });
});

//DELETE specific source
router.delete("/sources/:id", function(req, res){
  Source.findById(req.params.id).then(function(source){
    if(!source) return error(res, "not found");
    source.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
