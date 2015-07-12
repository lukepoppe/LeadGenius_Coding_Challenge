////console.log("indexController.js Loaded");
var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl: "/views/list.html"
        }).
        when('/list',{
            templateUrl: "/views/list.html"
        }).
        when('/grid',{
            templateUrl: "/views/grid.html"
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