// Install Sequelize dependency
const Sequelize = require('sequelize');

// Reads .env file
require('dotenv').config();

// Destructure values from .env file for SQL server connection
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Establish SQL server through Sequelize
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;