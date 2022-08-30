const express = require("express");
const router = express.Router();

//Import model
const Apointment = require("../../models/Apointment.js");

router.patch("/:id", async (req, res) => {
  const updatedApointment = await Apointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updatedApointment,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
