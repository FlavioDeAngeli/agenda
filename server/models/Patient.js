const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  fiscalcode: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  notes: [],
  apointments: [],
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
