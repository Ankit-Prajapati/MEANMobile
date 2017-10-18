angular.module("meanMobile", ["ngRoute", "angular-jwt"])
    .config(config)
    .run(run)

function config($httpProvider, $routeProvider) {

    $httpProvider.interceptors.push("AuthInterceptor");

    $routeProvider
        .when("/", {
            templateUrl: "/angularApp/home/_home.html",
            access: {
                restricted: false
            }
        })
        .when("/mobiles", {
            templateUrl: "/angularApp/mobilesShowcase/_mobilesShowcase.html",
            controller: "mobilesShowcaseController",
            controllerAs: "vm",
            access: {
                restricted: false
            }
        })
        .when("/mobiles/:mobileId", {
            templateUrl: "/angularApp/mobileDetails/_mobileDetails.html",
            controller: "mobileDetailsController",
            controllerAs: "vm",
            access: {
                restricted: false
            }
        })
        .when("/register", {
            templateUrl: "/angularApp/register/_register.html",
            controller: "registerController",
            controllerAs: "vm",
            access: {
                restricted: false
            }
        })
        .when("/profile", {
            templateUrl: "/angularApp/profile/_profile.html",
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: "/"
        })
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    });
}