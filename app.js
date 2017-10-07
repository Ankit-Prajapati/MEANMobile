//Require MongoDB Connection.
require("./api/data/dbConnection").openConnection();

//Express.
var express = require("express");

//Load Express in app Variable.
var app = express();

//Require path Module to access or serve Files.
var path = require("path");

//Requiring the Routes file
var routes = require("./api/routes");

//Require body-parser to deal with Posted Form Data.
var bodyParser = require("body-parser");

//Setting the Port.
app.set("port", 5000);

//Its a Middleware.
//To know the Request Method and from what URL it has been requested.
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

//Setting the "public" folder as the Default Route or folder for Serving the Static files.
app.use(express.static(path.join(__dirname, "public")));

//To deal with posted form data.
app.use(bodyParser.urlencoded({ extended: false }));

//Setting the Static Route for routes via "/api".
app.use("/api", routes);

//Listening to Port.
//Its Asynchronous and hence it has Callback Function.
var server = app.listen(app.get("port"), function () {
    //Extracting the Port Number.
    var port = server.address().port;
    console.log("Magic Happens on Port: " + port);
});