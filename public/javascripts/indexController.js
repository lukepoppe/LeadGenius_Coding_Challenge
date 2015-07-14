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
    $scope.eventList = [];
    //$scope.url = myForm.input.baseURI;
    $scope.submit = function() {
        if ($scope.url) {
            dataService.getData($scope.url).then(function(data){
                $scope.eventList = data.data;
                $scope.url ="";
            });
        }
    };
    //console.log($scope.eventList);
    //console.log("dataservice");
});

//myApp.controller('ExampleController', ['$scope', function($scope) {
//
//}]);

////then reference with controller