"use strict";
const request = require('request');

// // ********** API RESULT ********** 

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
// same function as for the generate handler
// but with a string input
// should be made a module to be used in both handlers

async function apiGeneratorFunc(string) {
    try {
        let apiCallResult = await apiCallFunc(string);
        return apiCallResult;
    }
    catch(error) {
        return error;
    }
}

// ********** ASYNC FUNCTION HANDLER ********** 
//  No callback as we are using async/await

module.exports.validateFunc = async (event) => {
  const postData = JSON.parse(event.body);
  console.log('POST Data received:');
  console.log(postData);

  let userId = postData.userId;
  let generatedString = postData.generatedString;

  // Response elements in order
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
  
  var response = 
  {
    statusCode: 200,
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