import React, { useEffect } from "react";
import PatientSearchbar from "./PatientSearchbar";
import AddressBook from "./AddressBook";

const NewApointment = ({
  apointmentDate,
  setApointmentDate,
  apointmentTime,
  setApointmentTime,
  apointmentTypology,
  setApointmentTypology,
  apointmentCost,
  setApointmentCost,
  apointmentSettled,
  setApointmentSettled,
  apointmentNote,
  setApointmentNote,
  closeNewApointmentModal,
  closeFindPatientModal,
  addApointment,
  patientFullName,
  setPatientFullName,
  search,
  setSearch,
  patients,
  clearInputFields,
  setCurrentWeek,
  selectPatient,
}) => {
  useEffect(() => {
    // setApointmentDate("2022-08-15");
    // setApointmentTime("08:00");
    // setApointmentSettled('');
    setApointmentTypology("privato");
    setApointmentNote("Primo appuntamento / Valutazione"); //Default note for apointment
    setApointmentCost("30€");
  }, []);
  return (
    <div className="newApointmentContainer">
      <div className="NewApointment invisible">
        <button
          className="closeNewApointmentForm"
          onClick={() => {
            closeNewApointmentModal();
            closeFindPatientModal();
          }}
        >
          &times;
        </button>
        <h1>Add Apointment</h1>
        <form className="newApointmentForm" onSubmit={addApointment}>
          <label htmlFor="selectedPatient">Patient:</label>
          <input
            id="selectedPatient"
            type="text"
            required
            value={patientFullName}
            onChange={(e) => setPatientFullName(e.target.value)}
          />

          <label htmlFor="apointmentDate">Date:</label>
          <input
            id="apointmentDate"
            type="date"
            value={apointmentDate}
            onChange={(e) => {
              setApointmentDate(e.target.value);
              console.log(apointmentDate);
            }}
          />
          <label htmlFor="apointmentTime">Time:</label>
          <input
            id="apointmentTime"
            type="time"
            value={apointmentTime}
            onChange={(e) => setApointmentTime(e.target.value)}
          />
          <label htmlFor="apointmentTypology">Typology:</label>
          <div className="typologyInput">
            <input
              id="private"
              type="radio"
              required
              defaultChecked
              name="typology"
              value={apointmentTypology}
              onChange={(e) => setApointmentTypology(e.target.id)}
            />
            {"Privato"}

            <input
              id="studio"
              type="radio"
              required
              name="typology"
              value={apointmentTypology}
              onChange={(e) => setApointmentTypology(e.target.id)}
            />
            {"Studio"}
          </div>
          <label htmlFor="apointmentCost">Cost:</label>
          <input
            id="apointmentCost"
            type="currency"
            value={apointmentCost}
            onChange={(e) => setApointmentCost(e.target.value)}
          />
          <label htmlFor="apointmentSettled">Settled:</label>
          <input
            id="apointmentSettled"
            type="checkbox"
            value={apointmentSettled}
            onClick={() => setApointmentSettled(!apointmentSettled)}
          />
          <label htmlFor="apointmentNote">Patient:</label>
          <textarea
            id="apointmentNote"
            type="text"
            required
            value={apointmentNote}
            onChange={(e) => setApointmentNote(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="FindPatient invisible">
        <button
          className="closeFindPatientForm"
          onClick={() => {
            closeNewApointmentModal();
            closeFindPatientModal();
          }}
        >
          &times;
        </button>
        <h1>Find Patient</h1>
        <PatientSearchbar search={search} setSearch={setSearch} />
        <AddressBook
          patients={patients}
          search={search}
          clearInputFields={clearInputFields}
          setCurrentWeek={setCurrentWeek}
          selectPatient={selectPatient}
        />
      </div>
      <div className="overlay invisible"></div>
    </div>
  );
};

export default NewApointment;
