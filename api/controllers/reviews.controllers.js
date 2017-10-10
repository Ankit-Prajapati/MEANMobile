//Loading Mongoose.
var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");

//To get all the Reviews of a Mobile.
var reviewsGetAll = function (req, res) {
    var mobileId = req.params.mobileId;

    Mobile
        .findById(mobileId)
        //Tells to just return the "Review" instead of returning all the Data of the Mobile. Useful when data is Huge.
        .select("reviews")
        .exec(function (err, mobile) {
            if (err) {
                console.log("Error finding Mobile.");
                res
                    .status(500)
                    .json(err)
            } else if (!mobile) {
                console.log("Mobile Id not found in Database.", mobileId);
                res
                    .status(200)
                    .json({ "message": "Mobile Id not found in Database: " + mobileId })
            } else {
                res
                    .status(404)
                    .json(mobile.reviews)
            }
        });
};

//To get a Specific Review of a Mobile.
var reviewsGetOne = function (req, res) {
    var mobileId = req.params.mobileId;
    var reviewId = req.params.reviewId;

    Mobile
        .findById(mobileId)
        //Tells to just return the "Review" instead of returning all the Data of the Mobile. Useful when data is Huge.
        .select("reviews")
        .exec(function (err, mobile) {

            if (err) {
                console.log("Error finding Mobile.");
                res
                    .status(500)
                    .json(err)
            } else if (!mobile) {
                console.log("Mobile Id not found in Database.", mobileId);
                res
                    .status(200)
                    .json({ "message": "Mobile Id not found in Database: " + mobileId })
            } else {
                //To extract Review based on ReviewId.
                var review = mobile.reviews.id(reviewId);
                if (review) {
                    res
                        .status(200)
                        .json(review)
                } else {
                    res
                        .status(404)
                        .json({ "message": "Review Id not found in DB: " + reviewId })
                }
            }
        });
};

//Function to Add Review for a Mobile.
var _addReview = function (req, res, mobile) {
    mobile.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });

    mobile.save(function (err, mobileUpdated) {
        if (err) {
            res
                .status(500)
                .json(err)
        } else {
            res
                .status(201)
                //To get the last added/inserted/pushed Review for the Mobile.
                .json(mobileUpdated.reviews[mobileUpdated.reviews.length - 1])
        }
    });
}

//To Add or Insert a Review for a Mobile.
var reviewsAddOne = function (req, res) {
    var mobileId = req.params.mobileId;

    Mobile
        .findById(mobileId)
        //Tells to just return the "Review" instead of returning all the Data of the Mobile. Useful when data is Huge.
        .select("reviews")
        .exec(function (err, mobile) {
            if (err) {
                console.log("Error finding Mobile.");
                res
                    .status(500)
                    .json(err)
            } else if (!mobile) {
                console.log("Mobile Id not found in Database.", mobileId);
                res
                    .status(404)
                    .json({ "message": "Mobile Id not found in Database: " + mobileId })
            }

            if (mobile) {
                _addReview(req, res, mobile);
            } else {
                res
                    .status(404)
                    .json(err)
            }
        });
};


var reviewsUpdateOne = function (req, res) {
    var mobileId = req.params.mobileId;
    var reviewId = req.params.reviewId;

    Mobile
        .findById(mobileId)
        .select('reviews')
        .exec(function (err, mobile) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };

            if (err) {
                console.log("Error finding Mobile.");
                response.status = 500;
                response.message = err;
            } else if (!mobile) {
                console.log("Mobile Id not found in database: ", mobileId);
                response.status = 404;
                response.message = {
                    "message": "Mobile Id not found: " + mobileId
                };
            } else {

                //Get the Review.
                thisReview = mobile.reviews.id(reviewId);

                //If the review doesn't exist Mongoose returns null.
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review Id not found: " + reviewId
                    };
                }
            }

            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisReview.name = req.body.name;
                thisReview.rating = parseInt(req.body.rating, 10);
                thisReview.review = req.body.review;
                mobile.save(function (err, mobileUpdated) {
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
        });
};


var reviewsDeleteOne = function (req, res) {
    var mobileId = req.params.mobileId;
    var reviewId = req.params.reviewId;

    Mobile
        .findById(mobileId)
        .select('reviews')
        .exec(function (err, mobile) {
            var thisReview;
            var response = {
                status: 200,
                message: {}
            };

            if (err) {
                console.log("Error finding Mobile.");
                response.status = 500;
                response.message = err;
            } else if (!mobile) {
                console.log("Mobile Id not found in database: ", mobileId);
                response.status = 404;
                response.message = {
                    "message": "Mobile Id not found: " + mobileId
                };
            } else {

                //Get the Review.
                thisReview = mobile.reviews.id(reviewId);

                //If the Review doesn't exist Mongoose returns null.
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review Id not found: " + reviewId
                    };
                }
            }

            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {

                //Removing the Review.
                mobile.reviews.id(reviewId).remove();

                //Saving the Mobile.
                mobile.save(function (err, mobileUpdated) {
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
        });
};

module.exports = {
    reviewsGetAll: reviewsGetAll,
    reviewsGetOne: reviewsGetOne,
    reviewsAddOne: reviewsAddOne,
    reviewsUpdateOne: reviewsUpdateOne,
    reviewsDeleteOne: reviewsDeleteOne
};

//To update the Reviews with ReviewId in MongoDB
// db.mobiles.update(
//     {},
//     {
//         $set: {
//             "reviews.0._id": ObjectId()
//         }
//     },
//     { multi: true }
// )