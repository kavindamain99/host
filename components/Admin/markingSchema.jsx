import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";

export default function MarkingManagement() {
  const [fileDocument, setFileDocument] = useState({
    name: "",
    desc: "",
    studentAllowed: false,
    staffAllowed: false,
    docType: "",
    degree: "",
    document: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", fileDocument.name);
    formdata.append("desc", fileDocument.desc);
    formdata.append("studentAllowed", fileDocument.studentAllowed);
    formdata.append("staffAllowed", fileDocument.staffAllowed);
    formdata.append("degree", fileDocument.degree);
    formdata.append("document", fileDocument.document);

    await axios
      .post(`${API}/admin/document/insert/schema`, formdata)
      .then((res) => {
        Swal.fire("Marking Schema", "Schema Insert Successfully!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFileDocument({ ...fileDocument, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFileDocument({ ...fileDocument, document: e.target.files[0] });
    console.log(fileDocument);
  };

  return (
    <div>
      <Navbar />
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        <h2>Marking Schema</h2>
        <div style={{ marginLeft: "autp", marginRight: "0" }}>
          <Link to="/manage/document">
            <button class="btn btn-secondary">Manage Available Schema</button>
          </Link>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Submission Name:</label>
            <input
              type="text"
              className="form-control"
              id="text"
              name="name"
              value={fileDocument.name}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="desc">Description:</label>
            <textarea
              className="form-control"
              id="desc"
              name="desc"
              value={fileDocument.desc}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="check1"
              name="staffAllowed"
              value="true"
              onChange={handleChange}
            />
            <label class="form-check-label" for="check1">
              Staff Allowed
            </label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="check2"
              name="studentAllowed"
              value="true"
              onChange={handleChange}
            />
            <label class="form-check-label" for="check2">
              Student Allowed
            </label>
          </div>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            Engineering<label className="form-check-label"></label>
          </div>{" "}
          <br></br>
          <label className="form-check-label" htmlFor="file">
            Document :
          </label>{" "}
          <br></br>
          <input
            type="file"
            name="document"
            onChange={handleFile}
            required
          ></input>{" "}
          <br></br> <br></br>
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
