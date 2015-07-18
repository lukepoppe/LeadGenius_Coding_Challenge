var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
    var eventList =[];
    //url = 'http://events.stanford.edu/2014/October/1/';


console.log("req URL: " + req.query.url);
        request(req.query.url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                //var title, eventInfo;

//stanford home & search
                    $('.postcard-text').each(function() {
                        var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
                        var title = $(this).find('h3').text();
                        if (title != "") {
                            json.title = title;
                            console.log(title);
                        }
                        var eventInfoA = $(this).find('strong').text();
                        if(eventInfoA != ""){
                            var eventDayOfWeek = eventInfoA.slice(0,3);
                            var eventDate = eventInfoA;
                            var eventTime = eventInfoA.slice(-9);
                            console.log("substring- " + eventTime.substring(2, 3));

                            if(eventTime.substring(2, 3) != ":"){
                                json.eventTime = "";
                                json.eventDayOfWeek = "Ongoing";
                                json.eventDate = eventInfoA;
                                 eventList.push(json);

                                        } else {
                                            console.log(eventInfoA);
                                            json.eventDayOfWeek = eventDayOfWeek;
                                            json.eventDate = eventDate;
                                            json.eventTime = eventTime;
                                            eventList.push(json);
                                            }
                            }
                        });
//eventbrite search
                    $('.js-search-result-click-action').each(function () {
                        var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
                        var title = $(this).find('.event-card__header').text();
                        if (title != "") {
                            json.title = title;
                            console.log(title);
                        }
                        var eventDayOfWeekA = $(this).find('.event-card__details').text();
                        if (title != "") {
                            json.eventDayOfWeek = eventDayOfWeekA.slice(25,28);

                        }
                        var eventInfoA = $(this).find('.event-card__details').attr('content');
                        if (eventInfoA != "") {
                            eventInfoA = eventInfoA.replace("T", " ");
                            eventInfoA = eventInfoA.replace(":00-", "- ");
                            var eventInfoMonth = eventInfoA.slice(5,7);
                            var eventInfoDay = eventInfoA.slice(8,10);
                            var eventInfoYear = eventInfoA.slice(0,4);
                            var eventTime = eventInfoA.slice(-11);

                            json.eventDate = eventInfoMonth + "-" + eventInfoDay+ "-" + eventInfoYear;
                            json.eventTime = eventTime;
                            console.log(eventInfoA);

                            eventList.push(json);
                            }
                        });
//sfmoma homepage and search calendar
                    $('.mod').each(function () {
                        var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
                        var title = $(this).find('.title').text();
                        if (title != "") {
                            json.title = title;
                            console.log(title);
                        }
                        var eventInfoA = $(this).find('abbr.dtstart').attr('title');
                        if (eventInfoA != null) {
                            eventInfoA = eventInfoA.replace("T", " ");
                            eventInfoA = eventInfoA.replace("00:00", " ");
                            var eventInfoMonth = eventInfoA.slice(5, 7);
                            var eventInfoDay = eventInfoA.slice(8, 10);
                            var eventInfoYear = eventInfoA.slice(0, 4);
                            var eventTime =  eventInfoA.slice(-4);

                            json.eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;
                            json.eventTime = eventTime;


                            console.log(eventInfoA);

                            eventList.push(json);
                         }
                        });

                    $('.with-image ').each(function () {
                            var json = {title: "", eventInfo: ""};
                            var title = $(this).find('.url').text();
                            if (title != "") {
                                json.title = title;
                                console.log(title);
                                }
                            var eventInfoA = $(this).find('abbr.dtstart').attr('title');
                            if (eventInfoA != null) {
                                eventInfoA = eventInfoA.replace("T", " ");
                                eventInfoA = eventInfoA.replace(":00-", "- ");
                                var eventInfoMonth = eventInfoA.slice(5, 7);
                                var eventInfoDay = eventInfoA.slice(8, 10);
                                var eventInfoYear = eventInfoA.slice(0, 4);
                                var eventTime = eventInfoA.slice(-11);

                                json.eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;
                                json.eventTime = eventTime;


                                console.log(eventInfoA);

                                eventList.push(json);
                             }
                        });
//meetup.com
                        $('.event-listing').each(function () {
                            var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
                            var eventDayOfWeek = $(this).parent('li').find('.date-indicator').text();
                            var title = $(this).find('.event-title').text();
                                if (title != "") {
                                    json.title = title;
                                    console.log(title);
                                }
                            var amPm = $(this).find('span.period').text();

                            var eventInfoA = $(this).find('time').attr('datetime');
                                if (eventInfoA != "") {
                                    eventInfoA = eventInfoA.replace("T", " ");
                                    //eventInfoA = eventInfoA.replace(":00-", "- ");
                                    console.log(eventInfoA);
                                        var eventInfoMonth = eventInfoA.slice(5,7);
                                        var eventInfoDay = eventInfoA.slice(8,10);
                                        var eventInfoYear = eventInfoA.slice(0,4);
                                        var eventTime = eventInfoA.slice(-5);
                                    json.eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;
                                    json.eventTime = eventTime + amPm + eventDayOfWeek;
                                    eventList.push(json);
                            }

                            //
                            //$('.g-cell').each(function () {
                            //    var json = {title: "", eventInfo: ""};
                            //    var title = $(this).find('h4').text();
                            //    if (title != "") {
                            //        json.title = title;
                            //        console.log(title);
                            //    }
                            //    var eventInfo = $(this).find('.poster-card__date').first().text();
                            //    if (eventInfo != "") {
                            //        json.eventInfo = eventInfo;
                            //        console.log("eventinfo: " + eventInfo);
                            //        eventList.push(json);
                            //    }
                            //});

                        });

            }
            fs.writeFile('eventsData.json', JSON.stringify(eventList, null, 4), function(err){
                if (err) console.log(err);
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