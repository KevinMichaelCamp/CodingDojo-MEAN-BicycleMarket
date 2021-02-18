const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./config/mongoose');
const passport = require('passport');
const port = 6789;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public/dist/public'));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(express.urlencoded({
    extended: true
}));
require('./config/routes')(app);

app.listen(port, console.log(`listening on port ${port}`));