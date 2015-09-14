module.exports = function(sequelize, Sequelize){
  return sequelize.define("user", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });

}
