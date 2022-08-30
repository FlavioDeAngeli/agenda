require("dotenv").config(); //.env (Environmental variables file)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const app = express();

//Database setup
const PORT = process.env.PORT || 3500;
connectDB();

app.use(express.json());
app.use(cors());

//Routing
//Patients
app.use("/add-patient", require("./routes/patients/addPatient"));
app.use("/get-patient", require("./routes/patients/getPatient"));
app.use("/update-patient/", require("./routes/patients/updatePatient"));
app.use("/delete-patient", require("./routes/patients/deletePatient"));

//Apointments
app.use("/add-apointment", require("./routes/apointments/addApointment"));
app.use("/get-apointment", require("./routes/apointments/getApointment"));
app.use(
  "/update-apointment/",
  require("./routes/apointments/updateApointment")
);
app.use("/delete-apointment", require("./routes/apointments/deleteApointment"));

// //Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}...`);
// });

//Server starts only if database is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
