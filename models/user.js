module.exports = function(sequelize, Sequelize){
  return sequelize.define("user", {
    name: Sequelize.STRING,
    pass: Sequelize.STRING
    // spotifyId: Sequelize.STRING
  });

}
