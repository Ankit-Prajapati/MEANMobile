angular.module("meanMobile").controller("registerController", registerController);

function registerController($http) {
    var vm = this;

    vm.register = function () {
        var user = {
            firstname: vm.firstname,
            lastname: vm.lastname,
            username: vm.username,
            password: vm.password
        }

        if (!vm.firstname || !vm.lastname || !vm.username || !vm.password) {
            vm.error = "Please Fill all the Details.";
        } else {
            if (vm.password !== vm.confirmpassword) {
                vm.error = "Password Mismatch.";
            } else {
                $http.post("/api/users/register", user)
                    .then(function (result) {
                        console.log("Result: ", result);
                        vm.message = "Registration Successful.";
                        vm.error = "";
                    })
                    .catch(function (error) {
                        console.log("Error: ", error);
                    })
            }
        }
    }
}