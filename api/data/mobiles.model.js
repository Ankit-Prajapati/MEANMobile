var mongoose = require("mongoose");

var mobileSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: "USD"
    },
    price: {
        type: Number,
        "default": 0
    },
    featuredImage: String,
    images: [String],
    specifications: {

    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0 //May give Error as it is Keyword in JS. Hence in Double Quotes.
    },
    location: {

    },
    reviews: {

    },
    features: [String]
});

//(ModelName, SchemaName, CollectionName)
mongoose.model("Mobile", mobileSchema, "mobiles");