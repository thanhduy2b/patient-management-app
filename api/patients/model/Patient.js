const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  dateTime: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, required: true }
});

const PatientSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  appointments: [AppointmentSchema]
});

module.exports = mongoose.model('Patient', PatientSchema);
