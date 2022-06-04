import React, { useState, useEffect } from "react";
import Sidebar from "./core/sidebar";
import Navbar from "./core/adminNavbar";
import { Container } from "react-bootstrap";
import { API } from "./config";
import Footer from "./Footer/footer";
import { VictoryPie } from "victory-pie";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function Dashboard() {
  const [count, setCount] = useState([]);

  const loadGraph = async (req, res) => {
    await fetch(`${API}/admin/graph`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
      });
    console.log(count);
  };
  const document = count.document;
  const group = count.groups;
  const newGroup = count.newGroups;
  const research = count.research;
  const submission = count.submission;
  useEffect(() => {
    loadGraph();
  }, []);

  const data = {
    labels: [
      "Document",
      "All Groups",
      "New Groups",
      "Researches",
      "Submissions",
    ],
    datasets: [
      {
        label: "Research Stats",
        data: [document, group, newGroup, research, submission],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const myData = [
    { x: "Students", y: 900 },
    { x: "Panel Members", y: 400 },
    { x: "Supervisors", y: 300 },
  ];

  return (
    <div>
      {" "}
      <Navbar />
      dashboards
      <Container
        style={{ marginTop: "80px", marginRight: "40px", width: "80%" }}
      >
        {" "}
        <h2>Research Stats</h2>
        <div>
          <Bar
            data={data}
            width={30}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <br></br>
        <br></br>
        <h2>User Stats</h2>
        <center>
          <div style={{ width: "50%" }}>
            <VictoryPie
              data={myData}
              colorScale={["blue", "yellow", "red"]}
              radius={100}
            />
          </div>
        </center>
      </Container>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default Dashboard;
