
"use strict";
const request = require('request');

function apiCallFunc(string) {
    return new Promise((resolve) => {
        const url = 'http://www.anagramica.com/best/' + string;
        request({ method: "GET", url: url }, function (error, response, body) {
            // console.error('error:', error); // for debugging
            console.log('Request body:', body);
            resolve(body); // where the promise is honoured
          });
    })
}

function randomStringFunc(chars) {
    var randomString = '';
    var letters      = 'abcdefghijklmnopqrstuvwxyz';
    for ( var i = 0; i < chars; i++ ) {
        var letter = letters.charAt(Math.floor(Math.random() * letters.length));
        randomString += letter;
    }
    return randomString;
}

async function validStringFunc() {
    try {
        let randomString = randomStringFunc(6);
        let apiCallResult = await apiCallFunc(randomString);
        return apiCallResult;
    }
    catch(error) {
        return error;
    }
}

//  No callback as we are using async/await

module.exports.generateFunc = async (event) => {

    let validString = await validStringFunc();
    console.log('Valid string:', validString);
    console.log('Parsed first elem: ', JSON.parse(validString).best[0]);

    // return validString;
    var response =
    {
        statusCode: 200,
        // body : JSON.stringify({"generatedString": validString })
        body : validString
    };
    return response;
}