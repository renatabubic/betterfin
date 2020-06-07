import React from "react";
import logo from "../logo.svg";
import "../App";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <img src={logo} className="footer-logo-icon" alt="logo" />
        <div id="footer-link-outter">
          <div id="footer-link-inner">
            <p>Home</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>718-416-9507</p>
          </div>
        </div>
        <div className="footer-spacer" />
      </div>
    </div>
  );
}

export default Footer;
