var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var moment = require('moment');
moment().format();

var monthsNumberToNames = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
};
var momentDaysOfWeek = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thur",
    5: "Fri",
    6: "Sat"

};
app.get('/scrape', function(req, res){
    var eventList =[];
    //url = 'http://events.stanford.edu/2014/October/1/';
console.log("req URL: " + req.query.url);
        request(req.query.url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
//stanford home & search
$('.postcard-text').each(function() {
    var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
    var title = $(this).find('h3').text();
    if (title != "") {
        json.title = title  ;
        console.log(title);
    }
    var eventInfoA = $(this).find('strong').text();
    if(eventInfoA != "") {
        var eventDate = eventInfoA;
        var eventDatePrev = eventDate.substring(eventDate.indexOf(" ")+1,eventDate.indexOf(", 201"));
        var eventDatePrevA = eventDatePrev.slice(-2);
        var eventInfoB ="";
        if (eventInfoA.indexOf("Sunday") != -1) {
             eventInfoB = "Sun";
        } else if (eventInfoA.indexOf("Monday") != -1) {
             eventInfoB = "Mon";
        }else if (eventInfoA.indexOf("Tuesday") != -1) {
             eventInfoB = "Tues";
        }else if (eventInfoA.indexOf("Wednesday") != -1) {
                 eventInfoB = "Wed";
        }else if (eventInfoA.indexOf("Thursday") != -1) {
             eventInfoB = "Thur";
        }else if (eventInfoA.indexOf("Friday") != -1) {
             eventInfoB = "Fri";
        }else if (eventInfoA.indexOf("Saturday") != -1) {
            eventInfoB = "Sat";
        }else if (eventInfoA.indexOf("Ongoing") != -1) {
            eventInfoB = null;
        }
        if (eventInfoB != null){
        //json.eventDayOfWeek = eventInfoB;
        json.eventDayOfWeek = eventInfoB;
        json.eventDate = eventDate ;
        json.eventTime = eventDatePrevA;
        eventList.push(json);
        }
    }
});
//meetup.com
$('.event-listing').each(function () {
    var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
    var eventDayOfWeek = $(this).parent().find('li.date-indicator').text();
    var title = $(this).find('.event-title').text();
    if (title != "") {
        json.title = title;
        console.log(title);
    }
    var aMpm = $(this).find('.list-time').text();
    var eventTime = aMpm;

    var eventInfoA = $(this).find('time').attr('datetime');
    if (eventInfoA != "") {

        eventInfoA = eventInfoA.replace("T", " ");
        //eventInfoA = eventInfoA.replace(":00-", "- ");
        console.log(eventInfoA);
        var eventInfoMonth = eventInfoA.slice(5,7);
        var eventInfoDay = eventInfoA.slice(8,10);
        var eventInfoYear = eventInfoA.slice(0,4);
        //var eventTime = eventInfoA.slice(-5);
        var myDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;
        var dayOfWeek =  moment(myDate).day();
        var findDayOfWeek = momentDaysOfWeek[dayOfWeek];

        //var eventInfoMonth1= monthsNumberToNames[eventInfoMonth];
        json.eventDate = myDate + " @ " + eventTime;
        json.eventTime = eventInfoDay;
        json.eventDayOfWeek = findDayOfWeek;
        eventList.push(json);
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
    var eventInfoAmpm1 = $(this).find('span.event-card__details').text();
    var am = " AM";
    var pm = " PM";
    var eventInfoAmpm2;
    if (eventInfoAmpm1.indexOf(am)!== -1){
        eventInfoAmpm2 = "AM";
    } else if (eventInfoAmpm1.indexOf(pm)!== -1){
        eventInfoAmpm2 = "PM";
    }


    var eventInfoA = $(this).find('.event-card__details').attr('content');
    if (eventInfoA != "") {
        eventInfoA = eventInfoA.replace("T", " ");
        eventInfoA = eventInfoA.replace(":00-", "- ");
        var eventInfoMonth = eventInfoA.slice(5,7);
        var eventInfoDay = eventInfoA.slice(8,10);
        var eventInfoYear = eventInfoA.slice(0,4);
        var eventTime = eventInfoA.slice(-12);
        //var eventTimePreview = eventTime.slice(0,5);

        json.eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear + ".  " + eventTime + eventInfoAmpm2;
        json.eventTime = eventInfoDay;
        console.log(eventInfoA);

        eventList.push(json);
        }
});
//sfmoma homepage
$('.bd').each(function () {
    var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
    var title = $(this).find('.title').text();
    if (title != "") {
        //json.title = title;
        console.log(title);
    }
    var eventInfoA = $(this).find('abbr.dtstart').attr('title');
    if (eventInfoA != undefined) {
        eventInfoA = eventInfoA.replace("T", " ");
        eventInfoA = eventInfoA.replace("00:00", " ");
        var eventInfoMonth = eventInfoA.slice(5, 7);
        var eventInfoDay = eventInfoA.slice(8, 10);
        var eventInfoYear = eventInfoA.slice(0, 4);
        var eventTime = eventInfoA.slice(-4);
        var eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;

        var eventInfoC = $(this).find('span.date').text();
        var eventInfoB ="";
        if (eventInfoC.indexOf("Sunday") != -1) {
            eventInfoB = "Sun";
        } else if (eventInfoC.indexOf("Monday") != -1) {
            eventInfoB = "Mon";
        }else if (eventInfoC.indexOf("Tuesday") != -1) {
            eventInfoB = "Tues";
        }else if (eventInfoC.indexOf("Wednesday") != -1) {
            eventInfoB = "Wed";
        }else if (eventInfoC.indexOf("Thursday") != -1) {
            eventInfoB = "Thur";
        }else if (eventInfoC.indexOf("Friday") != -1) {
            eventInfoB = "Fri";
        }else if (eventInfoC.indexOf("Saturday") != -1) {
            eventInfoB = "Sat";
        }else {
            eventInfoB = null;
        }

    }
    var eventInfoD = $(this).find('abbr.dtend').attr('title');
    if (eventInfoD != undefined) {
        eventInfoD = eventInfoD.replace("T", " ");
        eventInfoD = eventInfoD.replace("00:00", " ");
        var eventInfoMonthD = eventInfoA.slice(5, 7);
        var eventInfoDayD = eventInfoA.slice(8, 10);
        var eventInfoYearD = eventInfoA.slice(0, 4);
        var eventTimeD = eventInfoA.slice(-4);
        var eventDateD = eventInfoMonthD + "-" + eventInfoDayD + "-" + eventInfoYearD;

    }
    if (title !== "" && eventDate !== undefined && eventTime !== undefined && eventInfoB != null) {
        json.eventDate = eventDate + " to " +eventDateD + " @ " +eventTime;
        json.eventDayOfWeek = eventInfoB;
        json.title = title;
        json.eventTime = eventInfoDay;


        console.log(eventInfoA);
        eventList.push(json);
    }
    });
//sfmoma search calendar
$('.with-image ').each(function () {
        var json = {title: "", eventDate: "", eventDayOfWeek:"", eventTime:""};
        var title = $(this).find('.url').text();
        if (title != "") {
            json.title = title;
            console.log(title);
            }
    var eventInfoC = $(this).find('span.date').text();
    var eventInfoB ="";
    if (eventInfoC.indexOf("Sunday") != -1) {
        eventInfoB = "Sun";
    } else if (eventInfoC.indexOf("Monday") != -1) {
        eventInfoB = "Mon";
    }else if (eventInfoC.indexOf("Tuesday") != -1) {
        eventInfoB = "Tues";
    }else if (eventInfoC.indexOf("Wednesday") != -1) {
        eventInfoB = "Wed";
    }else if (eventInfoC.indexOf("Thursday") != -1) {
        eventInfoB = "Thur";
    }else if (eventInfoC.indexOf("Friday") != -1) {
        eventInfoB = "Fri";
    }else if (eventInfoC.indexOf("Saturday") != -1) {
        eventInfoB = "Sat";
    }else {
        eventInfoB = null;
    }
        var eventInfoA = $(this).find('abbr.dtstart').attr('title');
        if (eventInfoA != null) {
            eventInfoA = eventInfoA.replace("T", " ");
            eventInfoA = eventInfoA.replace("00:00-", " ");
            var eventInfoMonth = eventInfoA.slice(5, 7);
            var eventInfoDay = eventInfoA.slice(8, 10);
            var eventInfoYear = eventInfoA.slice(0, 4);
            var eventTime = eventInfoA.slice(-5);
                var eventInfoMonth1 = monthsNumberToNames[eventInfoMonth];

            if (title !== "" && eventInfoB !== null && eventTime !== undefined) {
                json.eventDayOfWeek = eventInfoB;
                json.eventDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear + " @ " + eventTime;
                json.eventTime = eventInfoDay;
                console.log(eventInfoA);
                eventList.push(json);
            }
         }
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