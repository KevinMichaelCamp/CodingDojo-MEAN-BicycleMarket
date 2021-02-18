var User = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = {
    index: function (req, res) {
        User.find()
            .then(users => res.json({
                success: true,
                msg: "Found users",
                users: users
            }))
            .catch(err => res.json({
                success: false,
                msg: err
            }));
    },

    profile: function (req, res) {
        res.json({
            user: req.user
        });
    },

    register: function (req, res) {
        console.log(req.body);
        User.find({
            email: req.body.email
        }).then(user => {
            if (user.length > 0) {
                res.json({
                    success: false,
                    msg: "Email already in database"
                });
            } else if (req.body.password != req.body.pw_confirm) {
                res.json({
                    success: false,
                    msg: "Password does not match confirmation"
                });
            } else {
                console.log(req.body);
                let user = new User();
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password;
                user.validate(err => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        });
                    } else {
                        bcrypt.hash(user.password, 10).then(hashpw => {
                            user.password = hashpw;
                            user.save().then(newUser => {
                                res.json({
                                    success: true,
                                    msg: "New user registered, you may now login",
                                    user: newUser
                                });
                            }).catch(err => res.json({
                                success: false,
                                msg: err
                            }));
                        })
                    }
                })
            }
        })
    },

    login: function (req, res) {
        User.findOne({
            email: req.body.email
        }).populate("bicycles").then(user => {
            if (user == null) {
                res.json({
                    success: false,
                    msg: "Email not found"
                });
            } else {
                bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        const token = jwt.sign({
                            data: user
                        }, "MySecret", {
                            expiresIn: 604800
                        });
                        res.json({
                            success: true,
                            msg: "Login successful",
                            token: 'JWT ' + token,
                            user: {
                                id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                bicycles: user.bicycles
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            msg: "Password invalid"
                        });
                    }
                }).catch(err => res.json({
                    success: false,
                    msg: err
                }));
            }
        }).catch(err => {
            res.json({
                success: false,
                msg: err
            });
        })
    },

    update: function (req, res) {
        let user = req.user;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.validate(function (err) {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error updating user"
                });
            } else {
                bcrypt.hash(user.password, 10).then(hashpw => {
                    user.password = hashpw;
                    User.updateOne({
                        _id: req.user._id
                    }, user).then(user => {
                        res.json({
                            success: true,
                            msg: "User info updated",
                            user: user
                        });
                    }).catch(err => res.json({
                        success: false,
                        msg: err
                    }));
                }).catch(err => res.json({
                    success: false,
                    msg: err
                }));
            }
        })
    },

    delete: function (req, res) {
        User.deleteOne({
            _id: req.user.id
        }).then(user => {
            res.json({
                success: true,
                msg: "User deleted",
                user: user
            });
        }).catch(err => res.json({
            success: false,
            msg: err
        }));
    }

}