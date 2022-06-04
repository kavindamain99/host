import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container, Table, Button } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";

function ManageDocument() {
  const [submission, setSubmission] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [deadline, setDeadline] = useState("");
  const [subId, setSubId] = useState("");
  const [user, setUser] = useState("");

  const loadSubmission = async () => {
    const response = await fetch(`${API}/admin/document/get/all`);
    const result = await response.json();
    setSubmission(result);
    console.log(submission);
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
        fetch(`${API}/admin/document/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          //  if (window.confirm("Do u want to continue?")) {
          //    window.location.href = "/movieslist";
          //  }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.href = "/manage/document";
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
      ></div>
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
            placeholder="Search Document by name"
            name="searchForm"
            onChange={(event) => {
              setSearchUser(event.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "50px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Document Name</th>

                <th>Document Type</th>
                <th>Degree</th>

                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submission
                .filter((data) => {
                  if (
                    searchUser === "" ||
                    data.name.toLowerCase().includes(searchUser.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((doc) => (
                  <tr>
                    <td>{doc.name}</td>

                    <td>{doc.docType}</td>
                    <td>{doc.degree}</td>
                    <td>
                      <Button variant="warning">
                        <a
                          href={`${doc.document}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          Download
                        </a>
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => destroy(doc._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          ;
        </div>
      </Container>
      <Sidebar></Sidebar>
      <Footer />
    </div>
  );
}

export default ManageDocument;
