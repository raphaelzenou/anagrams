/// THIS IS a standard mysql attempt to 
// solve the following AWS Lambda message:
// from the CloudWatch logs
//"errorId": "TimeoutError!$Function execution duration going to exceeded configured timeout limit.",
//"errorFatal": true,
//"errorCulprit": "timeout",
//"errorExceptionType": "TimeoutError",


"use strict";
const config = require('../config.json');

// Require and initialize outside of the main handler
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : config.dbhost,
  database : config.dbname,
  user     : config.dbuser,
  password : config.dbpassword
});

var queryData;

// ********** DATABASE QUERY  ********** 

function dbQuery(sql) {
  return new Promise((resolve) => {

      // connection.connect();

      connection.query(sql, (error, rows) => {
        if(error) {
          throw error;
        } else {
          console.log('Connection OK, queryData =');
          // setValue(rows); 
          var queryData;
          queryData = rows[0];
          resolve(queryData);
        }
      });
      connection.end();
  });
}

// ********** HANDLER ********** 

module.exports.statisticsFunc = async (event, res, context) => {
  // Getting the path variable = userId
  let id = event.pathParameters.userId;

  let sql = `SELECT COUNT(*) as numberOfSubmissions, SUM(totalscore) as totalAvailableScore, SUM(score) as totalUserScore FROM anagramstable WHERE userid = '${id}'`;

  var statsUser = await dbQuery(sql);
  console.log('statsUser :');
  console.log(statsUser); 

// Returning the query results

var response = 
{statusCode: 200,
  body: JSON.stringify(statsUser),
}
return response;
}
