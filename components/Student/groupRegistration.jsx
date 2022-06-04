import { React, useState } from "react";
import Navbar from "./header/navbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
const ShortUniqueId = require("short-unique-id");
import Swal from "sweetalert2";
import Footer from "./Footer/footer";

export default function GroupRegistration() {
  const uid = new ShortUniqueId({
    dictionary: "number",
  });

  const [groupName, setGroupName] = useState("");
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const [student3, setStudent3] = useState("");
  const [student4, setStudent4] = useState("");
  id = "RG" + uid(4);
  handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/student/insert/group`, {
        method: "POST",
        body: JSON.stringify({
          groupName: groupName,
          groupId: id,
          student1: student1,
          student2: student2,
          student3: student3,
          student4: student4,
        }),
        headers: { "Content-Type": "application/json" },
        authorization: window.localStorage.getItem("studentToken"),
      });

      const result = await res.json();

      if (result.code == 11000) {
        Swal.fire("Student ID Number Already registered in another group");
      } else {
        console.log(result);
        Swal.fire(
          "Group Registration",
          "Group Registered Successfully!",
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
      <div style={{ marginTop: "40px" }}>
        <Container>
          <section>
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
                        Student Group Registration
                      </h2>
                      <form
                        className="row g-3 needs-validation"
                        onSubmit={handleRegistration}
                      >
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Group Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            placeholder="Name for your project group"
                            onChange={(e) => setGroupName(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Leader Id
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="student1"
                            required
                            placeholder="Student ID"
                            onChange={(e) => setStudent1(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Member 2 Id
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="student2"
                            required
                            placeholder="Student ID"
                            onChange={(e) => setStudent2(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Member 3 Id
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="student3"
                            required
                            placeholder="Student ID"
                            onChange={(e) => setStudent3(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Member 4 Id
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="student 4"
                            required
                            placeholder="Student ID"
                            onChange={(e) => setStudent4(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}
