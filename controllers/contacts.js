var express = require("express");
var router = express.Router();
var Contact = require("../db/connection").models.Contact;
var User = require("../db/connection").models.User;

function error(res, req){
  response.status(500);
  response.json({error: message})
}

//GET a user's contacts
router.get("/contacts", function(req, res){
  User.findOne({ where: {spotifyId: req.session.profile.id}})
  .then(function(user){
    Contact.findAll({where: {userId: user.id}})
    .then(function(contacts, err){
        //console.log("I worked", contacts);
        res.json(contacts);
        //console.log(err);
    })

  });
});

//POST to contacts
router.post("/contacts", function(req, res){
    User.findOne({ where: {spotifyId: req.session.profile.id }}).then(function(user){
        var contact = {
            name: req.body.name,
            profession: req.body.profession,
            location: req.boddy.location,
            userId: user.id
        };
      Contact.create(contact).then(function(contact, err){
        res.json(contact);
        //console.log(err);
        });
    })

  });

//patch specific contact
router.patch("/contacts/:id", function(req, res){
  Contact.findById(req.params.id).then(function(contact){
    if(!contact) return error(res, "not found");
    contact.updateAttributes(req.body).then(function(updatedContact){
      res.json(updatedContact);
    });
  });
});

//DELETE specific contact
router.delete("/contacts/:id", function(req, res){
  Contact.findById(req.params.id).then(function(contact){
    if(!contact) return error(res, "not found");
    contact.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
