import { React, useState } from "react";
import Footer from "./Footer/footer";

import Navbar from "./core/adminNavbar";
function Login(e) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();
    if (email == "admin@abc.com" && password == "1234") {
      window.location.href = "/dashboard";
    } else {
      alert("Please enter a valid email and password");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ marginBottom: "120px" }}>
        <div
          className="card border-dark col-sm-5"
          style={{ marginLeft: "30%", marginTop: "10%" }}
        >
          <h3 className="card-header" style={{ textAlign: "center" }}>
            Research Management
          </h3>
          <div className="card-body">
            <form onSubmit={loginAdmin}>
              <div className="form-row">
                <input
                  type="email"
                  className="form-control form-control-lg mt-4 mb-4"
                  placeholder="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  className="form-control form-control-lg mb-4"
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <button type="submit" className="btn btn-dark btn-lg btn-block">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}

export default Login;
