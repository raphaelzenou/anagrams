"use strict";
const config = require('../config.json');

// Require and initialize outside of the main handler
const mysql = require('serverless-mysql')({
  config: {
    host     : config.dbhost,
    database : config.dbname,
    user     : config.dbuser,
    password : config.dbpassword
  }
});

// Main handler function
module.exports.statisticsFunc = async (event, context) => {
  // Run your query
  // getting the path variable = userId
  let id = event.pathParameters.userId;

  await mysql.connect();
  
  let statsUser = await mysql.query('SELECT COUNT(*) as numberOfSubmissions, SUM(totalscore) as totalAvailableScore, SUM(score) as totalUserScore FROM anagramstable where userid = ?', [id]);
//   // Run clean up function
  // await mysql.end();
  mysql.quit();

// Return the results

var response = 
{statusCode: 200,
  body: JSON.stringify(statsUser),}
return response;
}
