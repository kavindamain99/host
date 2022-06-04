import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul style={{ display: "flex", flexDirection: "row" }}>
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-links"
                style={{ color: "white" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/group/registration"
                className="nav-links"
                style={{ color: "white" }}
              >
                Research Group
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/topic/registration"
                lassName="nav-links"
                style={{ color: "white" }}
              >
                Topic Registration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/submission"
                lassName="nav-links"
                style={{ color: "white" }}
              >
                Submission
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/material"
                lassName="nav-links"
                style={{ color: "white" }}
              >
                Material
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" lassName="nav-links" style={{ color: "white" }}>
                Sign Out
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
