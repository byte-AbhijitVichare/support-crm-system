import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard({ refresh }) {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, [refresh]);

  const fetchTickets = async () => {

    try {

      const response = await API.get(
        "/api/tickets"
      );

      setTickets(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    t => t.status === "Open"
  ).length;

  const closedTickets = tickets.filter(
    t => t.status === "Closed"
  ).length;

  const progressTickets = tickets.filter(
    t => t.status === "In Progress"
  ).length;

  const highPriorityTickets = tickets.filter(
    t => t.priority === "High"
  ).length;

  const chartData = {
    labels: [
      "Open",
      "Closed",
      "In Progress"
    ],
    datasets: [
      {
        data: [
          openTickets,
          closedTickets,
          progressTickets
        ],
        backgroundColor: [
          "#dc3545",
          "#198754",
          "#ffc107"
        ]
      }
    ]
  };

  return (
    <div className="mt-5">

      <h2 className="text-center mb-4">
        Admin Dashboard
      </h2>

      <div className="row text-center g-3">

        <div className="col-6 col-md-2">
          <div className="card p-3 shadow-lg border-0">
            <h3>📩 {totalTickets}</h3>
            <p>Total Tickets</p>
          </div>
        </div>

        <div className="col-6 col-md-2">
          <div className="card p-3 shadow-lg border-0">
            <h3>🟢 {openTickets}</h3>
            <p>Open</p>
          </div>
        </div>

        <div className="col-6 col-md-2">
          <div className="card p-3 shadow-lg border-0">
            <h3>🔴 {closedTickets}</h3>
            <p>Closed</p>
          </div>
        </div>

        <div className="col-6 col-md-2">
          <div className="card p-3 shadow-lg border-0">
            <h3>🚨 {highPriorityTickets}</h3>
            <p>High Priority</p>
          </div>
        </div>

        <div className="col-6 col-md-2">
          <div className="card p-3 shadow-lg border-0">
            <h3>🟡 {progressTickets}</h3>
            <p>In Progress</p>
          </div>
        </div>

      </div>

      <div className="card shadow-lg border-0 p-4 mt-5">

        <h4 className="text-center mb-3">
          Ticket Status Distribution
        </h4>

        <div
          style={{
            maxWidth: "350px",
            width: "100%",
            margin: "auto"
          }}
        >
          <h5 className="text-center mb-3">
            Ticket Status Distribution
          </h5>
          <Pie data={chartData} />
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;