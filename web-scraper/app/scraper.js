//imports
const requestor = require('request-promise');
const cheerio = require('cheerio');
const presidentScraper = require('./specific-scrapers/presidentScraper');

//constants
const URL_US_PRESIDENTS = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const searchElement = 'big > a';

//function call
scrapeData(URL_US_PRESIDENTS, searchElement);

//===============
//  scrape data 
//===============
function scrapeData(url, searchElement) {
  //get html content from url
  requestor(url)
    .then(function (html) {
      const urls = [];
      //get number of searchElement occurrences from html
      let numberOfSearchElements = cheerio(searchElement, html).length;
      //get urls for additional scraping
      for (let i = 0; i < numberOfSearchElements; i++) {
        urls.push(cheerio(searchElement, html)[i].attribs.href);
      }
      //return data object for each url
      return Promise.all(
        urls.map(function (url) {
          //using specific scraper implementation
          return presidentScraper('https://en.wikipedia.org' + url);
        })
      );
    })
    //use data objects
    .then(function (data) {
      console.log(data);
    })
    //catch error
    .catch(function (err) {
      console.log("Error retreiving data.");
    });
}

