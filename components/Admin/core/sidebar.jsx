import React, { useState } from "react";
require("./sidebar.css");

export default function Sidebar() {
  const [style, setStyle] = useState("sidebar");

  const changeStyle = () => {
    console.log("you just clicked");

    setStyle("sidebars");
  };
  return (
    <div className="sidebars">
      <div className="page-wrapper chiller-theme toggled">
        <a id="show-sidebar" className="btn btn-sm btn-dark" href="#"></a>
        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <a href="#">Research </a>
              <button onClick={changeStyle}></button>
              <div id="close-sidebar"></div>
            </div>
            <div className="sidebar-header">
              <div className="user-pic">
                <img
                  className="img-responsive img-rounded"
                  src={require("./admin.jpg")}
                  alt="User picture"
                />
              </div>
              <div className="user-info">
                <span className="user-name">
                  System
                  <strong> Admin</strong>
                </span>
                <span className="user-role">Administrator</span>
                <span className="user-status">
                  <span>Online</span>
                </span>
              </div>
            </div>
            <div className="sidebar-search">
              <div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-menu"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-menu">
              <ul>
                <li className="header-menu">
                  <span>General</span>
                </li>
                <li className="">
                  <a href="/dashboard">
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className="">
                  <a href="/user/management">
                    <span>User Management</span>
                  </a>
                </li>
                <li className="">
                  <a href="/group/manage">
                    <span>Group Management</span>
                  </a>
                </li>
                <li className="">
                  <a href="/manage/document">
                    <span>Document Management</span>
                  </a>
                </li>
                <li className="">
                  <a href="/manage/submission">
                    <span>Submission Management</span>
                  </a>
                </li>
                <li className="header-menu">
                  <span>New</span>
                </li>
                <li>
                  <a href="/document/insert">
                    <span>Document</span>
                  </a>
                </li>
                <li>
                  <a href="/student/submission">
                    <span>Submission </span>
                  </a>
                </li>
                <li>
                  <a href="/marking/insert">
                    <span>Marking Schemas</span>
                  </a>
                </li>
                <li>
                  <a href="/presentation/insert">
                    <span>Presentation Templates</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-footer">
            <a href="/admin">
              <span style={{ marginLeft: "-30px" }}>Sign Out</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
