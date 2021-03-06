var Sequelize = require('sequelize');

module.exports = sequelize.define('User', {
    // attributes
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
     
    },
    sex: {
      type: Sequelize.STRING
     
    },
    phone: {
      type: Sequelize.STRING
     
    },
    email: {
      type: Sequelize.STRING
     
    },
    password: {
      type: Sequelize.STRING
     
    },
    avatar: {
      type: Sequelize.STRING
     
    }
  });

