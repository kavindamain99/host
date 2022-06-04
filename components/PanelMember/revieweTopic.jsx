import React, { useState, useEffect } from "react";
import { getTopic, evaluateTopic } from "./Auth/topics";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";

export const PanelMemberReviewTopic = () => {
  const { id } = useParams();

  const [topic, setTopic] = useState({});
  const [evaluation, setEvaluation] = useState({});
  const [error, setError] = useState(false);

  const loadTopic = async () => {
    try {
      const topic = await getTopic(id);
      if (topic.error) {
        if (topic.message) {
          setError(topic.message);
        } else {
          setError(topic.error);
        }
      } else {
        setTopic(topic);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTopic();
  }, []);

  const showError = () =>
    error && (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ height: "40px", "line-height": "40px", padding: "0px 15px" }}
      >
        {error}
      </div>
    );

  const viewTopic = () =>
    !error && (
      <div>
        {MainNavBar()}
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-lg card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 style={{ textAlign: "center" }}>{topic.topic}</h3>
                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <h5>Group ID</h5>
                        <p>{topic.groupId}</p>
                        <h5>Field</h5>
                        <p>{topic.field}</p>
                      </div>
                      <div className="col-sm-3">
                        <h5>Accepted By,</h5>
                        <p>{topic.supervisorName}</p>
                        <p>{topic.supervisorId}</p>
                        <p>{topic.role}</p>
                      </div>
                      <div className="col-sm-3">
                        <h5>Evaluated By,</h5>
                        <p>{topic.panelMemberName}</p>
                        <p>{topic.panelMemberId}</p>
                      </div>
                      <h5>Description</h5>
                      <p>{topic.description}</p>
                      <h5>Evaluate</h5>
                      <p>{topic.evaluation}</p>
                    </div>
                    <Link to={`/panelmember/topic/${topic.topicId}`}>
                      <button className="btn btn-secondary d-grid gap-2">
                        Review
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {Footer()}
      </div>
    );

  return (
    <div>
      {showError()}
      {viewTopic()}
    </div>
  );
};

export default PanelMemberReviewTopic;
