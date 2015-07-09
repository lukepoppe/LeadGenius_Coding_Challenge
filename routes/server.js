var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
    var eventList =[];
    url = 'http://events.stanford.edu/2014/October/1/';



        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                //var title, eventInfo;

                    $('.postcard-text').each(function(){
                        var json = { title : "", eventInfo : ""};

                        var title = $(this).find('h3').text();
                        json.title = title;
                        console.log(title);
                        //eventList.push(json);

                        var eventInfo =  $(this).find('strong').text();
                        json.eventInfo = eventInfo;
                        console.log(eventInfo);
                        eventList.push(json);
                });
            }
            fs.writeFile('eventsData.json', JSON.stringify(eventList, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the eventsData.json file');
            });

            res.set("Access-Control-Allow-Origin", '*');

            //res.send('Check console!');
            res.end(JSON.stringify(eventList));
        }) ;


});

app.listen('8090');
console.log('Magic happens on port 8090');
exports = module.exports = app;