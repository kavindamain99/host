import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul>
            <li className="nav-item">
              <NavLink to="/" className="nav-links" style={{ color: "white" }}>
                ADMIN DASHBOARD
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
