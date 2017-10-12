// //Directive Demo
// angular.module("meanMobile").directive("mobileRating", mobileRating);
// //<mobile-rating></mobile-rating>


// function mobileRating() {
//     return {
//         restrict: "E", //E:Element; A:Attribute; C:Comment
//         template: "<span ng-repeat='star in vm.stars track by $index' <i class='fa fa-star' aria-hidden='true'></i>{{ star }}</span>",
//         bindToController: true,
//         controller: "mobileDetailsController",
//         controllerAs: "vm",
//         scope: {
//             stars: "@"
//         }
//     }
// }


//Compopnent Demo: Also used inn Angular 2.
angular.module("meanMobile").component("mobileRating", {
    bindings: {
        stars: "="
    },
    template: "<span ng-repeat='star in vm.stars track by $index' <i class='fa fa-star' aria-hidden='true'></i>{{ star }}</span>",
    controller: "mobileDetailsController",
    controllerAs: "vm",
});