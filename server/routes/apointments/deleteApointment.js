const express = require("express");
const router = express.Router();

//Import model
const Apointment = require("../../models/Apointment.js");

router.delete("/:id", async (req, res) => {
  await Apointment.findByIdAndDelete(req.params.id);

  try {
    res.status(204).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

module.exports = router;
