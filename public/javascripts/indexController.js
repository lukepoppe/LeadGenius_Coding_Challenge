////console.log("indexController.js Loaded");
var myApp = angular.module('myApp',[]);

myApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl: "/views/main.html"
        }).
        when('/headBarTwo',{
            templateUrl: "/views/list.html"
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

myApp.controller('AngularJSCtrl', function($scope, dataService) {
    //$scope.eventList = dataService.getData();
    dataService.getData().then(function(data){
       $scope.eventList = data.data;
    });
    console.log($scope.eventList);
    console.log("dataservice");

});


////then reference with controller