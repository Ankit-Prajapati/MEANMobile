var express = require("express");
var router = express.Router();

var mobilesController = require("../controllers/mobiles.controllers");
var reviewsController = require("../controllers/reviews.controllers");

router
    .route("/mobiles")
    .get(mobilesController.mobilesGetAll)
    .post(mobilesController.mobilesAddOne);

router
    .route("/mobiles/:mobileId")
    .get(mobilesController.mobilesGetOne)
    .put(mobilesController.mobilesUpdateOne)
    .delete(mobilesController.mobilesDeleteOne);


//Review Routes
router
    .route("/mobiles/:mobileId/reviews")
    .get(reviewsController.reviewsGetAll)
    .post(reviewsController.reviewsAddOne);

router
    .route("/mobiles/:mobileId/reviews/:reviewId")
    .get(reviewsController.reviewsGetOne)
    .put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);

module.exports = router;