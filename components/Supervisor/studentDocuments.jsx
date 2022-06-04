import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDocuments } from "./Auth/evaluation";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";
import "./styles.css";

export const StudentDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [finalTheses, setFinalTheses] = useState([]);

  const [error, setError] = useState(false);

  const loadDocuments = async (type) => {
    try {
      const studentDocuments = await getDocuments(type);
      if (studentDocuments.error) {
        if (studentDocuments.message) {
          setError(studentDocuments.message);
        } else {
          setError(studentDocuments.error);
        }
      } else {
        if (type === "document") {
          setDocuments(studentDocuments);
        }
        if (type === "final") {
          setFinalTheses(studentDocuments);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocuments("document");
    loadDocuments("final");
  }, []);

  const createdDateTime = (topic) => {
    if (topic.createdAt) {
      const date = topic.createdAt.substring(0, 10);
      const time = topic.createdAt.substring(11, 19);
      return `on ${date} at ${time}`;
    }
    return;
  };

  const viewDocuments = () =>
    !error && (
      <div>
        {MainNavBar()}
        <br></br>
        <br></br>
        <br></br>

        <div
          className="row mt-4"
          style={{ marginLeft: "16%", marginRight: "16%" }}
        >
          <div className="col" style={{ "overflow-y": "hidden" }}>
            <span className="badge bg-primary col-md-10">
              <h4>Documents</h4>
            </span>
            <span className="badge bg-dark col-sm-1">
              <h4>{documents.length}</h4>
            </span>
            {documents.map((document) => (
              <div
                className="card shadow col-md-11 pl-4 mt-1 mb-1"
                key={document.id}
                style={{ marginLeft: "10%" }}
              >
                <div className="class-body">
                  <h5>{document.groupId}</h5>
                  <p>{document.type}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Submitted {createdDateTime(document)}
                    </small>
                  </p>
                  <Link
                    to={`/supervisor/student/document/${document._id}/${document.groupId}`}
                  >
                    <button className="btn btn-block btn-danger">
                      View Document
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="col" style={{ "overflow-y": "hidden" }}>
            <div className="gr-2">
              <span className="badge bg-success col-md-10">
                <h4>Final Theses</h4>
              </span>
              <span className="badge bg-dark col-sm-1">
                <h4>{finalTheses.length}</h4>
              </span>
            </div>
            {finalTheses.map((finalThesis) => (
              <div
                className="card col-md-11 shadow p-2 mt-1 mb-1"
                key={finalThesis.id}
              >
                <h5>{finalThesis.groupId}</h5>
                <p>{finalThesis.type}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Submitted {createdDateTime(finalThesis)}
                  </small>
                </p>
                <Link
                  to={`/supervisor/student/document/${finalThesis._id}/${finalThesis.groupId}`}
                >
                  <button className="btn btn-block btn-danger">
                    View Thesis
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
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
      {showError()}
      {viewDocuments()}
    </div>
  );
};

export default StudentDocuments;
