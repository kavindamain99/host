import React, { useState } from "react";
import Navbar from "./core/navbar";
import { API } from "./config";
import Footer from "./Footer/footer";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cotactNum, setCotactNum] = useState("");
  const [studentId, setStudentId] = useState("");
  const [degree, setDegree] = useState("");

  handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contactNum: cotactNum,
          studentId: studentId,
          degree: degree,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      if (resJson) {
        Swal.fire(
          "Registration",
          "Student Registered Successfully!",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h2
                    className="mb-4 pb-2 pb-md-0 mb-md-5"
                    style={{ textAlign: "center" }}
                  >
                    Student Sign Up
                  </h2>
                  <form
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={handleSignUp}
                  >
                    <div className="col-md-6">
                      <label htmlFor="first-name" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="first-name"
                        required
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <div className="invalid-feedback">
                        Please provide a first name
                      </div>
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
                        required
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
                        required
                        onChange={(e) => {
                          setStudentId(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-md-6">
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
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
