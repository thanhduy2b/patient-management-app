const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Patient = require('../model/Patient');
const router = express.Router();

router.put('/:id', passport.authenticate('jwt', { session: false}),
  (req, res) => {
    const patientId = req.params.id;

    Patient.findOneAndUpdate({ id: patientId },
      req.body, { new: true }, (err, patient) => {
        if(err) {
          res.json({ status: false });
        }
        res.json({ status: true });
      });
  });

module.exports = router;
