module.exports = function(sequelize, Sequelize){
  return sequelize.define("source", {
    name: Sequelize.STRING,
    profession: Sequelize.STRING,
    location: Sequelize.STRING,
    userId: Sequelize.INTEGER
  });
}
