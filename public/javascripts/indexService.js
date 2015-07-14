//console.log("indexService.js Loaded");
myApp.service('dataService', function($http) {
    //delete $http.defaults.headers.common['X-Requested-With'];

        this.getData = function() {
            return $http.get('http://localhost:8090/scrape')
            }

});



///keep data on service

