var express = require("express");
var router = express.Router();
//.Router();
var bcrypt = require("bcrypt-nodejs");
var db = require("../db/connection");

var User = require("../db/connection").models.User;
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;



passport.use(new LocalStrategy(function(username, pass, callback){
    User.findOne({where: { username: username }

    //db.models.User.findOne({where: { username: username }
    }).then(function(user, err){
        console.log(user);
        console.log(err);
        if(err){
            console.log(err);
            return callback(err)
        }
        if (!user){
            return callback(null, false);
        }
        if (!bcrypt.compareSync(pass, user.password)){
            return callback (null, false)
        }
        return callback(null, user)
    });
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, cb){
  db.models.User.findById(id).then(function(user){
    cb(null, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', function(req, res, next){
    console.log(req);
    User.findOne({
    // db.models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user){
        if(!user){
            User.create({
            //db.models.User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password)
            }).then(function(user){
                passport.authenticate("local", {
                    failureRedirect: "/",
                    successRedirect: "/#/sources"
                })(req, res, next)
            })
        } else {
            res.send("user exists!")
        }
    })
});

router.post("/signin", passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/#/sources"
}));

router.get('/signout',
    function(req, res){
      req.session.destroy();
      res.redirect('/');
  }
);

module.exports = router;
