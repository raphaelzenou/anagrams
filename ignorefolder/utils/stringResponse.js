const request = require('request-promise');

module.exports = body => {
  console.log('Et voila le body:' , body);
  return body;
};