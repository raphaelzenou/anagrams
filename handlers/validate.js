"use strict";
const request = require('request');
const config = require('../config.json');
const compare = require('../stringcompare.js');

// Require and initialize outside of the main handler
const mysql = require('serverless-mysql')({
  config: {
    host     : config.dbhost,
    database : config.dbname,
    user     : config.dbuser,
    password : config.dbpassword
  }
});

// ********** API RESULT ********** 

// same function as for the generate handler
// but without the random string output

function apiCallFunc(string) {
    return new Promise((resolve) => {
        const url = 'http://www.anagramica.com/best/' + string;
        request({ method: "GET", url: url }, function (error, response, body) {
            // console.error('error:', error); // for debugging
            console.log('API response:', body);
            resolve(JSON.parse(body));
          });
    })
}

// ********** ASYNC API CALLER ********** 
// similar function as for the generate handler
// but with a string input
// could be made a module to be used in both handlers

async function apiGeneratorFunc(string) {
    try {
        let apiCallResult = await apiCallFunc(string);
        return apiCallResult;
    }
    catch(error) {
        return error;
    }
}

// ********** HANDLER ********** 
//  No callback as we are using async/await

module.exports.validateFunc = async (event) => {
  const postData = JSON.parse(event.body);
  console.log('POST Data received:');
  console.log(postData);

  let userId = postData.userId;
  let generatedString = postData.generatedString;

  // Response elements in order :

  // let totalScore;
  // let score;
  let anagrams = postData.anagrams;
  let correct = [];
  let incorrect = [];

  // Now testing the POST data
  // First let's get all possible anagrams
  console.log('Fetching anagrams:');

  let apiResponse = await apiGeneratorFunc(generatedString); // init
  console.log(apiResponse);
  let totalAnagrams = apiResponse.best;
  console.log('All anagrams:');
  console.log(totalAnagrams);
  console.log('Number of anagrams:');
  console.log(totalAnagrams.length);

  // Here we can add a loop to double check that the values returned by this third party API
  // Create a method that accepts two strings and 
  // determines whether the strings are anagrams of each other.

  let totalScore = totalAnagrams.length;

  // Second let's check the user's anagrams

  // As we made sure generatedString 
  // had same length anagrams
  // We know the totalAnagrams list is fair

  anagrams.forEach(anagram => {
        if (totalAnagrams.includes(anagram)) {
          correct.push(anagram);
        } else {
          incorrect.push(anagram);
        }
    });
  console.log('User anagrams:');
  console.log(anagrams);
  console.log('Correct user anagrams:');
  console.log(correct);
  console.log('Incorrect user anagrams:');
  console.log(incorrect);

  let score = correct.length;
  

  await mysql.connect();
  let dbData = {
    'userid' : userId,
    'generatedstring' : generatedString,
    'anagrams' : anagrams.toString(),
    'totalscore' : totalScore,
    'score' : score,
    'totalanagrams' : totalAnagrams.toString(),
    'correct' : correct.toString(), 
    'incorrect' : incorrect.toString(),
    'date' : new Date()
    };
  let dbQuery ='INSERT INTO anagramstable SET ?' ;
  let statsUser = await mysql.query(dbQuery, dbData);
  //   // Run clean up function
  // await mysql.end();
  await mysql.quit();

  var response = 
  {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      totalScore,
      score,
      anagrams,
      correct, 
      incorrect,
      }),
  }
  return response; 
  }