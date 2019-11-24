module.exports.generate = (event, context, callback) => {
    console.log('Random anagram friendly letters being generated...')

    // randomisation
    var randomString = "random";
    //http://www.anagramica.com/best/:letters

    // check if not in the dictionary (maybe?)
    //http://www.anagramica.com/lookup/:word

    
    const response = {
      statusCode: 200,
      body: JSON.stringify({generatedString: randomString})
    }
    callback(null, response);
  };