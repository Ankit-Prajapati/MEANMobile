var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

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

                    var token = jwt.sign({ username: user.username }, "s3cr3t", { expiresIn: 3600 });

                    res
                        .status(200)
                        .json({ success: true, token: token })
                } else {
                    res
                        .status(400)
                        .json({ "message": "Unauthorized" })
                }
            }
        })
};

var authenticate = function (req, res, next) {
    var headerExist = req.headers.authorization;

    if (headerExist) {
        var token = req.headers.authorization.split(" ")[1]; // Authorization Bearer XXX

        jwt.verify(token, "s3cr3t", function (error, decoded) {
            if (error) {
                console.log(error);
                res
                    .status(401)
                    .json("Unauthorized.")
            } else {
                req.user = decoded.username;
                next();
            }
        })
    } else {
        res
            .status(403)
            .json("No token provided.")
    }
};

module.exports = {
    register: register,
    login: login,
    authenticate: authenticate
};