const requestor = require('request-promise');
const cheerio = require('cheerio');

const scrapePresidents = function(url) {
  return requestor(url)
    .then(function(html) {
      return {
        name: cheerio('.firstHeading', html).text(),
        birthday: cheerio('.bday', html).text(),
      };
    })
    .catch(function(err) {
      console.log("Error retreiving data.");
    });
};

module.exports = scrapePresidents;