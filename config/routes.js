var userController = require('../controllers/UserController');
var bikeController = require('../controllers/BikeController');
var passport = require('passport');
var path = require('path');

module.exports = function (app) {
    app.post('/users', userController.register);
    app.post('/users/login', userController.login);
    app.get('/users', passport.authenticate('jwt', {
        session: false
    }), userController.index);
    app.get('/profile', passport.authenticate('jwt', {
        session: false
    }), userController.profile);
    app.get('/bikes', passport.authenticate('jwt', {
        session: false
    }), bikeController.index);
    app.get('/bikes/user', passport.authenticate('jwt', {
        session: false
    }), bikeController.getBikesByUser);
    app.get('/bikes/:id', passport.authenticate('jwt', {
        session: false
    }), bikeController.show);
    app.post('/bikes', passport.authenticate('jwt', {
        session: false
    }), bikeController.add);
    app.patch('/users', passport.authenticate('jwt', {
        session: false
    }), userController.update);
    app.patch('/bikes/:id', passport.authenticate('jwt', {
        session: false
    }), bikeController.update);
    app.delete('/users', passport.authenticate('jwt', {
        session: false
    }), userController.delete);
    app.delete('/bikes/:id', passport.authenticate('jwt', {
        session: false
    }), bikeController.delete);
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });

}