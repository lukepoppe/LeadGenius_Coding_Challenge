////console.log("indexController.js Loaded");
var myApp = angular.module('myApp',[]);

myApp.controller('AngularJSCtrl', function($scope, dataService) {
    //$scope.eventList = dataService.getData();
    dataService.getData().then(function(data){
       $scope.eventList = data.data;
    });
    console.log($scope.eventList);
    console.log("dataservice");

});

////then reference with controller