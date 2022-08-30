import React, { useEffect } from "react";

const NewPatient = ({
  patientSurname,
  setPatientSurname,
  patientName,
  setPatientName,
  patientBirthday,
  setPatientBirthday,
  patientGender,
  setPatientGender,
  patientFiscalcode,
  setPatientFiscalcode,
  patientAddress,
  setPatientAddress,
  patientPhone,
  setPatientPhone,
  patientEmail,
  setPatientEmail,
  patientNotes,
  setPatientNotes,
  addPatient,
  openNewPatientModal,
  closeNewPatientModal,
}) => {
  useEffect(() => {
    openNewPatientModal();
    setPatientNotes(["Registrazione paziente."]); //Default note for new patient
  }, []);

  return (
    <div className="newPatientContainer">
      <div className="NewPatient invisible">
        {/* <link to={"/"}> */}
        <button className="closeNewPatientForm" onClick={closeNewPatientModal}>
          &times;
        </button>
        {/* </link> */}
        <h1>Add Patient</h1>
        <form className="newPatientForm" onSubmit={addPatient}>
          <label htmlFor="patientSurame">Surname:</label>
          <input
            id="patientSurname"
            type="text"
            required
            value={patientSurname}
            onChange={(e) => setPatientSurname(e.target.value)}
          />
          <label htmlFor="patientName">Name:</label>
          <input
            id="patientName"
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <label htmlFor="patientBirthday">Birthday:</label>
          <input
            id="patientBirthday"
            type="date"
            min="1900-01-01"
            max={new Date().toLocaleDateString("en-ca")}
            value={patientBirthday}
            onChange={(e) => setPatientBirthday(e.target.value)}
          />
          <label htmlFor="patientGender">Gender:</label>
          <div className="genderInput">
            <input
              id="male"
              type="radio"
              required
              name="gender"
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.id)}
            />
            {"Male"}

            <input
              id="female"
              type="radio"
              required
              name="gender"
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.id)}
            />
            {"Female"}
          </div>
          <label htmlFor="patientFiscalcode">Fiscalcode:</label>
          <input
            id="patientFiscalcode"
            type="text"
            minLength="16"
            maxLength="16"
            value={patientFiscalcode}
            onChange={(e) => setPatientFiscalcode(e.target.value.toUpperCase())}
          />
          <label htmlFor="patientAddress">Address:</label>
          <input
            id="patientAddress"
            type="text"
            placeholder="via, città"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
          />
          <label htmlFor="patientPhone">Phone:</label>
          <input
            id="patientPhone"
            type="tel"
            required
            minLength="9"
            maxLength="11"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
          />

          <label htmlFor="patientEmail">E-mail:</label>
          <input
            id="patientEmail"
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
          />

          <label htmlFor="patientNotes">Notes:</label>
          <textarea
            id="patientNotes"
            type="text"
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="overlay invisible"></div>
    </div>
  );
};

export default NewPatient;
