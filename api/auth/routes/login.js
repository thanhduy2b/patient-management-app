var passport = require('passport');
var config = require('../../../config/server-keys');
require('../../../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/User');
const router = express.Router();

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        if(user.password === req.body.password) {
          // if user is found and password is right create a token
          var payload = {id: user.id};
          var token = jwt.sign(payload, config.secret);

          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      }
    });
  });

module.exports = router;
