import React, { useState, useEffect } from "react";
import { getDocuments } from "./Auth/document";
import { GoSearch } from "react-icons/go";
import documentImage from "../uploads/Document-icon.jpg";
import markingImage from "../uploads/Marking.png";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";

const SupervisorDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [searchDocuments, setSearchDocuments] = useState("");

  const [error, setError] = useState(false);

  const loadDocuments = async () => {
    try {
      const adminDocuments = await getDocuments();
      if (adminDocuments.error) {
        if (adminDocuments.message) {
          setError(adminDocuments.message);
        } else {
          console.log(adminDocuments.error);
          setError(adminDocuments.error);
        }
      } else {
        setDocuments(adminDocuments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const createdDateTime = (document) => {
    if (document.createdAt) {
      const date = document.createdAt.substring(0, 10);
      const time = document.createdAt.substring(11, 19);
      return `on ${date} at ${time}`;
    }
    return;
  };

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

  const dynamicImage = (document) => {
    if (document.docType === "marking") {
      return (
        <div className="col-md-4">
          <img
            src={markingImage}
            className="img-thumbnail"
            width="200px"
            alt="Document"
          />
        </div>
      );
    }
    if (document.docType === "document") {
      return (
        <div className="col-md-4">
          <img
            src={documentImage}
            className="img-thumbnail"
            width="200px"
            alt="Document"
          />
        </div>
      );
    }
  };

  const viewDocuments = documents
    .filter((data) => {
      if (
        searchDocuments === "" ||
        data.name.toLowerCase().includes(searchDocuments.toLowerCase())
      ) {
        return data;
      }
    })
    .map((document) => (
      <div
        className="card col-md-5"
        key={document._id}
        style={{ marginLeft: "5%" }}
      >
        <div className="row">
          {dynamicImage(document)}
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{document.name}</h4>
              <h5 className="card-text">{document.docType}</h5>
              <p className="card-text">{document.desc}</p>
              <a
                href={document.document}
                className="btn btn-danger mt-2 mb-2"
                download
              >
                View Document
              </a>
              <p className="card-text">
                <small className="text-muted">
                  Uploaded {createdDateTime(document)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

  const searchTop = () =>
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
            placeholder="Search documents"
            name="searchForm"
            onChange={(event) => {
              setSearchDocuments(event.target.value);
            }}
          />
        </div>
        <div className="row">{viewDocuments}</div>
        {Footer()}
      </div>
    );

  return (
    <div>
      {showError()}
      {searchTop()}
    </div>
  );
};

export default SupervisorDocuments;
