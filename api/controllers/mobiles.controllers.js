//Loading the JSON File.
var mobilesData = require("../data/mobiles.json");

//To get all the Mobiles.
var mobilesGetAll = function (req, res) {
    console.log("Getting All Mobiles.");

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    var returnData = mobilesData.slice(offset, offset + count);

    res
        .status(200)
        .json(returnData);
};

//To get One Mobile by MobileId.
var mobilesGetOne = function (req, res) {
    console.log("Getting One Mobile.");
    var mobileId = req.params.mobileId;
    var thisMobile = mobilesData[mobileId];
    res
        .status(200)
        .json(thisMobile);
};

//To Add one Mobile.
var mobilesAddOne = function (req, res) {
    console.log("Adding One Mobile.");
    console.log(req.body);

    //var mobileId = req.params.mobileId;
    //var thisMobile = mobilesData[mobileId];
    res
        .status(200)
        .json(req.body);
};


module.exports = {
    mobilesGetAll: mobilesGetAll,
    mobilesGetOne: mobilesGetOne,
    mobilesAddOne: mobilesAddOne
};