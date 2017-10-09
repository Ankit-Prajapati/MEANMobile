//Loading the MongoDB Connection File.
//var dbConnection = require("../data/dbConnection");
//ObjectId Helper.
//var ObjectId = require("mongodb").ObjectId;
//Loading the JSON File.
//var mobilesData = require("../data/mobiles.json");

//Loading Mongoose.
var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    if (isNaN(lng) || isNaN(lat)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring, lng and lat must both be numbers"
            });
        return;
    }

    //GeoJSON Object
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 2000, //Metres.
        num: 5 //Number of Records to Return.
    };

    Mobile
        .geoNear(point, geoOptions, function (err, results, stats) {
            console.log("Geo Results: ", results);
            console.log("Geo Stats: ", stats);
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                res
                    .status(200)
                    .json(results);
            }
        });
};

//To get all the Mobiles.
var mobilesGetAll = function (req, res) {
    console.log("Getting All Mobiles.");

    //MongoDB
    //var db = dbConnection.getConnection();
    //var collectionMobile = db.collection("mobiles");
    // collectionMobile
    //     .find()
    //     .skip(offset)
    //     .limit(count)
    //     .toArray(function (err, docsMobile) {
    //         console.log("Mobiles Found: ", docsMobile);
    //         res
    //             .status(200)
    //             .json(docsMobile);
    //     });

    var offset = 0;
    var count = 15;
    var maxCount = 20;

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400) //Bad Request.
            .json({
                "message": "Offset and Count in Query String must be Numbers."
            })
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({ "message": "Count limit of " + maxCount + " exceeded." });
        return;
    }

    //Mongoose
    Mobile
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, mobiles) {
            if (err) {
                console.log("Error finding Mobiles.");
                res
                    .status(500)
                    .json(err)
            } else {
                console.log("Mobiles Found: ", mobiles.length);
                res
                    .json(mobiles);
            }
        })

};

//To get One Mobile by MobileId.
var mobilesGetOne = function (req, res) {
    console.log("Getting One Mobile.");

    //MongoDB
    // var db = dbConnection.getConnection();
    // var collectionMobile = db.collection("mobiles");
    //collectionMobile
    //     .findOne({
    //         _id: ObjectId(mobileId)
    //     }, function (err, docMobile) {
    //         res
    //             .status(200)
    //             .json(docMobile);
    //     })

    var mobileId = req.params.mobileId;

    //Mongoose
    Mobile
        .findById(mobileId)
        .exec(function (err, mobile) {
            console.log("Error finding Mobile.");
            if (err) {
                res
                    .status(500)
                    .json(err)
            } else if (!mobile) {
                res
                    .status(404)
                    .json({ "message": "Mobile Id not found." })

            } else {
                res
                    .status(200)
                    .json(mobile)
            }
        });
};

var _splitArray = function (input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";")
    } else {
        output = [];
    }
    return output;
}

//To Add one Mobile.
var mobilesAddOne = function (req, res) {
    console.log("Adding One Mobile.");

    Mobile
        .create({
            brand: req.body.brand,
            name: req.body.name,
            currency: req.body.currency,
            price: req.body.price,
            featuredImage: req.body.featuredImage,
            images: _splitArray(req.body.images),
            stars: parseInt(req.body.stars, 10),
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function (err, mobile) {
            if (err) {
                console.log("Error creating Mobile.");
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("Mobile created: ", mobile);
                res
                    .status(201)
                    .json(mobile)
            }
        })
};

//To Update One Mobile
var mobilesUpdateOne = function (req, res) {
    var mobileId = req.params.mobileId;
    Mobile
        .findById(mobileId)
        //To exclude path from JSON
        .select("-reviews")
        .exec(function (err, mobile) {

            if (err) {
                console.log("Error finding Mobile.", mobile);
                res
                    .status(500)
                    .json(err)
            } else if (!mobile) {
                res
                    .status(404)
                    .json({ "message": "Mobile Id not found." })

            }

            if (res.statusCode === 200) {
                mobile.brand = req.body.brand;
                mobile.name = req.body.name;
                mobile.currency = req.body.currency;
                mobile.price = req.body.price;
                mobile.featuredImage = req.body.featuredImage;
                mobile.images = _splitArray(req.body.images);
                mobile.stars = parseInt(req.body.stars, 10);
                mobile.location = {
                    address: req.body.address,
                    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                }

                mobile.save(function (er, mobileUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
            else {
                res
                    .status(200)
                    .json(mobile);
            }
        });
};

//To Update One Delete
var mobilesDeleteOne = function (req, res) {
    var mobileId = req.params.mobileId;

    Mobile
        .findByIdAndRemove(mobileId)
        .exec(function (err, mobileDeleted) {
            if (err) {
                res
                    .status(404)
                    .json(err)
            } else {
                console.log("Mobile Deleted Id: ", mobileId);
                res
                    .status(204)
                    .json(err)
            }
        });
}

module.exports = {
    mobilesGetAll: mobilesGetAll,
    mobilesGetOne: mobilesGetOne,
    mobilesAddOne: mobilesAddOne,
    mobilesUpdateOne: mobilesUpdateOne,
    mobilesDeleteOne: mobilesDeleteOne
};

//To import Mobile JSON File to MongoDB
//mongoimport --db meanMobileDB --collection mobiles --jsonArray api/data/mobiles.json