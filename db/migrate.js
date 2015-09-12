var DB = require("./connection");

DB.sequelize.sync({force: true}).then(function(){
  process.exit();
});
