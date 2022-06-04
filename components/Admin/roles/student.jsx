import React, { useState, useEffect } from "react";
import Sidebar from "../core/sidebar";
import Navbar from "../core/adminNavbar";
import { API } from "../config";
import { Container, Table, Button } from "react-bootstrap";
import { withSwalInstance } from "sweetalert2-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Student() {
  //fetch movie theaters
  const [user, setUsers] = useState([]);

  const loadUser = async () => {
    const response = await fetch(`${API}/admin/getStudents`);
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    loadUser();
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
        fetch(`${API}/admin/delete/student/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          //  if (window.confirm("Do u want to continue?")) {
          //    window.location.href = "/movieslist";
          //  }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.href = "/user/student";
        });
      }
    });
  };

  const [searchUser, setSearchUser] = useState("");

  return (
    <div>
      <Navbar />

      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        <div id="input-group-prepend" className="" style={{ width: "50%" }}>
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{}}
          ></span>
          <input
            className="form-control "
            type="search"
            placeholder="Search Users By Id"
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
                <th>Student Name</th>

                <th>Student ID</th>
                <th>Email</th>
                <th>Contact Number</th>

                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user
                .filter((data) => {
                  if (
                    searchUser === "" ||
                    data.studentId
                      .toLowerCase()
                      .includes(searchUser.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((user) => (
                  <tr>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>

                    <td>{user.studentId}</td>
                    <td>{user.email}</td>
                    <td>{user.contactNum}</td>
                    <td>
                      <Link to={`/student/update/${user._id}`}>
                        <Button variant="warning">Update</Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => destroy(user._id)}
                      >
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
      <Sidebar />
    </div>
  );
}
