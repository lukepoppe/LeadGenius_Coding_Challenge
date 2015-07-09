////console.log("indexController.js Loaded");
var myApp = angular.module('myApp',[]);

myApp.controller('AngularJSCtrl', function($scope, dataService) {
    $scope.data = dataService.getData();

});