import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { API } from "./config";
import { Container, Table, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer/footer";

export default function UserManagement() {
  return (
    <div>
      <Navbar />

      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        <Row style={{ position: "fixed" }}>
          <h2>User Roles</h2>
          <hr />
          <Col>
            <Card style={{ width: "16rem" }}>
              <Card.Img variant="top" src={require("./core/admin.jpg")} />
              <Card.Body>
                <Card.Title>Students</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>{" "}
                <Link to="/user/student">
                  <Button variant="secondary">View List</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "16rem" }}>
              <Card.Img variant="top" src={require("./core/admin.jpg")} />
              <Card.Body>
                <Card.Title>Supervisors</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">View List </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "16rem" }}>
              <Card.Img variant="top" src={require("./core/admin.jpg")} />
              <Card.Body>
                <Card.Title>Co Supervisors</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="secondary">View List</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "16rem" }}>
              <Card.Img variant="top" src={require("./core/admin.jpg")} />
              <Card.Body>
                <Card.Title>Panel Members</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to="/user/panel">
                  <Button variant="secondary">View List</Button>
                </Link>{" "}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Sidebar />
      <Footer />
    </div>
  );
}
