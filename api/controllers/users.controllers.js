var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");

var register = function (req, res) {

    console.log("Registering User.");

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var userName = req.body.username;
    var password = req.body.password;

    User
        .create({
            firstname: firstName,
            lastname: lastName,
            username: userName,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        }, function (err, user) {
            if (err) {
                console.log("Error creating User: ", err);
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("User Created: ", user);
                res
                    .status(201)
                    .json(user)
            }
        })
};

var login = function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    User
        .findOne({
            username: username
        })
        .exec(function (err, user) {
            if (err) {
                console.log("Error finding User: ", err)
                res
                    .status(400)
                    .json(err)
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    console.log("User Found: ", user);
                    res
                        .status(200)
                        .json(user)
                } else {
                    res
                        .status(400)
                        .json({ "message": "Unauthorized" })
}
            }
        })
};

module.exports = {
    register: register,
    login: login
};