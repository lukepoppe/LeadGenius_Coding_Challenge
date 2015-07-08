var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    url = 'http://events.stanford.edu/2014/October/1/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, date, time;
            var json = { title : "", date : "", time : ""};

            $('.postcard-text').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                date = data.children().last().children().text();
                time = data.children().last().children().children().text();

                json.title = title;
                json.date = date;
                json.time = time;
            })


        }



        fs.writeFile('eventsData.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the eventsData.json file');

        })

//app does not have a UI.
        res.send('Check console!')

    }) ;
})
app.listen('8090')
console.log('Magic happens on port 8090');
exports = module.exports = app;