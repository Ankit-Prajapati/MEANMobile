angular.module("meanMobile", ["ngRoute"]).config(config);

function config($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "",
            controller: "",
            controllerAs: ""
        })
        .when("/mobiles/:mobileId", {
            templateUrl: "",
            controller: "",
            controllerAs: ""
        })
        .when("/mobiles/:mobileId/reviews", {
            templateUrl: "",
            controller: "",
            controllerAs: ""
        })
        .when("/mobiles/:mobileId/reviews/:reviewId", {
            templateUrl: "",
            controller: "",
            controllerAs: ""
        })
        .when("/404", {
            templateUrl: "",
            controller: "",
            controllerAs: ""
        })
        .otherwise({
            redirectTo: "/404"
        })
}