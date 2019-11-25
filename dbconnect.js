const Sequelize = require("sequelize");
const config     = require('./config.json');
const mysql2 = require("mysql2");

// const sequelize = new Sequelize("db-url");


const sequelize = new Sequelize(config.dbname, config.dbuser, config.dbpassword, {
  host: config.dbhost,
  port: config.dbport,
  dialect: 'mysql',
  dialectModule: mysql2,
  operatorsAliases: false});

const anagrams = require("./models/anagrams")(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  anagrams
};

module.exports = db;




db.sequelize.sync(/*{ force: true }*/);

