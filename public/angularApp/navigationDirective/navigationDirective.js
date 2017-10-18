angular.module('meanMobile').directive('mobileNavigation', mobileNavigation);

function mobileNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angularApp/navigationDirective/_navigationDirective.html'
    };
}