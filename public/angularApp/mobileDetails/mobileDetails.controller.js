angular.module("meanMobile").controller("mobileDetailsController", mobileDetailsController);

function mobileDetailsController($route, $routeParams, $window, apiFactory, AuthFactory, jwtHelper) {
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

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    vm.addReview = function () {

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

        var postData = {
            name: username,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            apiFactory.postReview(id, postData).then(function (response) {
                if (response.status === 200) {
                    $route.reload();
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    }
}