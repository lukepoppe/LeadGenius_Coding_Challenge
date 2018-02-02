var cheerio = require('cheerio');


let parseStandford = function(title,rawDateAndTime) {
  var json = {title: "", eventDayOfWeek:"", eventFullDate:"", dayOfMonth:""};
  if (title != "") {
      json.title = title;
  }

  if(rawDateAndTime != "") {
    var parseDateAndTime = rawDateAndTime.substring(rawDateAndTime.indexOf(" ")+1,rawDateAndTime.indexOf(", 201"));
    var dayOfMonth = parseDateAndTime.slice(-2);

    var dayOfWeek = findDay(rawDateAndTime);
    if (dayOfWeek != null) {
      json.eventDayOfWeek = dayOfWeek;
      json.eventFullDate = parseDateAndTime;
      json.dayOfMonth = dayOfMonth;
      return json
    }
  }

  function findDay(rawDateAndTime){
    let day = ""
    if (rawDateAndTime.indexOf("Sunday") != -1) {
         day = "Sun";
    } else if (rawDateAndTime.indexOf("Monday") != -1) {
         day = "Mon";
    }else if (rawDateAndTime.indexOf("Tuesday") != -1) {
         day = "Tues";
    }else if (rawDateAndTime.indexOf("Wednesday") != -1) {
             day = "Wed";
    }else if (rawDateAndTime.indexOf("Thursday") != -1) {
         day = "Thur";
    }else if (rawDateAndTime.indexOf("Friday") != -1) {
         day = "Fri";
    }else if (rawDateAndTime.indexOf("Saturday") != -1) {
        day = "Sat";
    }else if (rawDateAndTime.indexOf("Ongoing") != -1) {
        day = "Starting";
    }
    return day
  }

}

module.exports = parseStandford
