var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
app.use(session({
  secret: "some secret"
}))
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var db = require("./db/connection");
var pg = require('pg');
var usersController = require("./controllers/users");
var sourcesController = require("./controllers/sources");

app.use("/", usersController);
app.use("/", sourcesController);

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  // console.log('Connected to postgres! Getting schemas...');
  //
  // client
  //   .query('SELECT table_schema,table_name FROM information_schema.tables;')
  //   .on('row', function(row) {
  //     //console.log(JSON.stringify(row));
  //   });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(methodOverride('_method'));
app.use("/", express.static(path.join(__dirname + "/public")));

app.get('/', function(req, res) {
     res.sendFile(__dirname + "/public/index.html");
    // load the single view file (angular will handle the page changes on the front-end)
    res.set('Content-Type', 'application/json');
});

// var fs = require("fs")
// if (fs.existsSync("./env.js")){
//  console.log("yes")
//  var env = require("./env");
// }
// else {
//  var env = process.env;
// }

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// passport.use(new LocalStrategy({},
//   //   function(username, password, cb) {
//   //   db.models.User.findByUsername(username, function(err, user) {
//   //     if (err) { return cb(err); }
//   //     if (!user) { return cb(null, false); }
//   //     if (user.password != password) { return cb(null, false); }
//   //     return cb(null, user);
//   //   });
//   // }));
//   function(username, password, done) {
//       //console.log(username, password);
//       db.models.User.findOrCreate({where: {
//           username: username,
//           password: password,
//          // session: true
//       }}).then(function(err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (user.password != password){ return done(null, false); };
//         return done(null, user);
//     });
// }));

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.models.User.findOrCreate({where:{ username: username, password: password } }).then(function(response, err){
        if (err) { return done(err); }
        if (!response[0].dataValues.user) { return done(null, false); }
        if (user.password != !response[0].dataValues.password) { return done(null, false); }
     // return cb(null, user);
      return done(null, response[0].dataValues);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.models.User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {}),
  function(req, res) {
      res.send("i worked")
    //res.redirect('/');
  }
);

app.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/');
  }
);


  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
