import React, { useState } from "react";
import Navbar from "./core/navbar";
import { API } from "./config";
import Footer from "./Footer/footer";

export default function SignIn() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          studentId: studentId,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      if (resJson.msg) {
        alert("password or email invalid");
      } else {
        window.localStorage.setItem("studentToken", resJson.token);
        window.localStorage.setItem("user", studentId);

        window.location.href = "/home";
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
                    Student Sign In
                  </h2>
                  <form
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={handleSignUp}
                  >
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Student Id
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        onChange={(e) => {
                          setStudentId(e.target.value);
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

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Sign In
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
