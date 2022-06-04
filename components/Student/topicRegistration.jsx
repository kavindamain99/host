import React from "react";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Navbar from "./header/navbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Footer from "./Footer/footer";

function TopicRegistration() {
  const [groupId, setGroupId] = useState("");
  const [topic, setTopic] = useState("");
  const [researchField, setResearchField] = useState("");
  const [description, setDescription] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [cosupervisor, setCosupervisor] = useState("");
  const stId = window.localStorage.getItem("user");

  const [topicSubmit, setTopicSubmit] = useState([]);

  const loadTopic = async () => {
    const response = await fetch(`${API}/research/get/research/${stId}`);
    const topic = response.json().then((topic) => {
      setTopicSubmit(topic);
    });
  };

  useEffect(() => {
    loadTopic();
  }, []);

  handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/research/insert/research`, {
        method: "POST",
        body: JSON.stringify({
          groupId: groupId,
          topic: topic,
          field: researchField,
          studentId: stId,
          description: description,
          supervisor: supervisor,
          cosupervisor: cosupervisor,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (result) {
        Swal.fire(
          "Topic Registration",
          "Topic Registered Successfully!",
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
      <div style={{ marginTop: "80px" }}>
        <Container>
          <div className="row">
            <section className="col-sm">
              <div className="container py-5 h-100">
                <div className="row align-items-center h-100">
                  <div className="">
                    <div
                      className="card shadow-2-strong card-registration"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card p-4 -bodyp-md-5">
                        <h2
                          className="mb-4 pb-2 pb-md-0 mb-md-5"
                          style={{ textAlign: "center" }}
                        >
                          Research Topic Registration
                        </h2>
                        <form
                          className="row g-3 needs-validation"
                          onSubmit={handleRegistration}
                        >
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">
                              Group Id
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="groupId"
                              required
                              placeholder="Name for your project group"
                              onChange={(e) => setGroupId(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">
                              Topic
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="topic"
                              required
                              placeholder="Research topic"
                              onChange={(e) => setTopic(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">
                              Description
                            </label>
                            <textarea
                              type="text"
                              className="form-control"
                              name="description"
                              required
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">
                              Research Field
                            </label>
                            <br></br>
                            {/* <input
                            type="text"
                            className="form-control"
                            name="researchField"
                            required
                            placeholder="field"
                            onChange={(e) => setResearchField(e.target.value)}
                          /> */}

                            <select
                              name="researchfield"
                              onChange={(e) => setResearchField(e.target.value)}
                            >
                              <option value="IOT">Select A Field</option>
                              <option value="IOT">IOT</option>
                              <option value="Machine Learning">
                                Machine Learning
                              </option>
                              <option value="Computational biology">
                                Computational biology
                              </option>
                              <option value="Data Mining">Data Mining</option>
                              <option value="HCI">
                                HCI(Human computer interaction)
                              </option>

                              <option value="Economics">Economics</option>
                              <option value="Commerce">Commerce</option>

                              <option value="Materials and Structures">
                                Materials and Structures
                              </option>
                              <option value="Aerodynamics">Aerodynamics</option>
                              <option value=" Energy Systems">
                                Energy Systems
                              </option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="email"
                              className="form-label"
                              style={{ paddingRight: "10px" }}
                            >
                              Supervisor Request
                            </label>
                            <input
                              type="CheckBox"
                              name="supervisor"
                              value="true"
                              onChange={(e) => setSupervisor(e.target.value)}
                            />
                          </div>
                          <div className="col-12">
                            <label
                              htmlFor="email"
                              className="form-label"
                              style={{ paddingRight: "10px" }}
                            >
                              Co Supervisor Request
                            </label>
                            <input
                              type="checkbox"
                              name="cosupervisor"
                              value="true"
                              onChange={(e) => setCosupervisor(e.target.value)}
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
            <section className="col-sm">
              <div className="container py-5 ">
                <div className="row align-items-center h-100">
                  <div className="">
                    <div
                      className="card shadow-2-strong card-registration"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card p-4 -bodyp-md-5">
                        <h2
                          className="mb-4 pb-2 pb-md-0 mb-md-5"
                          style={{ textAlign: "center" }}
                        >
                          Registered Topic
                        </h2>
                        <h5>Topic: {topicSubmit.topic}</h5>
                        <h5>State: {topicSubmit.state}</h5>
                        <h5>Status: {topicSubmit.evaluation}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default TopicRegistration;
