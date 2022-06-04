import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Navbar from "./header/navbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";

export default function ResearchMaterial() {
  const [document, setDocument] = useState([]);
  const [presentation, setPresentation] = useState([]);
  const stId = window.localStorage.getItem("user");

  const loadDocument = async () => {
    const response = await fetch(`${API}/admin/document/get`);
    const data = await response.json();
    setDocument(data);
    console.log(data);
  };

  useEffect(() => {
    loadDocument();
  }, []);

  const content = document.map((sub) => (
    <div key={sub._id}>
      <hr></hr>
      <center style={{ backgroundColor: "gray", color: "white" }}>
        <h5> {sub.name}</h5>
      </center>
      <h6>Details : {sub.desc}</h6>
      <a
        href={`${sub.document}`}
        style={{
          border: "1px solid gray",
          backgroundColor: "grey",
          color: "white",
        }}
      >
        Download
      </a>
    </div>
  ));

  return (
    <div>
      {" "}
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Container>
          <h1>Document and Presentation Templates</h1>
          {content}
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}
