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
              <NavLink to="/" className="nav-links" style={{ color: "white" }}>
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-links"
                style={{ color: "white" }}
              >
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
