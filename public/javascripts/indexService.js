//console.log("indexService.js Loaded");
myApp.service('dataService', function($http) {
    //delete $http.defaults.headers.common['X-Requested-With'];
        this.getData = function() {
            $http.get('http://localhost:8090/scrape').
                success(function(data, status, headers, config) {
                    return data;

            }).
                error(function(data, status, headers, config) {
                console.log("JSON INIT FAIL");
            });
            }
});



