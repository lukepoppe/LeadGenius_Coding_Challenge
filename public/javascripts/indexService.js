//console.log("indexService.js Loaded");
myApp.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function() {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'GET',
            url: '/scrape',
            params: 'limit=10, sort_by=created:desc',
            //headers: {'Access-Control-Allow-Origin': 'http://events.stanford.edu/2014/October/1/'},
            crossDomain: true
        });
    }
});


//response.addHeader("Access-Control-Allow-Origin", "http://events.stanford.edu/2014/October/1/");