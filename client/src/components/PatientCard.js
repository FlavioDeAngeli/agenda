import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PatientCard = ({
  editPhone,
  patientPhone,
  setPatientPhone,
  editAddress,
  patientAddress,
  setPatientAddress,
  editFiscalcode,
  patientFiscalcode,
  setPatientFiscalcode,
  editEmail,
  patientEmail,
  setPatientEmail,
  patientNotes,
  setPatientNotes,
  showInputLabel,
  deletePatient,
  deleteNote,
  addNote,
}) => {
  const { id } = useParams();
  const location = useLocation();
  const { patient } = location.state;

  useEffect(() => {
    setPatientPhone(`${patient.phone}`);
    setPatientAddress(`${patient.address}`);
    setPatientFiscalcode(`${patient.fiscalcode}`);
    setPatientEmail(`${patient.email}`);
  }, [patient]);

  //Age Calculator ---------------------------------------------------------------------------------------
  function getAge(dateString) {
    let ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  const age = getAge(patient.birthday);

  //Gender display ----------------------------------------------------------------------------------------
  const gender = patient.gender.charAt(0).toUpperCase();

  return (
    <div className="patientCardContainer">
      <div className="patientCardHeader">
        <h2>{`${patient.name} ${patient.surname}`}</h2>
        <div className="ageGenderContainer">
          <div className="age">{age}</div>
          <div className="gender">{gender}</div>
        </div>
      </div>
      <div className="patientCardInfo">
        {/* Patient address section --------------------------------------------------------------------- */}
        <div className="patientAddress">
          <label htmlFor="patientAddress" id="patientAddressLabel">
            {"Indirizzo: "}
            <a
              href={`https://www.google.com/maps/search/${patientAddress}`} //Google Maps External Link
              target="_blank" //open in new tab
              rel="noopener noreferrer" //prevent tabnabbing
            >{`${patientAddress}`}</a>
          </label>
          <input
            className="invisible"
            id="patientAddressInput"
            type={"text"}
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
          ></input>
          <div className="patientAddressButtons">
            <button
              id="edit"
              onClick={(e) =>
                showInputLabel(
                  "patientAddressLabel",
                  "patientAddressInput",
                  e.target.id
                )
              }
            >
              Edit
            </button>
            <button
              id="save"
              onClick={(e) => {
                editAddress(id, patientAddress);
                showInputLabel(
                  "patientAddressLabel",
                  "patientAddressInput",
                  e.target.id
                );
              }}
            >
              Save
            </button>
          </div>
        </div>
        {/* Patient fiscal-code section ------------------------------------------------------------------ */}
        <div className="patientFiscalcode">
          <label htmlFor="patientFiscalcode" id="patientFiscalcodeLabel">
            {`CF: ${patientFiscalcode}`}
          </label>
          <input
            className="invisible"
            id="patientFiscalcodeInput"
            type={"text"}
            maxLength="16"
            value={patientFiscalcode}
            onChange={(e) => setPatientFiscalcode(e.target.value.toUpperCase())}
          ></input>
          <div className="patientFiscalcodeButtons">
            <button
              id="edit"
              onClick={(e) =>
                showInputLabel(
                  "patientFiscalcodeLabel",
                  "patientFiscalcodeInput",
                  e.target.id
                )
              }
            >
              Edit
            </button>
            <button
              id="save"
              onClick={(e) => {
                editFiscalcode(id, patientFiscalcode);
                showInputLabel(
                  "patientFiscalcodeLabel",
                  "patientFiscalcodeInput",
                  e.target.id
                );
              }}
            >
              Save
            </button>
          </div>
        </div>
        {/* Patient phone section ------------------------------------------------------------------------ */}
        <div className="patientPhone">
          <label htmlFor="patientPhone" id="patientPhoneLabel">
            {"Telefono: "}
            <a href={`tel:${patientPhone}`}>{`${patientPhone}`}</a>
          </label>
          <input
            className="invisible"
            id="patientPhoneInput"
            type={"tel"}
            maxLength="11"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
          ></input>
          <div className="patientPhoneButtons">
            <button
              id="edit"
              onClick={(e) =>
                showInputLabel(
                  "patientPhoneLabel",
                  "patientPhoneInput",
                  e.target.id
                )
              }
            >
              Edit
            </button>
            <button
              id="save"
              onClick={(e) => {
                editPhone(id, patientPhone);
                showInputLabel(
                  "patientPhoneLabel",
                  "patientPhoneInput",
                  e.target.id
                );
              }}
            >
              Save
            </button>
          </div>
        </div>

        {/* Patient e-mail section ------------------------------------------------------------------ */}
        <div className="patientEmail">
          <label htmlFor="patientEmail" id="patientEmailLabel">
            {"E-Mail: "}
            <a href={`mailto:${patientEmail}`}>{`${patientEmail}`}</a>
          </label>
          <input
            className="invisible"
            id="patientEmailInput"
            type={"text"}
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
          ></input>
          <div className="patientEmailButtons">
            <button
              id="edit"
              onClick={(e) =>
                showInputLabel(
                  "patientEmailLabel",
                  "patientEmailInput",
                  e.target.id
                )
              }
            >
              Edit
            </button>
            <button
              id="save"
              onClick={(e) => {
                editEmail(id, patientEmail);
                showInputLabel(
                  "patientEmailLabel",
                  "patientEmailInput",
                  e.target.id
                );
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="patientCardNotes">
        <ul>
          {patient.notes.map((note, i) => {
            return (
              <div
                className="patientNotes"
                key={`${patient.surname}_${patient.name}_note${i}`}
                id={`${patient.surname}_${patient.name}_note${i}`}
              >
                <li>{note}</li>
                <button
                  id="delete-note-btn"
                  onClick={() => deleteNote(id, i, patient)}
                >
                  Delete Note
                </button>
              </div>
            );
          })}
        </ul>
        <div className="addNote">
          <textarea
            id="patientNewNote"
            type="text"
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
          />
          <button
            id="add-note-btn"
            onClick={() => addNote(id, patient, patientNotes)}
          >
            Add Note
          </button>
        </div>
      </div>
      <div className="patientCardApointments">
        {/* //? Sort apointments by date */}
        <ul>
          {patient.apointments.map((apointment, i) => {
            return (
              <div
                className="patientApointments"
                key={`${patient.surname}_${patient.name}_apointment${i}`}
                id={`${patient.surname}_${patient.name}_apointment${i}`}
              >
                <li>
                  {apointment.date} - {apointment.time} - {apointment.notes}
                </li>
                {/* <button
                  id="delete-note-btn"
                  onClick={() => deleteNote(id, i, patient)}
                >
                  Delete Note
                </button> */}
              </div>
            );
          })}
        </ul>
        {/* <div className="addNote">
          <textarea
            id="patientNewNote"
            type="text"
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
          />
          <button
            id="add-note-btn"
            onClick={() => addNote(id, patient, patientNotes)}
          >
            Add Note
          </button>
        </div> */}
      </div>
      <button
        id="delete-patient-btn"
        onClick={() => deletePatient(id, patient.surname, patient.name)}
      >
        Delete Patient
      </button>
    </div>
  );
};

export default PatientCard;
