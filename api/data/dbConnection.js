var MongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb://localhost:27017/meanMobileDB";
var _connection = null;

var openConnection = function () {
    //Set the Connection
    MongoClient.connect(connectionString, function (err, db) {
        if (err) {
            console.log("Error Connecting MongoDB: ",  err);
            return;
        } else {
            _connection = db;
            console.log("Mongo Connection Open: ", db);
        }
    });
};

var getConnection = function () {
    return _connection;
};

module.exports = {
    openConnection: openConnection,
    getConnection: getConnection
}