import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Navbar from "./header/navbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import axios from "axios";
import Footer from "./Footer/footer";

export default function Submission() {
  const [submission, setSubmission] = useState([]);
  const stId = window.localStorage.getItem("user");
  const d = new Date();
  const dateTimeLocalValue = d.setMinutes(
    d.getMinutes() - d.getTimezoneOffset()
  );

  console.log(dateTimeLocalValue);

  const [fileSubmission, setFileSubmission] = useState({
    studentId: stId,
    groupId: "",
    topicId: "",
    submitTime: d,
    document: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("studentId", fileSubmission.studentId);
    formData.append("groupId", fileSubmission.groupId);
    formData.append("topicId", fileSubmission.topicId);
    formData.append("submitTime", fileSubmission.submitTime);
    formData.append("document", fileSubmission.document);
    formData.append("type", fileSubmission.type);
    await axios
      .post(`${API}/admin/document/student/insert/submission`, formData)
      .then((res) => {
        Swal.fire("Submission", "Document Submit Successfully!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFileSubmission({ ...fileSubmission, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFileSubmission({ ...fileSubmission, document: e.target.files[0] });
    console.log(fileDocument);
  };

  const loadSubmission = async () => {
    const response = await fetch(`${API}/get/submission`);
    const data = await response.json();
    setSubmission(data);
    console.log(submission);
  };

  useEffect(() => {
    loadSubmission();
  }, []);

  const content = submission.map((sub) => (
    <div key={sub._id}>
      <hr></hr>
      <center style={{ backgroundColor: "gray", color: "white" }}>
        <h5>Submission : {sub.name}</h5>
      </center>
      <h6>Details : {sub.desc}</h6>
      <h6>Upload Type : {sub.type}</h6>
      <h6>Deadline : {sub.deadline}</h6>
      {sub.deadline < dateTimeLocalValue && "Submission Overdue"}
      <h5>Upload Here</h5>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="groupId"
          class="form-control"
          placeholder="Group Id"
          style={{ width: "30%" }}
          value={fileSubmission.groupId}
          onChange={handleChange}
        ></input>
        <br></br>{" "}
        <label className="form-check-label" htmlFor="degree">
          Submission Type
        </label>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio3"
            name="type"
            value="document"
            onChange={handleChange}
          />
          Document<label className="form-check-label"></label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio3"
            name="type"
            value="presentation"
            onChange={handleChange}
          />
          Presentation<label className="form-check-label"></label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio3"
            name="type"
            value="final"
            onChange={handleChange}
          />
          Final Thesis<label className="form-check-label"></label>
        </div>
        <br></br>
        <input type="file" name="document" onChange={handleFile}></input>
        <br></br>
        <br></br>
        <button type="submit" class="btn btn-secondary">
          Submit
        </button>
        <div style={{ color: "white" }}>
          {(fileSubmission.topicId = sub._id)}
        </div>
      </form>
      <hr></hr>
    </div>
  ));

  return (
    <div>
      {" "}
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Container>{content}</Container>
      </div>
      <Footer></Footer>
    </div>
  );
}
