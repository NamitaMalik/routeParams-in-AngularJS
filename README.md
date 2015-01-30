# Routing-in-AngularJS

Sometimes we encounter a situation where we need parameters of a URL. This can be achieved basically in 2 ways:

1. Using **$location** service

We know that **$location** is a service in **AngularJS** which exposes the current URL in the address bar so that it can be observed or manipulated. Since **$location** exposes the URL therefore it is possible to extract the required **parameters** using **$location** service.
We can use **path()** method of $location service for this purpose. When path() function is called without passing any parameter to it, it returns path of current url.

Let's have a look at the following piece of code :

```JavaScript
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
module.controller("RoutingController", function($scope,$location) {
    //using $location service
    var url =$location.path().split('/');
    $scope.firstParameter = url[2];
    $scope.secondParameter = url[3];
});
```

In the above code, we have extracted the url using ```$location.path()```. We have then split this path on the basis of separator '/'. We know that ```split()``` method returns an array of strings split using the separator ('/' in this case) and this array has been stored in a variable named as ```url```.
We have then simply stored the parameters of url in ```$scope.firstParameter``` and ```$scope.secondParameter``` variables.

But, this is a bad practice, since we have hardcoded the index in order to get the parameters.

And also when we have better solution to extract parameters so this way doesn't makes sense at all.

Now, let's see that better solution:

2. Using **$routeParams**







$route is a service in AngularJS which is used for linking URLs to controllers and views.

It watches $location.url() and tries to map the path to an existing route definition.
