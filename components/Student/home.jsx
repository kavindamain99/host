import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Navbar from "./header/navbar";
import Footer from "./Footer/footer";
import { Container, Carousel } from "react-bootstrap";
import { API } from "./config";
import axios from "axios";

export default function Home() {
  const stId = window.localStorage.getItem("user");
  const [topicSubmit, setTopicSubmit] = useState([]);
  const [group, setGroup] = useState([]);
  const [result, setResult] = useState([]);

  const loadTopic = async () => {
    const response = await fetch(`${API}/research/get/research/${stId}`);
    const topic = response.json().then((topic) => {
      setTopicSubmit(topic);
    });
    console.log(topicSubmit);
  };

  if (group.panelMember1 == "member") {
    group.panelMember1 = "Not Assigned";
  }
  if (group.panelMember2 == "member") {
    group.panelMember2 = "Not Assigned";
  }
  if (group.panelMember3 == "member") {
    group.panelMember3 = "Not Assigned";
  }

  const loadGroup = async () => {
    const response = await fetch(`${API}/student/get/group/home/${stId}`);
    const groupRT = response.json().then((groupRT) => {
      setGroup(groupRT);
    });
    console.log(group);
  };
  const groupIdResult = group.groupId;
  console.log(groupIdResult);

  const loadResult = async () => {
    const response = await fetch(`${API}/research/get/result/${groupIdResult}`);
    const groupST = response.json().then((groupST) => {
      setResult(groupST);
    });
    console.log(result);
  };

  useEffect(() => {
    loadGroup();

    loadResult();

    loadTopic();
  }, []);

  return (
    <div>
      {" "}
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Container>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require("./image/computing.jpg")}
                alt="First slide"
                style={{ width: "100%", height: "500px" }}
              />
              <Carousel.Caption style={{ color: "white", background: "black" }}>
                <h3>Computing Research</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require("./image/engineering.jpg")}
                alt="Second slide"
                style={{ width: "100%", height: "500px" }}
              />

              <Carousel.Caption style={{ color: "white", background: "black" }}>
                <h3>Engineering Research</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require("./image/buisness.jpg")}
                alt="Third slide"
                style={{ width: "100%", height: "500px" }}
              />

              <Carousel.Caption style={{ color: "white", background: "black" }}>
                <h3>Buisness Research</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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
                          Registered Group
                        </h2>
                        <h5>Group Name : {group.groupName}</h5>
                        <h5>Group Id : {group.groupId}</h5>
                        <h5>Student 1 : {group.student1}</h5>
                        <h5>Student 2 : {group.student2}</h5>
                        <h5>Student 3 : {group.student3}</h5>
                        <h5>Student 4 : {group.student4}</h5>

                        <h5>Panel 1 : {group.panelMember1}</h5>
                        <h5>Panel 2 : {group.panelMember2}</h5>
                        <h5>Panel 3 : {group.panelMember3}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-sm">
              <div className="container py-5 h-100 ">
                <div className="row align-items-center h-50">
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
                        <h5>Topic : {topicSubmit.topic}</h5>
                        <h5>TopicId : {topicSubmit.topicId}</h5>
                        <h5>Field : {topicSubmit.field}</h5>
                        <h5>State : {topicSubmit.state}</h5>
                        <h5>Evaluation : {topicSubmit.evaluation}</h5>
                        <h5>Supervisor : {topicSubmit.supervisorName}</h5>
                        <h5>Description : {topicSubmit.description}</h5>
                        <h5>created At : {topicSubmit.createdAt}</h5>
                        <h5>last evaluate : {topicSubmit.updatedAt}</h5>
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
