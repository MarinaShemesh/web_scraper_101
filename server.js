const express = require('express');
const fs = require('fs'); //gives access to our computer's file system
const request = require('request');
const cheerio = require('cheerio');//JQuery for node.js. makes iteasy to select, edit and view dom elements.
const app = express();

app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error,response,html){
  
  if(!error) {

    // utilize the cheerio library on the returned html which will 
    //essentially give us jQuery functionality
     var $ = cheerio.load(html);
     
     //define the variables we want to capture

     var title, release, rating;
     var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        
        var data = $(this);

        title = data.children().first().text();

        json.title = title;

      })

        $('.subtext').filter(function(){
        
        var data = $(this);

        release = data.children().last().text();

        json.release = release;

      })

      $('.subtext').filter(function(){
        var data = $(this);

        rating = data.text();
        json.rating = rating;
      })

     }

     fs.writeFile('output.json', JSON.stringify(json, null,4), function(err){
      console.log('File successfully written! Check the output.json file');
     })

     res.send('Look at your console!')

  })//end of scrape request

})//end of get request

app.listen('8081')

console.log('Listening port 8081');

exports = module.exports = app;

//from a Scotch tut