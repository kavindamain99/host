import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import Footer from "./Footer/footer";

export default function SubmissionManagement() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [degree, setDegree] = useState("");
  const [message, setMessage] = useState("");

  handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/insert/submission`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          desc: desc,
          type: type,
          deadline: deadline,
          degree: degree,
        }),
        headers: { "Content-type": "application/json" },
      });

      const resJson = await res.json();

      if (resJson.msg) {
        Swal.fire(`${resJson.msg}`);
      } else {
        <SpinnerCircular />;
        Swal.fire("Submission", "Submission Insert Successfully!", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        <h2>Submissions</h2>
        <div style={{ marginLeft: "autp", marginRight: "0" }}>
          <Link to="/manage/submission">
            <button class="btn btn-secondary">
              Manage Available Submissions
            </button>
          </Link>
        </div>
        <br></br>
        <div>
          <h3>Add New Submission</h3>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmission}>
          <div className="form-group">
            <label htmlFor="name">Submission Name:</label>
            <input
              type="text"
              className="form-control"
              id="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <textarea
              className="form-control"
              id="desc"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <br></br>
          <label className="form-check-label" htmlFor="radio1">
            Submission Type:
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio3"
              name="type"
              value="pdf"
              onChange={(e) => setType(e.target.value)}
            />
            .Pdf<label class="form-check-label"></label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="type"
              value="ppt"
              onChange={(e) => setType(e.target.value)}
            />
            .ppt
            <label className="form-check-label" htmlFor="radio1"></label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio2"
              name="type"
              value="docx"
              onChange={(e) => setType(e.target.value)}
            />
            .Docx<label class="form-check-label" htmlFor="radio2"></label>
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="datetime-local"
              class="form-control"
              id="deadline"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>{" "}
          <br></br>
          <label className="form-check-label" htmlFor="degree">
            Degree
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio3"
              name="degree"
              value="computing"
              onChange={(e) => setDegree(e.target.value)}
            />
            Computing<label className="form-check-label"></label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio3"
              name="degree"
              value="buisness"
              onChange={(e) => setDegree(e.target.value)}
            />
            Buisness<label className="form-check-label"></label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="radio3"
              name="degree"
              value="engineering"
              onChange={(e) => setDegree(e.target.value)}
            />
            Engineering<label className="form-check-label"></label>
          </div>{" "}
          <br></br>
          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </form>
      </Container>{" "}
      <Sidebar />
      <Footer />
    </div>
  );
}
