import React, { useEffect } from "react";

const Agenda = ({
  currentWeek,
  setCurrentWeek,
  daySetter,
  displayApointments,
  apointmentsList,
  openNewApointmentModal,
  openFindPatientModal,
}) => {
  useEffect(() => {
    daySetter();
    displayApointments();
  }, [currentWeek, apointmentsList]); //update displayed apointments on week or new apointment change

  return (
    <div className="weekContainer">
      <div className="weekControl">
        <button onClick={() => setCurrentWeek(currentWeek - 7)}>
          previous week
        </button>
        <button onClick={() => setCurrentWeek(0)}>this week</button>
        <button onClick={() => setCurrentWeek(currentWeek + 7)}>
          next week
        </button>
      </div>
      <div className="week">
        <div className="day" id="mon" data-weekday="1">
          <div className="dayHeader">
            <div className="day-name">Monday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day" id="tue" data-weekday="2">
          <div className="dayHeader">
            <div className="day-name">Tuesday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day" id="wed" data-weekday="3">
          <div className="dayHeader">
            <div className="day-name">Wednesday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day" id="thu" data-weekday="4">
          <div className="dayHeader">
            <div className="day-name">Thursday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day" id="fry" data-weekday="5">
          <div className="dayHeader">
            <div className="day-name">Fryday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day" id="sat" data-weekday="6">
          <div className="dayHeader">
            <div className="day-name">Saturday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="day invisible" id="sun" data-weekday="0">
          <div className="dayHeader">
            <div className="day-name">Sunday</div>
            <div className="weekDate"> - dd/mm/yyyy - </div>
            <button
              className="addApointmentBtn"
              onClick={(e) => {
                openNewApointmentModal(e.target.previousSibling.innerText);
                openFindPatientModal();
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
