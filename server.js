"use strict";

require('dotenv').config();
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    uriUtil = require('mongodb-uri'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(express.static(__dirname + '/dist'));

// Node variables
const APP_HOST = process.env.APP_HOST;
const APP_PORT = process.env.APP_PORT;
const DB_CONNECTION = process.env.MONGODB_URI;

const mongodbUri = DB_CONNECTION;
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

// Auth APIs
app.use('/api/auth', require('./api/auth/routes/login'));

// Patients APIs
app.use('/api/patients', require('./api/patients/routes/post_patient'));
app.use('/api/patients', require('./api/patients/routes/get_patients'));
app.use('/api/patients', require('./api/patients/routes/get_patient'));
app.use('/api/patients', require('./api/patients/routes/put_patient'));
app.use('/api/patients', require('./api/patients/routes/delete_patient'));

// Redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

const server = app.listen(APP_PORT, APP_HOST, () => {

  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${APP_HOST}:${APP_PORT}`);
  });

});

// Open browser
var opn = require('opn');

opn(`http://${APP_HOST}:${APP_PORT}`).then(() => {
    console.log('Browser closed.');
});
