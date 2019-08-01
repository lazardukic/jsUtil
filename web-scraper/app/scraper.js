//imports
const requestor = require('request-promise');
const cheerio = require('cheerio');
const presidentScraper = require('./specific-scrapers/presidentScraper');

//constants
const URL_US_PRESIDENTS = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const searchElement = 'big > a';

//function call
scrapeData(URL_US_PRESIDENTS,searchElement);

//========================
//  scrape data function
//========================
function scrapeData (url,searchElement) {
  requestor(url)
  .then(function(html){
    const urls = [];
    let numberOfSearchElements = cheerio(searchElement,html).length;
    for (let i = 0; i < numberOfSearchElements; i++) {
      //get urls for additional scraping
      urls.push(cheerio(searchElement, html)[i].attribs.href);
    }
    return Promise.all(
      urls.map(function(url) {
        //using specific scraper implementation
        return presidentScraper('https://en.wikipedia.org' + url);
      })
    );
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err){
    console.log("Error retreiving data.");
  });
}

