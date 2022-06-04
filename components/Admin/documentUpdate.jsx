import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { axios } from "axios";
import Footer from "./Footer/footer";

function DocumentUpdate() {
  const [document, setDocument] = useState([]);

  const param = useParams();
  const loadDocument = async () => {
    const response = await fetch(`${API}/admin/document/get/${param.id}`);
    const result = await response.json();
    setDocument(result);
    console.log(document);
  };

  useEffect(() => {
    loadDocument();
  }, []);

  return (
    <div>
      <Navbar />{" "}
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      ></Container>{" "}
      <Sidebar />
      <Footer />
    </div>
  );
}

export default DocumentUpdate;
