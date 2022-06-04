import React, { useState, useEffect } from "react";
import { getTopics } from "./Auth/topics";
import { Link } from "react-router-dom";
import "./styles.css";
import MainNavBar from "./Core/mainNavBar";
import Footer from "./Core/footer";

export const PanelMemberTopics = () => {
  const [pendingTopics, setPendingTopics] = useState([]);
  const [evaluatedTopics, setEvaluatedTopics] = useState([]);

  const [error, setError] = useState(false);

  const loadTopics = async (state) => {
    try {
      const topics = await getTopics(state);
      if (topics.error) {
        if (topics.message) {
          setError(topics.message);
        } else {
          setError(topics.error);
        }
      } else {
        if (state === true) {
          setEvaluatedTopics(topics);
        }
        if (state === false) {
          setPendingTopics(topics);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTopics(true);
    loadTopics(false);
  }, []);

  const createdDateTime = (topic) => {
    if (topic.createdAt) {
      const date = topic.createdAt.substring(0, 10);
      const time = topic.createdAt.substring(11, 19);
      return `on ${date} at ${time}`;
    }
    return;
  };

  const updatedDateTime = (topic) => {
    if (topic.updatedAt) {
      const date = topic.updatedAt.substring(0, 10);
      const time = topic.updatedAt.substring(11, 19);
      return `on ${date} at ${time}`;
    }
    return;
  };

  const viewTopics = () =>
    !error && (
      <div>
        {" "}
        <MainNavBar />
        <br></br> <br></br> <br></br>
        <div
          className="row mt-4"
          style={{ marginLeft: "12%", marginRight: "12%" }}
        >
          <div className="col" style={{ "overflow-y": "hidden" }}>
            <span className="badge bg-primary col-md-11">
              <h4>Pending</h4>
            </span>
            <span className="badge bg-dark col-sm-1">
              <h4>{pendingTopics.length}</h4>
            </span>
            {pendingTopics.map((topic) => (
              <div className="card shadow p-2 mt-1 mb-1" key={topic.id}>
                <h4 className="card-title">{topic.topic}</h4>
                <div className="card-text l3-ellipsis">{topic.description}</div>
                <br />
                <small className="text-muted">
                  Submitted {createdDateTime(topic)}
                </small>
                <small className="text-muted">
                  Accepted {updatedDateTime(topic)}
                </small>
                <Link to={`/panelmember/topic/${topic.topicId}`}>
                  <button className="btn btn-secondary mt-2 mb-2 ml-2">
                    Evaluate
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className="col" style={{ "overflow-y": "hidden" }}>
            <div className="gr-2">
              <span className="badge bg-success col-md-11">
                <h4>Evaluated</h4>
              </span>
              <span className="badge bg-dark col-sm-1">
                <h4>{evaluatedTopics.length}</h4>
              </span>
            </div>
            {evaluatedTopics.map((topic) => (
              <div className="card shadow p-2 mt-1 mb-1" key={topic.id}>
                <h4 className="card-title">{topic.topic}</h4>
                <div className="card-text l3-ellipsis">{topic.description}</div>
                <br />
                <small className="text-muted">
                  Submitted {createdDateTime(topic)}
                </small>
                <small className="text-muted">
                  Evaluated {updatedDateTime(topic)}
                </small>
                <Link to={`/panelmember/reviewtopic/${topic.topicId}`}>
                  <button className="btn btn-secondary mt-2 mb-2 ml-2">
                    Review
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {Footer()}
      </div>
    );

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

  return (
    <div>
      {showError()}
      {viewTopics()}
    </div>
  );
};

export default PanelMemberTopics;
