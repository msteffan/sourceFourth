module.exports = function(sequelize, Sequelize){
  return sequelize.define("contact", {
    name: Sequelize.STRING,
    profession: Sequelize.STRING,
    location: Sequelize.STRING,
    userId: Sequelize.INTEGER
  });
}
