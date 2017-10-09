var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0 //May give Error as it is Keyword in JS. Hence in Double Quotes.
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

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
        displaySize: String,
        resolution: String,
        os: String,
        chipset: String,
        cameraPrimary: String,
        battery: String,
        colors: String
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0 //May give Error as it is Keyword in JS. Hence in Double Quotes.
    },
    location: {
        address: String,
        //Longitude(E/W), Latitude(N/W)
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    reviews: [reviewSchema],
    features: [String]
});

//(ModelName, SchemaName, CollectionName)
mongoose.model("Mobile", mobileSchema, "mobiles");