const express = require("express");
const router = express.Router();

//Import model
const Apointment = require("../../models/Apointment.js");

router.get("/", async (req, res) => {
  const Apointments = await Apointment.find({ patient: "De Angeli Flavio" }); //{ surname: "De Angeli" }
  try {
    res.status(200).json({
      status: "Success",
      data: {
        Apointments,
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
