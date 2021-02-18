var Bicycle = require('../models/bicycle');
var User = require('../models/user');

module.exports = {
    index: function (req, res) {
        Bicycle.find().sort({
            title: 1
        }).then(bikes => {
            res.json({
                success: true,
                msg: "Found bikes",
                bikes: bikes
            });
        }).catch(err => res.json({
            success: false,
            msg: err
        }));
    },

    show: function (req, res) {
        Bicycle.findOne({
            _id: req.params.id
        }).then(bike => {
            res.json({
                success: true,
                msg: "Found bike",
                bike: bike
            });
        }).catch(err => res.json({
            success: false,
            msg: err
        }));
    },

    getBikesByUser: function (req, res) {
        Bicycle.find({
            owner: req.user._id
        }).then(bikes => {
            res.json({
                success: true,
                msg: "Found users bikes",
                bikes: bikes
            });
        }).catch(err => {
            res.json({
                success: false,
                msg: err
            })
        })
    },

    add: function (req, res) {
        let bike = new Bicycle();
        bike.title = req.body.title;
        bike.description = req.body.description;
        bike.price = req.body.price;
        bike.location = req.body.location;
        bike.imgurl = req.body.imgurl;
        bike.owner = req.user._id;

        bike.save().then(newBike => {
            User.updateOne({
                _id: req.user._id
            }, {
                $push: {
                    bicycles: newBike._id
                }
            }, {
                useFindAndModify: false
            }).catch(err => res.json({
                success: false,
                msg: err
            }));
            res.json({
                success: true,
                msg: "Bike added",
                bike: newBike
            });
        }).catch(err => res.json({
            success: false,
            msg: err
        }));
    },

    update: function (req, res) {
        Bicycle.updateOne({
            _id: req.params.id
        }, req.body, {
            useFindAndModify: false
        }).then(bike => {
            res.json({
                success: true,
                msg: "Bicycle info updated",
                bike: bike
            });
        }).catch(err => res.json({
            success: false,
            msg: err
        }));
    },

    delete: function (req, res) {
        Bicycle.findOne({
            _id: req.params.id
        }).then(bike => {
            User.updateOne({
                _id: bike.owner._id
            }, {
                $pull: {
                    bicycles: req.params.id
                }
            }, {
                useFindAndModify: false
            }).then(u => {
                Bicycle.deleteOne({
                    _id: req.params.id
                }).then(data => {
                    res.json({
                        success: true,
                        msg: "Bicycle deleted",
                        bike: bike
                    });
                }).catch(err => res.json({
                    success: false,
                    msg: err
                }));
            }).catch(err => res.json({
                success: false,
                msg: err
            }));
        }).catch(err => {
            res.json({
                success: false,
                msg: err
            });
        });
    }
}