angular.module("meanMobile").controller("mobilesShowcaseController", mobilesShowcaseController);

function mobilesShowcaseController(apiFactory) {
    var vm = this;
    vm.title = "Smartphones";

    apiFactory.mobilesList()
        .then(function (response) {
            vm.mobiles = response;
        })
}