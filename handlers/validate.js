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

// // ********** ASYNC API CALLER ********** 


async function apiGeneratorFunc(string) {
    try {
        let apiCallResult = await apiCallFunc(string);
        return apiCallResult;
    }
    catch(error) {
        return error;
    }
}

// // ********** ASYNC RANDOM STRING VALIDATOR ********** 


// async function validStringFunc() {
//     let valid = false;
//     try {
//         let apiTest = await apiGeneratorFunc(); // init
//         do {
//             // if (apiTest.string.length === apiTest.apiresponse.best[0]){
//             if (apiTest.apiresponse.best[0] != undefined 
//                 && apiTest.apiresponse.best[0].length == apiTest.string.length ){
//                 valid = true;
//                 console.log('SUCCESS.. RESPONDING STRING');
//                 console.log(apiTest.string);
//                 console.log(apiTest.apiresponse.best[0]);
//                 return apiTest.string;
//             } else {
//                 console.log('FAIL.. REGENERATING STRING');
//                 console.log(apiTest.string);
//                 console.log(apiTest.apiresponse.best[0]);
//                 apiTest = await apiGeneratorFunc(); // new
//             } 
//         } while (valid === false );
//     }
//     catch(error) {
//         return error;
//     }
// }

// ********** ASYNC FUNCTION HANDLER ********** 

//  No callback as we are using async/await

module.exports.validateFunc = async (event) => {
  const postData = JSON.parse(event.body);
  console.log('POST Data received:');
  console.log(postData);

  let userId = postData.userId;
  let generatedString = postData.generatedString;

  // Response elements in order
  let totalScore = 0;
  let score = 0;
  let anagrams = postData.anagrams;
  let correct = [];
  let incorrect = [];

  // Now testing the POST data
  console.log('Fetching anagrams:');

  let apiResponse = await apiGeneratorFunc(generatedString); // init
  console.log(apiResponse);
  let totalAnagrams = apiResponse.best;
  console.log('All anagrams:');
  console.log(totalAnagrams);

  var response = 
  {
    statusCode: 200,
    body: JSON.stringify({apiResponse}),

  }
  return response; 
  }