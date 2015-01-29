/**
 * Created by namitamalik on 29/1/15.
 */
var module = angular.module("myApp", ['ngRoute']);

module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/route1/:param/:text', {
                templateUrl: 'route1.html',
                controller: 'RouteController'
            }).
            when('/route2/:param/:text', {
                templateUrl: 'route2.html',
                controller: 'RouteController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

module.controller("RouteController", function($scope, $routeParams) {
    $scope.param = $routeParams.param;
    $scope.nextParam = $routeParams.text;
    console.log($scope.param);
    console.log($scope.nextParam);
});