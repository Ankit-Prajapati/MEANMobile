var mongoose = require("mongoose");
var connectionString = "mongodb://localhost:27017/meanMobileDB";

mongoose.connect(connectionString);

mongoose.connection.on("connected", function () {
    console.log("Mongoose Connected to: " + connectionString);
});

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose DisConnected");
});

mongoose.connection.on("error", function (err) {
    console.log("Mongoose Connected Error: " + err);
});

//Fires when you press "CTRL+C" in the Command Line.
process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose Disconnected through App Termination (SIGINT).");
        process.exit(0);
    });
});

//Heroku Platform.
process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose Disconnected through App Termination (SIGTERM).");
        process.exit(0);
    });
});

//Nodemon.
process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose Disconnected through App Termination (SIGUSR2).");
        process.kill(process.pid, "SIGUSR2");
    });
});

//Bring all the Schemas and Models.
require("../data/mobiles.model");
require("../data/users.model");