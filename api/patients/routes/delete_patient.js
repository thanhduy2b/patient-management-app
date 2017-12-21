const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../model/Patient');
const router = express.Router();

router.delete('/:id', (req, res) => {
    const patientId = req.params.id;

    Patient.findOneAndRemove({ id: patientId }, (err, patient) => {
      if(err || !patient) {
        res.json({ status: false });
      }
      res.json({ status: true });
    })
  });

module.exports = router;
