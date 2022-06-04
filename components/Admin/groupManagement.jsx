import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import Footer from "./Footer/footer";

export default function GroupManagement() {
  const [group, setGroup] = useState([]);
  const [panel, setPanel] = useState([]);
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [groupId, setGroupId] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const loadGroup = async () => {
    const response = await fetch(`${API}/student/get/group`);
    const data = await response.json();
    setGroup(data);
  };
  const loadPanel = async () => {
    const response = await fetch(`${API}/admin/get/panel`);
    const data = await response.json();
    setPanel(data);
    console.log(panel);
  };

  useEffect(() => {
    loadGroup();
    loadPanel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/student/update/group/${gId}`, {
        method: "PUT",
        body: JSON.stringify({
          panelMember1: member1,
          panelMember2: member2,
          panelMember3: member3,
          groupId: groupId,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result) {
        Swal.fire("Group", "Panel member Inserted Successfully!", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        fetch(`${API}/student/delete/group/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          //  if (window.confirm("Do u want to continue?")) {
          //    window.location.href = "/movieslist";
          //  }
          Swal.fire("Deleted!", "Group has been deleted.", "success");
          window.location.href = "/group/manage";
        });
      }
    });
  };
  const content = group
    .filter((data) => {
      if (
        searchUser === "" ||
        data.groupId.toLowerCase().includes(searchUser.toLowerCase())
      ) {
        return data;
      }
    })
    .map((group) => (
      <div
        key={group._id}
        style={{
          padding: "40px 40px 40px 40px",
          border: "1px solid",
          marginTop: "20px",
        }}
      >
        <h3>Group : {group.groupName}</h3>
        <hr></hr>
        <h4>Group Id : {group.groupId}</h4>
        <h5>Group Members : </h5>
        01. {group.student1}
        <br />
        02. {group.student2}
        <br />
        03. {group.student3}
        <br />
        04. {group.student4}
        <br />
        <div style={{ color: "white" }}>
          {(gId = group._id ? group._id : group)}
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="groupId"
            placeholder="Please enter Group Id for make changes"
            onChange={(e) => setGroupId(e.target.value)}
            class="form-control"
            style={{ width: "40%" }}
            pattern={`${group.groupId}`}
            title="Group Id Not Matched"
            required
          ></input>
          <br></br>
          <label className="form-label">
            <h4>Add Panel Members</h4>
          </label>
          <br></br>
          <select
            name="member1"
            value={panel.id}
            style={{ marginRight: "10px" }}
            onChange={(e) => setMember1(e.target.value)}
          >
            {" "}
            <option>Please select Panel Member 1</option>
            {panel &&
              panel.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
          </select>

          <select
            name="member2"
            value={panel.id}
            style={{ marginRight: "10px" }}
            onChange={(e) => setMember2(e.target.value)}
          >
            <option>Please select Panel Member 2</option>
            {panel &&
              panel.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
          </select>
          <select
            name="member3"
            value={panel.id}
            style={{ marginRight: "10px" }}
            onChange={(e) => setMember3(e.target.value)}
          >
            <option>Please select Panel Member 3</option>
            {panel &&
              panel.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
          </select>

          <br></br>
          <br></br>
          <button type="submit" class="btn btn-warning">
            Submit
          </button>
        </form>
        <br></br>
        <button
          className="btn btn-danger"
          onClick={() => destroy(gId)}
          style={{ width: "75px" }}
        >
          Delete
        </button>
      </div>
    ));

  return (
    <div>
      <Navbar />
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        <h2>GROUP MANAGEMENT</h2>
        <hr></hr>
        <div id="input-group-prepend" className="" style={{ width: "65%" }}>
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
        {content}
      </Container>
      <Sidebar />
      <Footer />
    </div>
  );
}
