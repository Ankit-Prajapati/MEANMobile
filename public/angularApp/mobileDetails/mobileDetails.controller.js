angular.module("meanMobile").controller("mobileDetailsController", mobileDetailsController);

function mobileDetailsController($routeParams, apiFactory) {
    var vm = this;
    vm.mobileId = $routeParams.mobileId;

    apiFactory.mobileDetails(vm.mobileId)
        .then(function (response) {
            vm.mobile = response;
            vm.stars = _getStarRating(response.stars);
        })

    function _getStarRating(stars) {
        return new Array(stars);
    }
}