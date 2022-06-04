import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { getPresentations } from "./Auth/evaluation";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";

const StudentPresentations = () => {
  const [presentations, setPresentations] = useState([]);
  const [searchPresentations, setSearchPresentations] = useState("");

  const [error, setError] = useState(false);

  const loadPresentations = async () => {
    try {
      const presentations = await getPresentations();
      if (presentations.error) {
        setError(presentations.error);
      } else {
        setPresentations(presentations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPresentations();
  }, []);

  const createdDateTime = (document) => {
    if (document.createdAt) {
      const date = document.createdAt.substring(0, 10);
      const time = document.createdAt.substring(11, 19);
      return `on ${date} at ${time}`;
    }
    return;
  };

  const viewPresentations = presentations
    .filter((data) => {
      if (
        searchPresentations === "" ||
        data.name.toLowerCase().includes(searchPresentations.toLowerCase())
      ) {
        return data;
      }
    })
    .map((presentation) => (
      <div className="card col-md-4" key={presentation._id}>
        <div className="card-body">
          <h5>{presentation.groupId}</h5>
          <p>{presentation.type}</p>
          <p className="card-text">
            <small className="text-muted">
              Uploaded {createdDateTime(presentation)}
            </small>
          </p>
          <Link
            to={`/panelmember/student/presentation/${presentation._id}/${presentation.groupId}`}
          >
            <button className="btn btn-block btn-danger">View</button>
          </Link>
        </div>
      </div>
    ));

  const searchUp = () =>
    !error && (
      <div>
        {MainNavBar()}
        <br></br>
        <br></br>
        <br></br>

        <div id="input-group-prepend" className="row mt-3 mb-3">
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{ width: "40px", marginLeft: "33.3%" }}
          >
            <GoSearch />
          </span>
          <input
            className="form-control col-sm-3"
            type="search"
            style={{ width: "400px" }}
            placeholder="Search presentations"
            name="searchForm"
            onChange={(event) => {
              setSearchPresentations(event.target.value);
            }}
          />
        </div>
        <div className="row">{viewPresentations}</div>
        {Footer()}
      </div>
    );

  const showError = () =>
    error && (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ height: "40px", "line-height": "40px", padding: "0px 15px" }}
      >
        {error}
      </div>
    );

  return (
    <div>
      {searchUp()}
      {showError()}
    </div>
  );
};

export default StudentPresentations;
