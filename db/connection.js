var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///sourthForth");

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize("postgres:///sourceFourth");
}

var User = sequelize.import("../models/user");
var Source = sequelize.import("../models/source");

Source.belongsTo(User);
User.hasMany(Source);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Source: Source
  }
}
