const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Patient = require('../model/Patient');
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false}),
  (req, res) => {
    Patient.find((err, patients) => {
      if(err) {
        res.status(404).json(err);
      }

      const patient = new Patient(req.body);
      let maxId = Math.max.apply(Math, patients.map((p) => p.id));
      patient.id = ++maxId;

      patient.save((err, patient) => {
        if(err) {
          res.status(400).json(err);
        }
        res.json(patient);
      });
    })
  });

module.exports = router;
