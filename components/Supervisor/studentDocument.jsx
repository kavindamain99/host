import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDocument,
  getGroup,
  evaluateDocument,
  evaluateFinalThesis,
  updateDocumentState,
} from "./Auth/evaluation";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";
import Swal from "sweetalert2";

export const StudentDocument = () => {
  const { id, groupId } = useParams();

  const [studentDocument, setStudentDocument] = useState({});
  const [group, setGroup] = useState({});

  const [marks, setMarks] = useState({
    student1: "",
    student2: "",
    student3: "",
    student4: "",
  });

  const { student1, student2, student3, student4 } = marks;

  const [error, setError] = useState(false);

  const handleChange = (name) => (event) => {
    event.preventDefault();
    const value = event.target.value;
    setMarks({ ...marks, [name]: value });
  };

  const loadDocument = async () => {
    try {
      const document = await getDocument(id);
      if (document.error) {
        if (document.message) {
          setError(document.message);
        } else {
          setError(document.error);
        }
      } else {
        setStudentDocument(document);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadGroup = async () => {
    try {
      const group = await getGroup(groupId);
      if (group.error) {
        if (group.message) {
          setError(group.message);
        } else {
          setError(group.error);
        }
      } else {
        setGroup(group);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocument();
    loadGroup();
  }, []);

  const evaluateStudentDocument = (event) => {
    setError(false);
    event.preventDefault();
    Swal.fire({
      title: "Confirm evaluation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evaluate",
      confirmButtonColor: "#df4759",
    })
      .then((result) => {
        if (result.isConfirmed) {
          if (studentDocument.type === "document") {
            evaluateDocument(groupId, marks)
              .then((data) => {
                if (data.error) {
                  if (data.message) {
                    setError(data.message);
                  } else {
                    setError(data.error);
                  }
                } else {
                  updateDocumentState(studentDocument._id)
                    .then((data) => {
                      if (data.error) {
                        console.log(error);
                        if (data.message) {
                          setError(data.message);
                        } else {
                          setError(data.error);
                        }
                      } else {
                        Swal.fire("Submission succesfull", "success");
                        window.location.href = "/supervisor/student/documents";
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          if (studentDocument.type === "final") {
            evaluateFinalThesis(groupId, marks)
              .then((data) => {
                if (data.error) {
                  if (data.message) {
                    setError(data.message);
                  } else {
                    setError(data.error);
                  }
                } else {
                  updateDocumentState(studentDocument._id)
                    .then((data) => {
                      if (data.error) {
                        console.log(error);
                        if (data.message) {
                          setError(data.message);
                        } else {
                          setError(data.error);
                        }
                      } else {
                        Swal.fire("Submission succesfull", "success");
                        window.location.href = "/supervisor/student/documents";
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const type = () => {
    if (studentDocument.type === "final") {
      return "Final Thesis";
    }
    if (studentDocument.type === "document") {
      return "Document";
    }
  };

  const markingForm = () => (
    <form onSubmit={evaluateStudentDocument}>
      <div className="col-12">
        <label htmlFor="student1" className="form-label">
          Student1 - {group.student1}
        </label>
        <input
          type="number"
          className="form-control"
          id="student1"
          onChange={handleChange("student1")}
          value={student1}
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="student1" className="form-label">
          Student2 - {group.student2}
        </label>
        <input
          type="number"
          className="form-control"
          id="student2"
          onChange={handleChange("student2")}
          value={student2}
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="student3" className="form-label">
          Student3 - {group.student3}
        </label>
        <input
          type="number"
          className="form-control"
          id="student3"
          onChange={handleChange("student3")}
          value={student3}
          required
        />
      </div>
      <div className="col-12">
        <label htmlFor="student4" className="form-label">
          Student4 - {group.student4}
        </label>
        <input
          type="number"
          className="form-control"
          id="student4"
          onChange={handleChange("student4")}
          value={student4}
          required
        />
      </div>
      <br />
      <button className="btn btn-danger" type="submit">
        Submit
      </button>
    </form>
  );

  const viewDocument = () =>
    !error && (
      <div className="row">
        {MainNavBar()}
        <br></br>
        <br></br>
        <br></br>

        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-lg card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 style={{ textAlign: "center" }}>{type()}</h3>
                    <h5>Group name - {group.groupName}</h5>
                    <h5 className="mb-2">
                      Group ID - {studentDocument.groupId}
                    </h5>
                    <a
                      className="mb-2"
                      href={studentDocument.document}
                      download
                    >
                      <h5>View document</h5>
                    </a>
                    {markingForm()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      {viewDocument()}
    </div>
  );
};

export default StudentDocument;
