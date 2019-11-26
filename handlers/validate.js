"use strict";
const request = require('request');
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

// ********** ANAGRAMS VALIDATOR **********  

function stringCompare (string1, string2) {
  var sorted1 = string1.split("").sort().join("");
  var sorted2 = string2.split("").sort().join("");
  return(sorted1 === sorted2);
}

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
  console.log('All anagrams API generated:');
  console.log(totalAnagrams);
  let totalScore = totalAnagrams.length;
  console.log(totalScore);


  // Here we double check that the values returned by this third party API
  // as per the instructions
  // just logging for now in case of bugs
  console.log('Are they all anagrams though?');

  var anCheck = true;
  if (totalScore > 1) {
    for (var i=0 ; i < totalScore-1 ; i++) {
      if (!stringCompare(totalAnagrams[i], totalAnagrams[0])) {
        anCheck = false;
      }
    }
  } 
  console.log(anCheck);

  // Let's check the user's anagrams

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