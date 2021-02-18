var mongoose = require('mongoose');
var Bicycle = require('./bicycle');

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bicycles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bicycle"
    }]
}, {
    timestamps: true
})

var User = mongoose.model('User', UserSchema);
module.exports = User;