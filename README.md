# Routing-in-AngularJS

Sometimes we encounter a situation where we need **parameter**s of a **URL**. This can be achieved basically in 2 ways:

1. Using **$location** **service**
2. Using **$routeParams** **service**

**Using $location service**: We know that **$location** is a **service** in **AngularJS** which exposes the current **URL** in the address bar so that it can be observed or manipulated. Since **$location** exposes the **URL** therefore it is possible to extract the required **parameters** using **$location** **service**.

We can use **path()** method of **$location** **service** for this purpose. When ```path()``` **function** is called without passing any parameter to it, it returns path of current url.

Let's have a look at the following piece of code :

```JavaScript
var module = angular.module("myApp", ['ngRoute']);
module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/route1/:param1/:param2', {
            templateUrl: 'route1.html',
            controller: 'RoutingController'
        })
        .when('/route2/:param1/:param2', {
            templateUrl: 'route2.html',
            controller: 'RoutingController'
        })
        .otherwise({
            redirectTo: '/route1/default-book/default-page'
        });
}]);
module.controller("RoutingController", function ($scope, $routeParams, $location) {
    // Using $location service
    var url = $location.path().split('/');
    $scope.firstParameter = url[2];
    $scope.secondParameter = url[3];
});
```

In the above code, we have extracted the **URL** using ```$location.path()```. We have then split this path on the basis of separator ```/```. We know that ```split()``` method returns an array of strings split using the separator (```/``` in this case) and this array has been stored in a variable named as ```url```.

We have then simply stored the **parameter**s of **URL** in ```$scope.firstParameter``` and ```$scope.secondParameter``` variables.

But, this is a bad practice and perhaps an ugly way, since we have hardcoded the index in order to get the **parameters**.

And also when we have better solution to extract **parameters** so this way doesn't makes sense at all.

Now, let's see that better solution:

**Using $routeParams service**: **$routeParams** **service** allows us to retrieve **route parameters**.

The **$routeParams** is a combination of $location's ```search()``` and ```path()```. We can get the route path using the **path()** method of the **$location** **service** whereas ```search()``` method of **$location** **service** returns an object of search part/query string of the url. The path **parameters** are extracted when the **$route** path is matched(```when('/route1/:param1/:param2', {})```).

> Note : routeParams will only work when ngRoute module is installed. It provides routing and deep linking services and directives for angular apps.

Now, let's see a working demo:

```JavaScript
var module = angular.module("myApp", ['ngRoute']);
module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/route1/:param1/:param2', {
            templateUrl: 'route1.html',
            controller: 'RoutingController'
        })
        .when('/route2/:param1/:param2', {
            templateUrl: 'route2.html',
            controller: 'RoutingController'
        })
        .otherwise({
            redirectTo: '/route1/default-book/default-page'
        });
}]);
module.controller("RoutingController", function ($scope, $routeParams, $location) {
    // Using $routeParams
    $scope.param1 = $routeParams.param1;
    $scope.param2 = $routeParams.param2;
});
```

In the above demo, we have injected **$routeParams** to our controller ```RoutingController``` and then we have simply done ```$routeParams.param1``` and ```$routeParams.param2``` to extract our first and second **parameters** respectively. **$routeParams** get updated only after a **route** change gets completed successfully.

> NOTE: If there is a parameter name collision, path params take precedence over search params. Suppose if param1 parameter is present in query string as well. e.g. /route1/default-book/default-page?param1=23&authore=namita then resultant $routeParams object will be having three properties only: {param1: "default-book", author: "namita", param2: "default-page"}. param1 is having value 'default-book' instead of 23.

I have collated both the ways in a single js(route.js) which looks like:

```JavaScript
var module = angular.module("myApp", ['ngRoute']);
module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/route1/:param1/:param2', {
            templateUrl: 'route1.html',
            controller: 'RoutingController'
        })
        .when('/route2/:param1/:param2', {
            templateUrl: 'route2.html',
            controller: 'RoutingController'
        })
        .otherwise({
            redirectTo: '/route1/default-book/default-page'
        });
}]);
module.controller("RoutingController", function ($scope, $routeParams, $location) {
    // Using $location service
    var url = $location.path().split('/');
    $scope.firstParameter = url[2];
    $scope.secondParameter = url[3];
    // Using $routeParams
    $scope.param1 = $routeParams.param1;
    $scope.param2 = $routeParams.param2;
});
```

For much clearer understanding, I have shown these **parameters** on our **HTML**. This is a small **HTML** code:

```HTML
<h1>Using $location Service</h1>
<label>First Parameter: </label> {{firstParameter}} <br/> <br/>
<label>Second Parameter: </label> {{secondParameter}} <br/> <br/>
<hr/>
<h1>Using $routeParams</h1>
<label>First Parameter: </label>{{param1}} <br/> <br/>
<label>Second Parameter</label> {{param2}}
```

You can have a look at the full working source code [here](https://github.com/NamitaMalik/routeParams-in-AngularJS).

It is important to note that there are many ways of doing one thing, it all depends on the requirements of the project. :)