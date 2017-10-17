var express = require("express");
var router = express.Router();

var mobilesController = require("../controllers/mobiles.controllers");
var reviewsController = require("../controllers/reviews.controllers");
var usersController = require("../controllers/users.controllers");

router
    .route("/mobiles")
    .get(usersController.authenticate, mobilesController.mobilesGetAll)
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


//Authentication Routes
router
    .route("/users/register")
    .post(usersController.register)

router
    .route("/users/login")
    .post(usersController.login)

module.exports = router;