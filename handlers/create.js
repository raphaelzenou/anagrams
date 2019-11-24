module.exports.validate = (event, context, callback) => {
    const body = JSON.parse(event.body);
    console.log(body);
    const userInput = body;
    const response = {
      statusCode: 200,
      body: JSON.stringify({
      userInput: userInput}),
    }
    callback(null, response);
  };

// For future devs with the http://www.anagramica.com/api 

// var Request = require("request");
// Request.post({
//     "headers": { "content-type": "application/json" },
//     "url": "http://httpbin.org/post",
//     "body": JSON.stringify({
//         "firstname": "Nic",
//         "lastname": "Raboy"
//     })
// }, (error, response, body) => {
//     if(error) {
//         return console.dir(error);
//     }
//     console.dir(JSON.parse(body));
// });