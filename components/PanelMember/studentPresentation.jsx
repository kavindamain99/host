import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPresentation,
  getGroup,
  evaluate,
  updatePresentationState,
} from "./Auth/evaluation";
import Swal from "sweetalert2";
import MainNavBar from "../Supervisor/Core/mainNavBar";
import Footer from "./Core/footer";

const StudentPresentation = () => {
  const { id, groupId } = useParams();

  const [presentation, setPresentation] = useState({});
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
    const value = event.target.value;
    setMarks({ ...marks, [name]: value });
  };

  const loadPresentation = async () => {
    try {
      const presentation = await getPresentation(id);
      if (presentation.error) {
        if (presentation.message) {
          setError(presentation.message);
        } else {
          setError(presentation.error);
        }
      } else {
        setPresentation(presentation);
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
    loadPresentation();
    loadGroup();
  }, []);

  const evaluatePresentation = (event) => {
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
          evaluate(presentation.groupId, marks).then((evaluation) => {
            if (evaluation.error) {
              if (evaluation.message) {
                setError(message);
              } else {
                setError(evaluation.error);
              }
            } else {
              updatePresentationState(presentation._id)
                .then((data) => {
                  if (data.error) {
                    console.log(presentation._id);
                    if (data.message) {
                      setError(data.message);
                    } else {
                      setError(data.error);
                    }
                  } else {
                    Swal.fire("Submission succesfull", "success");
                    window.location.href = "/panelmember/student/presentations";
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markingForm = () => (
    <form onSubmit={evaluatePresentation}>
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

  const viewPresentation = () =>
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
                    <h4>{group.groupName}</h4>
                    <h5>{presentation.groupId}</h5>
                    <br />
                    <a href={presentation.document} download>
                      <h5>View presentation</h5>
                    </a>
                    <br />
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
      {viewPresentation()}
    </div>
  );
};

export default StudentPresentation;
