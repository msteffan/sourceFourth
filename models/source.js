module.exports = function(sequelize, Sequelize){
  return sequelize.define("source", {
    name: { type: Sequelize.STRING, allowNull: false},
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    profession: Sequelize.STRING,
    location: Sequelize.STRING,
    other: Sequelize.TEXT,
    userId: Sequelize.INTEGER
  });
}
