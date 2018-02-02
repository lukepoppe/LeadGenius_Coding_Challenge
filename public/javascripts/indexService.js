myApp.service('dataService', function($http) {
        this.getData = function(websiteUrl) {
            return $http.get('http://localhost:8090/scrape?url=' + websiteUrl)
            }

});
