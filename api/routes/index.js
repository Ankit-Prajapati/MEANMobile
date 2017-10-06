var express = require("express");
var router = express.Router();

var mobilesController = require("../controllers/mobiles.controllers");

router
    .route("/mobiles")
    .get(mobilesController.mobilesGetAll);

router
    .route("/mobiles/:mobileId")
    .get(mobilesController.mobilesGetOne);

router
    .route("/mobiles/add")
    .post(mobilesController.mobilesAddOne);

module.exports = router;