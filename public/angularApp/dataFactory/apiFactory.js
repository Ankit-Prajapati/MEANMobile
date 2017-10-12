angular.module("meanMobile").factory("apiFactory", apiFactory);

function apiFactory($http) {
    return {
        mobilesList: mobilesList,
        mobileDetails: mobileDetails
    };

    function mobilesList() {
        return $http.get("/api/mobiles").then(success).catch(failure)
    }

    function mobileDetails(mobileId) {
        return $http.get("/api/mobiles/" + mobileId).then(success).catch(failure)
    }

    function success(response) {
        return response.data;
    }

    function failure(error) {
        return error.statusText;
    }

}