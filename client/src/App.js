//Style import
import "./App.css";
//React Hooks import
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
//Dependencies import

//import config functions
import client from "./config/connection";
//Components import
import Layout from "./components/Layout";
import PatientSearchbar from "./components/PatientSearchbar";
import Agenda from "./components/Agenda";
import AddressBook from "./components/AddressBook";
import NewPatient from "./components/NewPatient";
import PatientCard from "./components/PatientCard";
import Page404 from "./components/Page404";
import NewApointment from "./components/NewApointment";
// import ApointmentCard from "./components/ApointmentCard"; //? creare componente per 'apointments'???

function App() {
  const [patients, setPatients] = useState([]); //state for patients list
  const [patientsList, setPatientsList] = useState([]);
  const [apointmentsList, setApointmentsList] = useState([]);

  //Define patient model properties state:
  const [patientSurname, setPatientSurname] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientFullName, setPatientFullName] = useState("");
  const [patientBirthday, setPatientBirthday] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientFiscalcode, setPatientFiscalcode] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState([]);
  const [patientApointments, setPatientApointments] = useState([]); //? Verificare uso setPatientApointments

  //Searchbar state:
  const [search, setSearch] = useState(""); //state for the searchbar

  //Agenda state:
  const [currentWeek, setCurrentWeek] = useState(0);

  //Apointments state:
  const [apointmentDate, setApointmentDate] = useState("");
  const [apointmentTime, setApointmentTime] = useState("");
  const [apointmentTypology, setApointmentTypology] = useState("");
  const [apointmentCost, setApointmentCost] = useState("");
  const [apointmentSettled, setApointmentSettled] = useState(false);
  const [apointmentNote, setApointmentNote] = useState("");

  const navigate = useNavigate();

  //? Quando patient.lenght = 0 (nessun paziente presente nel db) l'app va in crash
  //? Correggere errori 'React Hook useEffect has a missing dependency'
  //? Export helpers function in a different folder
  //? Sistemare messaggio logger
  //? Verificare lentezza nel visualizzare AddressBook quando si inserisce PatientSearchbar in NewApointment

  //Load items from database ------------------------------------------------------------------------------
  useEffect(() => {
    getPatients();
    sortPatients();
    getApointments();
  }, [patientsList]);

  //Get Patients from Database ----------------------------------------------------------------------------
  const getPatients = async () => {
    client.get("/get-patient").then((res) => {
      const patientsList = res.data.data.Patients;
      setPatientsList(patientsList);
    });
  };

  //Sort patients alphabetically ------------------------------------------------------------------------
  const sortPatients = async () => {
    const comparePatients = (a, b) => {
      return (a.surname + a.name).localeCompare(b.surname + b.name, "it", {
        sensitivity: "base",
      });
    };
    const sortedPatientsList = patientsList.sort(comparePatients);
    setPatients(sortedPatientsList);
  };

  //Get apointments -------------------------------------------------------------------------------------
  const getApointments = async () => {
    let apointments = [];
    try {
      patients.forEach((patient) => {
        patient.apointments.forEach((apointment) =>
          apointments.push(apointment)
        );
      });
      setApointmentsList(apointments);
    } catch (err) {
      console.log(err);
    }
  };

  //Clear input fileds ----------------------------------------------------------------------------------
  const clearInputFields = async () => {
    try {
      setSearch("");
      setPatientName("");
      setPatientFullName("");
      setPatientSurname("");
      setPatientBirthday("");
      setPatientGender("");
      setPatientFiscalcode("");
      setPatientPhone("");
      setPatientEmail("");
      setPatientNotes([]);
      setApointmentDate("");
      setApointmentTime("");
    } catch (err) {
      console.log(err);
    }
  };

  //Open NewPatient Modal ---------------------------------------------------------------------------------
  const openNewPatientModal = async () => {
    const newPatientModal = document.querySelector(".NewPatient");
    const overlay = document.querySelector(".overlay");
    try {
      clearInputFields();
      newPatientModal.classList.remove("invisible");
      overlay.classList.remove("invisible");
    } catch (err) {
      console.log(err);
    }
  };

  //Close NewPatient Modal ---------------------------------------------------------------------------------
  const closeNewPatientModal = async () => {
    const newPatientModal = document.querySelector(".NewPatient");
    const overlay = document.querySelector(".overlay");

    try {
      newPatientModal.classList.add("invisible");
      overlay.classList.add("invisible");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  //Open NewApointment Modal ---------------------------------------------------------------------------------
  const openNewApointmentModal = async (target) => {
    const [day, month, year] = target.split("/");
    const targetDate = `${year}-${month}-${day}`;

    const newApointmentModal = document.querySelector(".NewApointment");
    const overlay = document.querySelector(".overlay");

    try {
      // clearInputFields();
      newApointmentModal.classList.remove("invisible");
      overlay.classList.remove("invisible");

      //? Cercare soluzione migliore. setApointmentDate e setApointmentTime non funzionano senza delay e nemmeno all'interno di useEffect di NewApointment

      setTimeout(() => {
        setApointmentDate(targetDate);
        setApointmentTime("08:00");
      }, 1);
    } catch (err) {
      console.log(err);
    }
  };

  //Close NewApointment Modal ---------------------------------------------------------------------------------
  const closeNewApointmentModal = async () => {
    const newApointmentModal = document.querySelector(".NewApointment");
    const overlay = document.querySelector(".overlay");

    try {
      newApointmentModal.classList.add("invisible");
      overlay.classList.add("invisible");
      navigate("/agenda");
    } catch (err) {
      console.log(err);
    }
  };

  //Open FindPatient Modal ---------------------------------------------------------------------------------
  const openFindPatientModal = async () => {
    const findPatientModal = document.querySelector(".FindPatient");
    const overlay = document.querySelector(".overlay");
    try {
      clearInputFields();
      findPatientModal.classList.remove("invisible");
      overlay.classList.remove("invisible");
    } catch (err) {
      console.log(err);
    }
  };

  //Close FindPatient Modal ---------------------------------------------------------------------------------
  const closeFindPatientModal = async () => {
    const findPatientModal = document.querySelector(".FindPatient");
    const overlay = document.querySelector(".overlay");

    try {
      findPatientModal.classList.add("invisible");
      overlay.classList.add("invisible");
      navigate("/agenda");
    } catch (err) {
      console.log(err);
    } finally {
      clearInputFields();
    }
  };

  //Add Patient -------------------------------------------------------------------------------------------
  const addPatient = async (e) => {
    e.preventDefault();

    const newPatient = {
      surname: patientSurname,
      name: patientName,
      birthday: patientBirthday,
      gender: patientGender,
      fiscalcode: patientFiscalcode,
      address: patientAddress,
      phone: patientPhone,
      email: patientEmail,
      notes: `${new Date().toLocaleString()} - ${patientNotes}`,
      apointments: patientApointments,
    };

    try {
      const response = await client.post("/add-patient", newPatient);
      console.log(
        `${new Date().toLocaleString()} - New patient ${
          response.data.data.patient.surname
        } ${response.data.data.patient.name} successfully added`
      );
      navigate(`/patientcard/${response.data.data.patient._id}`, {
        state: { patient: response.data.data.patient },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Edit patient phone --------------------------------------------------------------------------------------
  const showInputLabel = (labelName, inputName, button) => {
    const label = document.getElementById(labelName);
    const input = document.getElementById(inputName);

    if (
      (button === "edit" || button === "patientPhoneLabel") &&
      input.classList.contains("invisible")
    ) {
      label.classList.toggle("invisible");
      input.classList.toggle("invisible");
    }

    if (button === "save" && label.classList.contains("invisible")) {
      label.classList.toggle("invisible");
      input.classList.toggle("invisible");
    }
  };

  const editPhone = async (id, newPhone) => {
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        phone: newPhone,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${
          response.data.data.updatedPatient.name
        } phone number successfully updated`
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Edit patient address ---------------------------------------------------------------------------------
  const editAddress = async (id, newAddress) => {
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        address: newAddress,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${
          response.data.data.updatedPatient.name
        } address successfully updated`
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Edit patient fiscal-code --------------------------------------------------------------------------------
  const editFiscalcode = async (id, newFiscalcode) => {
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        fiscalcode: newFiscalcode,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${
          response.data.data.updatedPatient.name
        } fiscal-code successfully updated`
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Edit patient e-mail --------------------------------------------------------------------------------
  const editEmail = async (id, newEmail) => {
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        email: newEmail,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${response.data.data.updatedPatient.name} e-mail successfully updated`
      );
    } catch (err) {
      console.log(err);
    }
  };

  //Delete Patient ---------------------------------------------------------------------------------------
  const deletePatient = async (id, surname, name) => {
    const deletedPatient = {
      surname: surname,
      name: name,
    };
    //??? - Verificare logger (utilizzare response)
    try {
      await client.delete(`/delete-patient/${id}`, {
        headers: {},
        data: deletedPatient,
      });
      console.log(
        `${new Date().toLocaleString()} - Patient ${deletedPatient.surname} ${
          deletedPatient.name
        } successfully deleted`
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Add Note ---------------------------------------------------------------------------------------------
  const addNote = async (id, patient, newNote) => {
    patient.notes.push(`${new Date().toLocaleString()} - ${newNote}`);
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        notes: patient.notes,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${response.data.data.updatedPatient.name} notes successfully updated`
      );
      setPatientNotes([]);
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Add Apointment --------------------------------------------------------------------------------------
  const addApointment = async (e) => {
    e.preventDefault();

    const selectedPatient = patients.find(
      (patient) => `${patient.surname} ${patient.name}` === patientFullName
    );

    const newApointment = {
      patient: patientFullName,
      date: apointmentDate,
      time: apointmentTime,
      typology: apointmentTypology,
      cost: apointmentCost,
      settled: apointmentSettled,
      notes: apointmentNote,
    };

    selectedPatient.apointments.push(newApointment);
    try {
      const response = await client.patch(
        `/update-patient/${selectedPatient._id}`,
        {
          apointments: selectedPatient.apointments,
        }
      );
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${
          response.data.data.updatedPatient.name
        } apointments successfully updated`
      );

      //update apointments list (adding the new apointment)
      // getApointments();
    } catch (err) {
      console.log(err);
    } finally {
      closeNewApointmentModal();
      closeFindPatientModal();
    }
  };

  //Delete Note -----------------------------------------------------------------------------------------
  const deleteNote = async (id, i, patient) => {
    patient.notes.splice(i, 1);
    try {
      const response = await client.patch(`/update-patient/${id}`, {
        notes: patient.notes,
      });
      console.log(
        `${new Date().toLocaleString()} - ${
          response.data.data.updatedPatient.surname
        } ${response.data.data.updatedPatient.name} notes successfully updated`
      );
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //Agenda display days (weekly) ------------------------------------------------------------------------
  const daySetter = async () => {
    const mon = document.getElementById("mon");
    const tue = document.getElementById("tue");
    const wed = document.getElementById("wed");
    const thu = document.getElementById("thu");
    const fry = document.getElementById("fry");
    const sat = document.getElementById("sat");
    const sun = document.getElementById("sun");

    const weekDays = [mon, tue, wed, thu, fry, sat];
    let today = new Date();

    try {
      today = new Date(today.setDate(today.getDate() + currentWeek));

      const currentWeekDay = today.getDay();

      sun.innerText = `Sunday - ${new Date(
        today.setDate(today.getDate() - currentWeekDay)
      ).toLocaleDateString()}`;

      weekDays.forEach((day) => {
        //highlight current day
        if (new Date().getDay() === +day.dataset.weekday && currentWeek === 0) {
          day.firstChild.classList.add("highlight");
        } else {
          day.firstChild.classList.remove("highlight");
        }
        //set date header
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        day.firstChild.childNodes[1].innerText = `${new Date(
          today.setDate(today.getDate() + 1)
        ).toLocaleDateString(undefined, options)}`;
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Clear Agenda ----------------------------------------------------------------------------------------
  const clearAgenda = () => {
    const mon = document.getElementById("mon");
    const tue = document.getElementById("tue");
    const wed = document.getElementById("wed");
    const thu = document.getElementById("thu");
    const fry = document.getElementById("fry");
    const sat = document.getElementById("sat");
    // const sun = document.getElementById("sun");

    const weekDays = [mon, tue, wed, thu, fry, sat];

    weekDays.forEach((day) => {
      day.childNodes.forEach((node) => {
        if (
          node.className == "dayHeader" ||
          node.className == "dayHeader highlight"
        ) {
          return;
        } else {
          node.remove();
        }
      });
    });

    // console.log("Agenda cleared");
  };

  //Agenda display apointments --------------------------------------------------------------------------
  const displayApointments = async () => {
    //? Fix clearAgenda (works if called 3 times !?!?!?)
    clearAgenda();
    clearAgenda();
    clearAgenda();

    const mon = document.getElementById("mon");
    const tue = document.getElementById("tue");
    const wed = document.getElementById("wed");
    const thu = document.getElementById("thu");
    const fry = document.getElementById("fry");
    const sat = document.getElementById("sat");
    // const sun = document.getElementById("sun");

    // const weekDays = [mon, tue, wed, thu, fry, sat];

    const reverseDate = (weekDay) => {
      const [day, month, year] =
        weekDay.firstChild.childNodes[1].innerText.split("/");
      const date = `${year}-${month}-${day}`;
      return date;
    };

    const sortApointments = (dailyApointments) => {
      dailyApointments.sort((a, b) => (a.time > b.time ? 1 : -1));
    };

    //? Use forEach(weekDay)
    const monDate = reverseDate(mon);
    const tueDate = reverseDate(tue);
    const wedDate = reverseDate(wed);
    const thuDate = reverseDate(thu);
    const fryDate = reverseDate(fry);
    const satDate = reverseDate(sat);

    let monApointments = [];
    let tueApointments = [];
    let wedApointments = [];
    let thuApointments = [];
    let fryApointments = [];
    let satApointments = [];

    try {
      apointmentsList.forEach((apointment) => {
        switch (apointment.date) {
          case monDate:
            monApointments.push(apointment);
            break;
          case tueDate:
            tueApointments.push(apointment);
            break;
          case wedDate:
            wedApointments.push(apointment);
            break;
          case thuDate:
            thuApointments.push(apointment);
            break;
          case fryDate:
            fryApointments.push(apointment);
            break;
          case satDate:
            satApointments.push(apointment);
            break;
          default:
            return;
        }
      });

      //? Use forEach(weekDay)
      sortApointments(monApointments);
      sortApointments(tueApointments);
      sortApointments(wedApointments);
      sortApointments(thuApointments);
      sortApointments(fryApointments);
      sortApointments(satApointments);

      monApointments.forEach((apointment) => {
        mon.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      tueApointments.forEach((apointment) => {
        tue.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      wedApointments.forEach((apointment) => {
        wed.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      thuApointments.forEach((apointment) => {
        thu.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      fryApointments.forEach((apointment) => {
        fry.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      satApointments.forEach((apointment) => {
        sat.insertAdjacentHTML(
          "beforeend",
          `<div class="apointmentSmall">
              <div class="apointmentSmallInfo">
                ${apointment.time}
              </div>
              <div class="apointmentSmallInfo">
                ${apointment.patient}
              </div>
              <div class="apointmentSmallButton">
                <button> + </button>
              </div>
           </div>`
        );
      });
      // console.log("Display apointments executed");
    } catch (err) {
      console.log(err);
    }
  };

  //Agenda select patient -------------------------------------------------------------------------------
  const selectPatient = async (patient) => {
    const selectedPatient = `${patient.surname} ${patient.name}`;
    try {
      setPatientFullName(selectedPatient);
    } catch (err) {
      console.log(err);
    }
  };

  //App return ------------------------------------------------------------------------------------------
  return (
    <Routes>
      {/*Layout elements (nav, header, footer)*/}
      <Route path="/" element={<Layout />}>
        {/*Homepage elements*/}
        <Route
          index
          element={
            <>
              <PatientSearchbar search={search} setSearch={setSearch} />
              <AddressBook
                patients={patients}
                search={search}
                clearInputFields={clearInputFields}
                setCurrentWeek={setCurrentWeek}
              />
            </>
          }
        />
        {/*View patient card*/}
        <Route
          path="patientcard/:id"
          element={
            <div className="patientPageContainer">
              <PatientSearchbar search={search} setSearch={setSearch} />
              <div className="patientPage">
                <AddressBook
                  patients={patients}
                  search={search}
                  clearInputFields={clearInputFields}
                  setCurrentWeek={setCurrentWeek}
                />
                <PatientCard
                  patientPhone={patientPhone}
                  setPatientPhone={setPatientPhone}
                  editPhone={editPhone}
                  patientAddress={patientAddress}
                  setPatientAddress={setPatientAddress}
                  editAddress={editAddress}
                  patientFiscalcode={patientFiscalcode}
                  setPatientFiscalcode={setPatientFiscalcode}
                  editFiscalcode={editFiscalcode}
                  patientEmail={patientEmail}
                  setPatientEmail={setPatientEmail}
                  editEmail={editEmail}
                  patientNotes={patientNotes}
                  setPatientNotes={setPatientNotes}
                  showInputLabel={showInputLabel}
                  deletePatient={deletePatient}
                  deleteNote={deleteNote}
                  addNote={addNote}
                />
              </div>
            </div>
          }
        />
        {/*Create new patient route*/}
        <Route
          path="newpatient"
          element={
            <div className="patientPageContainer">
              <PatientSearchbar search={search} setSearch={setSearch} />
              <div className="patientPage">
                <AddressBook
                  patients={patients}
                  search={search}
                  clearInputFields={clearInputFields}
                  setCurrentWeek={setCurrentWeek}
                />
                <PatientCard
                  patientPhone={patientPhone}
                  setPatientPhone={setPatientPhone}
                  editPhone={editPhone}
                  patientAddress={patientAddress}
                  setPatientAddress={setPatientAddress}
                  editAddress={editAddress}
                  patientFiscalcode={patientFiscalcode}
                  setPatientFiscalcode={setPatientFiscalcode}
                  editFiscalcode={editFiscalcode}
                  patientEmail={patientEmail}
                  setPatientEmail={setPatientEmail}
                  editEmail={editEmail}
                  patientNotes={patientNotes}
                  setPatientNotes={setPatientNotes}
                  showInputLabel={showInputLabel}
                  deletePatient={deletePatient}
                  deleteNote={deleteNote}
                  addNote={addNote}
                />
              </div>
              <NewPatient
                patientSurname={patientSurname}
                setPatientSurname={setPatientSurname}
                patientName={patientName}
                setPatientName={setPatientName}
                patientBirthday={patientBirthday}
                setPatientBirthday={setPatientBirthday}
                patientGender={patientGender}
                setPatientGender={setPatientGender}
                patientFiscalcode={patientFiscalcode}
                setPatientFiscalcode={setPatientFiscalcode}
                setPatientAddress={setPatientAddress}
                patientPhone={patientPhone}
                setPatientPhone={setPatientPhone}
                patientEmail={patientEmail}
                setPatientEmail={setPatientEmail}
                patientNotes={patientNotes}
                setPatientNotes={setPatientNotes}
                addPatient={addPatient}
                clearInputFields={clearInputFields}
                openNewPatientModal={openNewPatientModal}
                closeNewPatientModal={closeNewPatientModal}
                navigate={navigate}
              />
            </div>
          }
        />
        {/*Agenda (week)*/}
        <Route
          path="agenda"
          element={
            <div>
              <NewApointment
                patientFullName={patientFullName}
                setPatientFullName={setPatientFullName}
                apointmentDate={apointmentDate}
                setApointmentDate={setApointmentDate}
                apointmentTime={apointmentTime}
                setApointmentTime={setApointmentTime}
                apointmentTypology={apointmentTypology}
                setApointmentTypology={setApointmentTypology}
                apointmentCost={apointmentCost}
                setApointmentCost={setApointmentCost}
                apointmentSettled={apointmentSettled}
                setApointmentSettled={setApointmentSettled}
                apointmentNote={apointmentNote}
                setApointmentNote={setApointmentNote}
                closeNewApointmentModal={closeNewApointmentModal}
                closeFindPatientModal={closeFindPatientModal}
                addApointment={addApointment}
                search={search}
                setSearch={setSearch}
                patients={patients}
                clearInputFields={clearInputFields}
                selectPatient={selectPatient}
                displayApointments={displayApointments}
              />
              <Agenda
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
                daySetter={daySetter}
                displayApointments={displayApointments}
                openNewApointmentModal={openNewApointmentModal}
                openFindPatientModal={openFindPatientModal}
                clearAgenda={clearAgenda}
                apointmentsList={apointmentsList}
              />
            </div>
          }
        />
        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
