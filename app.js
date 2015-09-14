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
var contactsController = require("./controllers/contacts");

app.use("/", usersController);
app.use("/", contactsController);

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
var Strategy = require("passport-http").DigestStrategy;
passport.use(new Strategy({ qop: 'auth' },
  function(username, password, cb) {
      db.models.User.findOrCreate({where: {
          username: username,
          password: password
      }}).then(function(err, user) {
        //   console.log(user);
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password){
            return cb(null, false);
        }
        return cb(null, user);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth',
  passport.authenticate('basic', { session: true }),
  function(req, res) {
    res.json({ username: req.user.username, email: req.user.emails[0].value });
  });

app.get("/signout", function(req, res){
  req.session.destroy()
  res.redirect("/")
})

// app.get("/", function(req, res){
//   res.render("index", {})
// });

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
