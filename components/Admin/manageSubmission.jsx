import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";

function ManageSubmission() {
  const [submission, setSubmission] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subId, setSubId] = useState("");

  const loadSubmission = async () => {
    const response = await fetch(`${API}/get/submission`);
    const result = await response.json();
    setSubmission(result);
    console.log(submission);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/update/submission/${sId}`, {
        method: "PUT",
        body: JSON.stringify({
          deadline: deadline,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result) {
        await Swal.fire(
          "Submission",
          "Deadline Updated Successfully!",
          "success"
        );
        window.location.href = "/manage/submission";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSubmission();
  }, []);

  const destroy = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API}/delete/submission/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          //  if (window.confirm("Do u want to continue?")) {
          //    window.location.href = "/movieslist";
          //  }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.href = "/manage/submission";
        });
      }
    });
  };

  const content = submission
    .filter((data) => {
      if (
        searchUser === "" ||
        data.name.toLowerCase().includes(searchUser.toLowerCase())
      ) {
        return data;
      }
    })
    .map((sub) => (
      <div
        key={sub._id}
        style={{
          padding: "40px 40px 40px 40px",
        }}
      >
        <center style={{ backgroundColor: "gray", color: "white" }}>
          <h5>Submission : {sub.name}</h5>
        </center>
        <h4>{sub.desc}</h4>
        <div style={{ color: "white" }}>{(sId = sub._id ? sub._id : sub)}</div>
        <form onSubmit={handleSubmit}>
          <h5>Update Deadline</h5>
          <h6>Current Deadline : {sub.deadline}</h6>

          <h6>New Deadline</h6>
          <input
            type="datetime-local"
            class="form-control"
            onChange={(e) => setDeadline(e.target.value)}
          ></input>

          <br></br>
          <button className="btn btn-warning">Update</button>
        </form>
        <br></br>
        <button
          className="btn btn-danger"
          onClick={() => destroy(sId)}
          style={{ width: "80px" }}
        >
          Delete
        </button>
        <br></br>
      </div>
    ));

  return (
    <div>
      <Navbar></Navbar>
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        {" "}
        <div id="input-group-prepend" className="" style={{ width: "50%" }}>
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{}}
          ></span>
          <input
            className="form-control "
            type="search"
            placeholder="Search Submission by name"
            name="searchForm"
            onChange={(event) => {
              setSearchUser(event.target.value);
            }}
          />
        </div>
        {content}
      </Container>
      <Sidebar></Sidebar>
      <Footer />
    </div>
  );
}

export default ManageSubmission;
