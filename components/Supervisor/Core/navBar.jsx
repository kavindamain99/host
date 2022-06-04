import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

function NavBar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <ul style={{ display: "flex", flexDirection: "row" }}>
                        <li className="nav-item">
                            <NavLink to="/supervisor/signin" className="nav-links" style={{ color: "white" }}>
                                Sign In
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/supervisor/signup" className="nav-links" style={{ color: "white" }}>
                                Sign up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;