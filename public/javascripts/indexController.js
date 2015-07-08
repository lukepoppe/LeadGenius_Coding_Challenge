////console.log("indexController.js Loaded");
var myApp = angular.module('myApp',[]);

myApp.controller('AngularJSCtrl', function($scope, dataService) {
    $scope.data = null;
    dataService.getData().then(function(dataResponse) {
        $scope.data = dataResponse;
    });
});