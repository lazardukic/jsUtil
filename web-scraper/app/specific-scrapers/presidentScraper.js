//imports
const requestor = require('request-promise');
const cheerio = require('cheerio');

//====================
// scrape presidents 
//====================
const scrapePresidents = function (url) {
  //get html from url
  return requestor(url)
    .then(function (html) {
      return {
        //define and return object
        name: cheerio('.firstHeading', html).text(),
        birthday: cheerio('.bday', html).text(),
      };
    })
    //catch error
    .catch(function (err) {
      console.log("Error retreiving data.");
    });
};

//exports
module.exports = scrapePresidents;