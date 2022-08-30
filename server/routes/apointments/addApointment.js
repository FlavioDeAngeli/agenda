const express = require("express");
const router = express.Router();

//Import model
const Apointment = require("../../models/Apointment.js");

router.post("/", async (req, res) => {
  const apointment = new Apointment(req.body);
  try {
    await apointment.save();
    res.status(201).json({
      status: "Success",
      data: {
        apointment,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

module.exports = router;
