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
  User.findOne({ where: {id: req.query.userId}})
  .then(function(user){
    Source.findAll({where: {userId: user.id}})
    .then(function(sources, err){
        //console.log(sources[0].dataValues);
        var sourceArray = [];
        for (var i=0;i<sources.length; i++){
            var oneSource = sources[i].dataValues;
            sourceArray.push(oneSource)
        }
        console.log(sourceArray);
        res.json(sourceArray);
        //console.log(err);
    })

  });
});

//POST to sources
router.post("/sources", function(req, res){
    User.findOne({ where: {id: req.query.userId }}).then(function(user){
        var source = {
            name: req.query.name,
            profession: req.query.profession,
            location: req.query.location,
            email: req.query.email,
            phone: req.query.phone,
            other: req.query.other,
            userId: user.id
        };
      Source.create(source).then(function(source, err){
          console.log(source);
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
      console.log(source);
    if(!source) return error(res, "not found");
    source.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
