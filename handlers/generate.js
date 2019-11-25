
"use strict";
const request = require('request');

function apiCallFunc(string) {
    return new Promise((resolve) => {
        const url = 'http://www.anagramica.com/best/' + string;
        request({ method: "GET", url: url }, function (error, response, body) {
            // console.error('error:', error); // for debugging
            console.log('Request body:', body);
            resolve(
            {"string" : string, 
            "apiresponse" : JSON.parse(body)
            });
          });
    })
}

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

// async function validStringFunc() {
//     try {
//         let apiTest = await apiGeneratorFunc();
//         while JSON.parse(apiTest).best[0]

//         return apiCallResult;
//     }
//     catch(error) {
//         return error;
//     }
// }


//  No callback as we are using async/await

module.exports.generateFunc = async (event) => {

    let validString = await apiGeneratorFunc();
    // let validString = await validStringFunc();
    console.log('Valid string:', validString);
    console.log('Parsed strings vs 1st elem: ');
    console.log(validString.string);
    console.log(validString.apiresponse.best[0]);

    // return validString;
    var response =
    {
        statusCode: 200,
        body : JSON.stringify({"generatedString": validString })
        // body : validString
    };
    return response;
}