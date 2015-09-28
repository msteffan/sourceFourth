var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var methodOverride = require('method-override');
var db = require("./db/connection");
var pg = require('pg');
var usersController = require("./controllers/users");
var sourcesController = require("./controllers/sources");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


app.use("/", usersController);
app.use("/", sourcesController);

// pg.connect(process.env.SOURCEFOURTH_URL, function(err, client) {
//   if (err) throw err;
//   // console.log('Connected to postgres! Getting schemas...');
//   //
//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       //console.log(JSON.stringify(row));
//     });
// });



app.use(require("cookie-parser")())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(session({
  secret: "some secret"
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "hbs")



var fs = require("fs")
if (fs.existsSync("./env.js")){
 //console.log("yes")
 var env = require("./env");
}
else {
 var env = process.env;
}

// if (process.env.SOURCEFOURTH_URL) {
//   // the application is executed on Heroku ... use the postgres database
//   sequelize = new Sequelize(process.env.SOURCEFOURTH_URL, {
//     dialect:  'postgres',
//     protocol: 'postgres',
//     logging:  true //false
//   });
// } else {
//   // the application is executed on the local machine
//   sequelize = new Sequelize("postgres:///sourceFourth");
// }


passport.use(new LocalStrategy(function(username, pass, callback){
    db.models.User.findOne({where: { username: username }
    }).then(function(user, err){
        if(err){
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

app.use(passport.initialize());
app.use(passport.session());



app.post('/signup', function(req, res, next){
    db.models.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user){
        if(!user){
            db.models.User.create({
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

app.post("/signin", passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/#/sources"
}));

app.get('/signout',
    function(req, res){
      req.session.destroy();
      res.redirect('/');
  }
);

app.use(function(req, res, callback){
    if(req.user){
        res.locals.currentUser = req.user.username;
        res.locals.userId = req.user.id;
    }
    callback()
})

app.get('/', function(req, res) {
     // res.sendFile(__dirname + "/public/index.html");
    res.render("index", {})

});

app.get("/currentUser", function(req, res){
  res.json(req.user.id);
});


  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
