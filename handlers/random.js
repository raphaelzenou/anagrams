// var apireader = require('../apiget.js');
const request = require('request');
var ourResponse;
var anagramResponse;

// String randomisation
function randomString(chars) {
    var random       = '';
    var letters      = 'abcdefghijklmnopqrstuvwxyz';
    for ( var i = 0; i < chars; i++ ) {
        var letter = letters.charAt(Math.floor(Math.random() * letters.length));
        random += letter;
    }
    return random;
    }

// API call
function APIGet(url) {
    // var apiresponse ; 
    return new Promise(function(resolve, reject) {

        request(url, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('3. APIreader reponse:');
            console.log(body); // Print the HTML for the Google homepage.
            resolve(body);
          });
      });

    }
// API async function
module.exports.generate = async function (event, context) {

    var randomStringPreCheck =  randomString(6);
    // var randomStringPreCheck =  'blue';

    console.log('1. Generating random string >>'+ randomStringPreCheck);
    url = 'http://www.anagramica.com/best/' + randomStringPreCheck;
    console.log(url);

    console.log('2. Calling Anagramica\'s API with '+ url);
    var rawResponse = await APIGet(url);
    console.log('4. Response ');
    console.log(rawResponse);

    // if (rawResponse.best[0] === undefined || rawResponse.best[0].length < randomStringPreCheck.length ) { 
    //     // need to check the lenght of the anagrams offered by the API as they can be 1 letter
    //     // Here we assume that we only want the same number of letters
    //     console.log('NoValidAnagram');
    // }

    properResponse = {
        statusCode: 200,
        body : rawResponse
    }
    console.log('5. what is sent back to the browser: ');
    console.log(properResponse);
    return properResponse;
  };

//  if (anagramResponse.best[0] === undefined || anagramResponse.best[0].length < randomStringPreCheck.length ) { 
//     // need to check the lenght of the anagrams offered by the API as they can be 1 letter
//     // Here we assume that we only want the same number of letters
//     console.log('NoValidAnagram');
