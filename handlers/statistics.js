"use strict";
const config = require('../config.json');

// ********** DB CONFIG ********** 

const mysql = require('serverless-mysql')({
  config: {
    host     : config.dbhost,
    database : config.dbname,
    user     : config.dbuser,
    password : config.dbpassword
  }
});

// ********** HANDLER ********** 

//  No callback as we are using async/await
module.exports.statisticsFunc = async (event, context) => {
  
// getting the path variable = userId
let id = event.pathParameters.userId;

// DB Connection + Query
await mysql.connect();
let statsUser = await mysql.query('SELECT COUNT(*) as numberOfSubmissions, SUM(totalscore) as totalAvailableScore, SUM(score) as totalUserScore FROM anagramstable where userid = ?', [id]);
await mysql.quit();

// Returning the results
var response = {
  statusCode: 200,
  body: JSON.stringify(statsUser[0])
}
return response;
}