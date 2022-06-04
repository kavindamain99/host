import React, { useState, useEffect } from "react";
import { getDocuments } from "./Auth/documents";
import { GoSearch } from "react-icons/go";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";
import icon from "../uploads/Document-icon-2.png";

const PanelMemberDocuments = () => {
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
      <div className="card col-md-6" key={document._id}>
        <div className="row">
          <div className="col-md-4">
            <img
              src={icon}
              className="img-thumbnail"
              width="200px"
              alt="Document"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{document.name}</h5>
              <p className="card-text">{document.docType}</p>
              <p className="card-text">{document.desc}</p>
              <a
                href={document.document}
                className="btn btn-danger m-2"
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

export default PanelMemberDocuments;
