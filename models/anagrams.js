// const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
  })

var config     = require('../config.json');

// Connection to the AWS RDS MySQL database
// from a config.json file not uploaded on GitHub
var connection = mysql.createConnection({
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database : config.dbname
});

if(!err){
  console.log('MySql Connected!');
  connection.end();
} else {
  console.log("Error connecting database ..." + err.message);
};