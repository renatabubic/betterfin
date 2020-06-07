import React from "react";
import logo from "../logo.svg";
import "../App";

function Nav(props) {
  const firstName = props.state.firstName[0];
  const lastName = props.state.lastName;
  return (
    <div className="nav-bar">
      <img src={logo} className="logo-icon" alt="logo" />
      <div className="nav-profile">
        <p>
          Welcome, {firstName}. {lastName}
        </p>
        <p id="profile-a"> Profile</p>
      </div>
    </div>
  );
}

export default Nav;
