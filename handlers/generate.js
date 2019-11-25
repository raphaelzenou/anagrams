"use strict";
const request = require('request');

// ********** RANDOM STRING GENERATOR ********** 

function randomStringFunc(chars) {
    return new Promise((resolve) => {
        var randomString = '';
        var letters      = 'abcdefghijklmnopqrstuvwxyz';
        for ( var i = 0; i < chars; i++ ) {
            var letter = letters.charAt(Math.floor(Math.random() * letters.length));
            randomString += letter;
        }
        resolve(randomString);
    });
}

// ********** API RESULT INCL. RANDOM STRING ********** 

function apiCallFunc(string) {
    return new Promise((resolve) => {
        const url = 'http://www.anagramica.com/best/' + string;
        request({ method: "GET", url: url }, function (error, response, body) {
            // console.error('error:', error); // for debugging
            console.log('API response:', body);
            resolve(
            {"string" : string, 
            "apiresponse" : JSON.parse(body)
            });
          });
    })
}

// ********** ASYNC API CALLER ********** 

async function apiGeneratorFunc() {
    try {
        let randomString = await randomStringFunc(6);
        let apiCallResult = await apiCallFunc(randomString);
        return apiCallResult;
    }
    catch(error) {
        return error;
    }
}

// ********** ASYNC RANDOM STRING VALIDATOR ********** 

// We could go further here in the tests 
// For instance check if the string generated
// is not in the dictionary via http://www.anagramica.com/lookup/:word
// but this not in the instructions i.e. not the MVP
// user might just be lucky a get a proper word so a free point

async function validStringFunc() {
    let valid = false;
    try {
        let apiTest = await apiGeneratorFunc();
        do {
            if (apiTest.apiresponse.best[0] != undefined 
                && apiTest.apiresponse.best[0].length == apiTest.string.length ){
                valid = true;
                console.log('SUCCESS.. RESPONDING STRING');
                console.log(apiTest.string);
                console.log(apiTest.apiresponse.best[0]);
                return apiTest.string;
            } else {
                console.log('FAIL.. REGENERATING STRING');
                console.log(apiTest.string);
                console.log(apiTest.apiresponse.best[0]);
                apiTest = await apiGeneratorFunc();
            } 
        } while (valid === false );
    }
    catch(error) {
        return error;
    }
}

// ********** HANDLER ********** 

//  No callback as we are using async/await
module.exports.generateFunc = async (event) => {

    let validString = await validStringFunc();
    console.log('Valid string:', validString);

    // Returning a valid random string 
    // i.e. with at least one anagram 
    // of the same number of chars
    
    var response = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({"generatedString": validString })
    };
    return response;
}