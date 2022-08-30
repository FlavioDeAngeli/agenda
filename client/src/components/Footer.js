import React from "react";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">
      <p>Copiright &copy; Flavio De Angeli - {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
