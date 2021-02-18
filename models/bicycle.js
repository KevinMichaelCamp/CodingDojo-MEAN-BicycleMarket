var mongoose = require('mongoose');
var User = require('../models/user');

var BicycleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be equal to or greater than $0"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    imgurl: {
        type: String,
        required: [true, "Image url is required"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Owner is required"]
    }
}, {
    timestamps: true
})

var Bicycle = mongoose.model('Bicycle', BicycleSchema);
module.exports = Bicycle;