var express = require("express");
var router = express.Router();
var User = require("../db/connection").models.User;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

//GET all users
router.get("/users", function(req, res){
  User.findAll().then(function(users){
    res.json(users);
  });
});

//GET specific user
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id).then(function(user){
      res.send()
    // if(!user) return error(res, "not found");
    // res.render("users/show.hbs", {});

  });
});

//CREATE new user

//EDIT specific user ==== patch?

//DELETE specific user

module.exports = router;
