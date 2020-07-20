const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('ORM_TEST', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
  }
});

module.exports = sequelize;
global.sequelize = sequelize;