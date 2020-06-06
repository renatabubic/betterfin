import React from "react";
import logo from "../logo.svg";
import "../App";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <img src={logo} className="logo-icon" alt="logo" />
        <div className="footer-link">
          <p>Home</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>718-416-9507</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
