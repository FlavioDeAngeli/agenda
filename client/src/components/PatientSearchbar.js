import React from "react";
// import { Link } from "react-router-dom";

const PatientSearchbar = ({ search, setSearch }) => {
  return (
    <div className="PatientSearchbar">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          role="searchbox"
          placeholder="Search Patients ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default PatientSearchbar;
