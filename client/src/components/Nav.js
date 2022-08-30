import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="Nav">
      <h2>Navbar</h2>
      <div className="navbarLinks">
        <Link to={"/agenda"}>Agenda</Link>
        <Link to={"/"}>Address Book </Link>
      </div>
    </nav>
  );
};

export default Nav;
