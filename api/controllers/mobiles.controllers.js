//Loading the MongoDB Connection File.
var dbConnection = require("../data/dbConnection");

//ObjectId Helper.
var ObjectId = require("mongodb").ObjectId;

//Loading the JSON File.
var mobilesData = require("../data/mobiles.json");

//To get all the Mobiles.
var mobilesGetAll = function (req, res) {
    console.log("Getting All Mobiles.");

    var db = dbConnection.getConnection();
    var collectionMobile = db.collection("mobiles");

    var offset = 0;
    var count = 15;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collectionMobile
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (err, docsMobile) {
            console.log("Mobiles Found: ", docsMobile);
            res
                .status(200)
                .json(docsMobile);
        });
};

//To get One Mobile by MobileId.
var mobilesGetOne = function (req, res) {
    console.log("Getting One Mobile.");

    var db = dbConnection.getConnection();
    var collectionMobile = db.collection("mobiles");

    var mobileId = req.params.mobileId;

    collectionMobile
        .findOne({
            _id: ObjectId(mobileId)
        }, function (err, docMobile) {
            res
                .status(200)
                .json(docMobile);
        })
};

//To Add one Mobile.
var mobilesAddOne = function (req, res) {
    console.log("Adding One Mobile.");

    var db = dbConnection.getConnection();
    var collectionMobile = db.collection("mobiles");

    var newMobile;

    if (req.body && req.body.brand && req.body.name) {

        newMobile = req.body;
        newMobile.price = parseInt(req.body.price, 10);

        collectionMobile
            .insertOne(newMobile, function (err, response) {
                console.log(response);
                console.log(response.ops);
                res
                    .status(201)
                    .json(response.ops);
            })

    } else {
        console.log("Invalid Parameters.");
        res
            .status(400)
            .json({ message: "Required data missing from body" });
    }
};


module.exports = {
    mobilesGetAll: mobilesGetAll,
    mobilesGetOne: mobilesGetOne,
    mobilesAddOne: mobilesAddOne
};