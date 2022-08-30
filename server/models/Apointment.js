const mongoose = require("mongoose");

const ApointmentSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  settled: {
    type: Boolean,
    required: true,
  },
});

const Apointment = mongoose.model("Apointment", ApointmentSchema);

module.exports = Apointment;
