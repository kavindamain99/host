import React from "react";
import { NavLink } from "react-router-dom";
import "./mainNavBar.css";

function MainNavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul style={{ display: "flex", flexDirection: "row" }}>
            <li className="nav-item">
              <NavLink
                to="/panelmember/topics"
                className="nav-links"
                style={{ color: "white" }}
              >
                Topics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/panelmember/student/presentations"
                className="nav-links"
                style={{ color: "white" }}
              >
                Submissions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/panelmember/documents"
                className="nav-links"
                style={{ color: "white" }}
              >
                Documents
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/panelmember/signin"
                className="nav-links"
                style={{ color: "white" }}
              >
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default MainNavBar;
