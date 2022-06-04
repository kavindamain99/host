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
                            <NavLink to="/supervisor/topics" className="nav-links" style={{ color: "white" }}>
                                Topics
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/supervisor/student/documents" className="nav-links" style={{ color: "white" }}>
                                Submissions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/supervisor/documents" className="nav-links" style={{ color: "white" }}>
                                Documents
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/supervisor/signin" className="nav-links" style={{ color: "white" }}>
                                Sign out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default MainNavBar;