////console.log("testScript.js Loading");
////$( document ).ready(function() {
////   console.log(eventTitle);
////});
//
//
//
//$('.event-listing').each(function () {
//    var json = {title: "", eventDayOfWeek:"", eventDate:"", eventTime:""};
//    var eventDayOfWeek = $(this).parent().find('li.date-indicator').text();
//    var title = $(this).find('.event-title').text();
//    if (title != "") {
//        json.title = title;
//        console.log(title);
//    }
//    var aMpm = $(this).find('.list-time').text();
//    var eventTime = aMpm;
//
//    var eventInfoA = $(this).find('time').attr('datetime');
//    if (eventInfoA != "") {
//
//        eventInfoA = eventInfoA.replace("T", " ");
//        //eventInfoA = eventInfoA.replace(":00-", "- ");
//        console.log(eventInfoA);
//        var eventInfoMonth = eventInfoA.slice(5,7);
//        var eventInfoDay = eventInfoA.slice(8,10);
//        var eventInfoYear = eventInfoA.slice(0,4);
//        //var eventTime = eventInfoA.slice(-5);
//        var myDate = eventInfoMonth + "-" + eventInfoDay + "-" + eventInfoYear;
//        var eventInfoMonth1= monthsNumberToNames[eventInfoMonth];
//        json.eventDate = myDate + " @ " + eventTime;
//        json.eventTime = eventInfoDay;
//        json.eventDayOfWeek = eventInfoMonth1;
//        eventList.push(json);
//    }
//});