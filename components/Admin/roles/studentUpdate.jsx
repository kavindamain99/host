import React, { useState, useEffect } from "react";
import Sidebar from "../core/sidebar";
import Navbar from "../core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "../config";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

function StudentUpdate() {
  const [student, setStudent] = useState([]);

  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [email, setEmail] = useState(student.email);
  const [password, setPassword] = useState(student.password);
  const [cotactNum, setCotactNum] = useState(student.cotactNum);
  const [studentId, setStudentId] = useState(student.studentId);

  const param = useParams();
  const loadUser = async () => {
    const response = await fetch(`${API}/admin/getStudent/${param.id}`);
    const result = await response.json();
    setStudent(result);
    console.log(student);
  };

  useEffect(() => {
    loadUser();
  }, []);

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/admin/update/student/${param.id}`, {
        method: "Put",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contactNum: cotactNum,
          studentId: studentId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      if (resJson) {
        await Swal.fire("Update", "Student updated Successfully!", "success");
        window.location.href = "/user/student";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />{" "}
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        {" "}
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-md-6">
            <label htmlFor="first-name" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              defaultValue={student.firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <div className="invalid-feedback">Please provide a first name</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="last-name" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              required
              defaultValue={student.lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              defaultValue={student.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              defaultValue={student.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="contact-number" className="form-label">
              Contact number
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact-number"
              defaultValue={student.contactNum}
              onChange={(e) => {
                setCotactNum(e.target.value);
              }}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Student ID
            </label>
            <input
              type="text"
              className="form-control"
              id="studentId"
              defaultValue={student.studentId}
              required
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </Container>{" "}
      <Sidebar />
    </div>
  );
}

export default StudentUpdate;
