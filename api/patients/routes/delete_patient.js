const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Patient = require('../model/Patient');
const router = express.Router();

router.delete('/:id', passport.authenticate('jwt', { session: false}),
  (req, res) => {
    const patientId = req.params.id;

    Patient.findOneAndRemove({ id: patientId }, (err, patient) => {
      if(err || !patient) {
        res.json({ status: false });
      }
      res.json({ status: true });
    })
  });

module.exports = router;
