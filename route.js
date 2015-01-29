/**
 * Created by Namita Malik on 29/1/15.
 */
var module = angular.module("myApp", ['ngRoute']);

module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/route1/:param1/:param2', {
                templateUrl: 'route1.html',
                controller: 'RoutingController'
            }).
            when('/route2/:param1/:param2', {
                templateUrl: 'route2.html',
                controller: 'RoutingController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

module.controller("RoutingController", function($scope, $routeParams) {
    $scope.param1 = $routeParams.param1;
    $scope.param2 = $routeParams.param2;
});