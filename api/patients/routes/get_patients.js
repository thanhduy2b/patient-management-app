const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Patient = require('../model/Patient');
const router = express.Router();

router.get('/page/:skip/:top', (req, res) => {

    Patient.find((err, patients) => {
      if(err) {
        res.status(404).json(err);
      }

      console.log(`Length: ${patients.length}`);

      const topVal = req.params.top,
            skipVal = req.params.skip,
            skip = (isNaN(skipVal)) ? 0 : +skipVal;
      let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

      if(top > patients.length) {
        top = skip + (patients.length - skip);
      }

      console.log(`Skip: ${skip} Top: ${top}`);

      var pagedPatients = patients.slice(skip, top);
      res.setHeader('X-InlineCount', patients.length);
      res.json(pagedPatients);
    })
});

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    Patient.find((err, patients) => {
      if(err) {
        res.status(404).json(err);
      }
      res.json(patients);
    })
  });

module.exports = router;
