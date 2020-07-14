const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('ORM_TEST', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize;
global.sequelize = sequelize;