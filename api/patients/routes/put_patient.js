const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../model/Patient');
const router = express.Router();

router.put('/:id', (req, res) => {
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
