const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Patient = require('../model/Patient');
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false}),
  (req, res) => {
    const patientId = req.params.id;

    Patient.findOne({ id: patientId }, (err, patient) => {
      if(err) {
        res.status(400).json(err);
      }
      if(!patient) {
        res.status(404).json({ message: 'Patient not found.' });
      }

      res.json(patient);
    });
  });

module.exports = router;
