const db = require('../dbconnect.js');

module.exports.validate = (event, context, callback) => {
    const body = JSON.parse(event.body);
    console.log('voila ce quon a recu');
    console.log(body);

    db.anagrams.create({
      userId: body.userId,
      generatedString: body.generatedString,
      anagrams: body.anagrams
    })
    .then(submission => {

      const response = {
        statusCode: 200,
        body: JSON.stringify({submission: submission}),
      }
      return callback(null, response); 
      });
    };

    // var db_response = {
    //   "totalScore": 3,
    //   "score": 0,
    //   "anagrams": ["snail", "nails", "slain"],
    //   "correct": ["snail"],
    //   "incorrect": ["sailn"]
    // };
    