const request = require('request-promise');

module.exports = chars => {
//   const url = 'http://www.anagramica.com/best/' + chars;
//   return request({ method: "GET", url: url });
// };

try {
  const url = 'http://www.anagramica.com/best/' + chars;
  return Promise.resolve(request({ method: "GET", url: url }));
} catch (error) {
  return Promise.reject(`Error retrieving API data: ${JSON.stringify(error)}`);
}
}