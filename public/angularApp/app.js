angular.module("meanMobile", ["ngRoute"])
    .config(config)

function config($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "/angularApp/mobilesShowcase/_mobilesShowcase.html",
            controller: "mobilesShowcaseController",
            controllerAs: "vm"
        })
        .when("/mobiles/:mobileId", {
            templateUrl: "/angularApp/mobileDetails/_mobileDetails.html",
            controller: "mobileDetailsController",
            controllerAs: "vm"
        })
    // .when("/mobiles/:mobileId/reviews", {
    //     templateUrl: "",
    //     controller: "",
    //     controllerAs: ""
    // })
    // .when("/mobiles/:mobileId/reviews/:reviewId", {
    //     templateUrl: "",
    //     controller: "",
    //     controllerAs: ""
    // })
    // .when("/404", {
    //     templateUrl: "",
    //     controller: "",
    //     controllerAs: ""
    // })
    // .otherwise({
    //     redirectTo: "/404"
    // })
}