"use strict";

module.exports.statistics = (event, context, callback) => {
    // getting the path variable = userId
    var id = event.pathParameters.userId;
    const message = 'Welcome to our anagrams game ' + id;
    const response = {
      statusCode: 200,
      body: JSON.stringify({message: message})
    }
    callback(null, response);
  };