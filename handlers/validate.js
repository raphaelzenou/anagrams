"use strict";
// const request = require('request');

// // ********** RANDOM STRING GENERATOR ********** 

// function randomStringFunc(chars) {
//     return new Promise((resolve) => {
//         var randomString = '';
//         var letters      = 'abcdefghijklmnopqrstuvwxyz';
//         for ( var i = 0; i < chars; i++ ) {
//             var letter = letters.charAt(Math.floor(Math.random() * letters.length));
//             randomString += letter;
//         }
//         resolve(randomString);
//     });
// }

// // ********** API RESULT + STRING TESTED ********** 

// function apiCallFunc(string) {
//     return new Promise((resolve) => {
//         const url = 'http://www.anagramica.com/best/' + string;
//         request({ method: "GET", url: url }, function (error, response, body) {
//             // console.error('error:', error); // for debugging
//             console.log('API response:', body);
//             resolve(
//             {"string" : string, 
//             "apiresponse" : JSON.parse(body)
//             });
//           });
//     })
// }

// // ********** ASYNC API CALLER ********** 


// async function apiGeneratorFunc() {
//     try {
//         let randomString = await randomStringFunc(3);
//         let apiCallResult = await apiCallFunc(randomString);
//         return apiCallResult;
//     }
//     catch(error) {
//         return error;
//     }
// }

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
  console.log('voila ce quon a recu');
  console.log(postData);

  // db.anagrams.create({
  //   userId: body.userId,
  //   generatedString: body.generatedString,
  //   anagrams: body.anagrams
  // })

    var response = 
    {
      statusCode: 200,
      body: JSON.stringify({postData}),
    }
    return response; 
  }