import React from "react";
import logo from "../logo.svg";
import "../App";

function Nav() {
  return (
    <div className="nav-bar">
      <img src={logo} className="logo-icon" alt="logo" />
    </div>
  );
}

export default Nav;
