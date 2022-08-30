import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AddressBook = ({ patients, search, clearInputFields, selectPatient }) => {
  useEffect(() => {
    clearInputFields();
  }, []);

  return (
    <div className="AddressBook">
      <div className="addressBookHeader">
        <h2>Patients List</h2>
        <Link to={"/newpatient"} state={{ patient: patients[0] }}>
          <button id="openNewPatientModal">+</button>
        </Link>
      </div>
      <div className="patientsList">
        <ul>
          {patients.map((patient) => {
            if (
              patient.name.toLowerCase().includes(search.toLowerCase()) ||
              patient.surname.toLowerCase().includes(search.toLowerCase())
            ) {
              return (
                <li key={patient._id}>
                  <div className="patient">
                    <div className="patientInfo">
                      <span className="patientFullNameSmall">
                        {patient.surname + " " + patient.name}
                      </span>
                      <span className="patientPhoneSmall">{patient.phone}</span>
                    </div>
                    <Link
                      to={`/patientcard/${patient._id}`}
                      state={{ patient: patient }}
                    >
                      <button
                        className="viewPatientBtn"
                        onClick={clearInputFields}
                      >
                        +
                      </button>
                    </Link>
                    <button
                      className="selectPatientBtn"
                      onClick={() => selectPatient(patient)}
                    >
                      ✓
                    </button>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddressBook;
