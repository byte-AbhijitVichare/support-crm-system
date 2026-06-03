import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function TrackTicket() {

  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);

  const searchTicket = async () => {

    try {

      const response = await API.get(
        `/api/tickets/${ticketId}`
      );

      setTicket(response.data);

    } catch (error) {

      alert("Ticket not found");

      console.error(error);

    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center">
        Track Your Ticket
      </h2>

      <div className="card p-4 mt-4">

        <input
          className="form-control"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) =>
            setTicketId(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={searchTicket}
        >
          Search
        </button>

      </div>

      {ticket && (

        <div className="card p-4 mt-4">

          <h4>{ticket.ticket_id}</h4>

          <p>
            <strong>Customer:</strong>
            {" "}
            {ticket.customer_name}
          </p>

          <p>
            <strong>Status:</strong>{" "}

            {ticket.status === "Open" && (
              <span className="badge bg-danger">
                Open
              </span>
            )}

            {ticket.status === "Closed" && (
              <span className="badge bg-success">
                Closed
              </span>
            )}

            {ticket.status === "In Progress" && (
              <span className="badge bg-warning text-dark">
                In Progress
              </span>
            )}
          </p>

          <p>
            <strong>Priority:</strong>
            {" "}
            {ticket.priority}
          </p>

          <p>
            <strong>Assigned To:</strong>
            {" "}
            {ticket.assigned_to}
          </p>

          <p>
            <strong>Notes:</strong>
            {" "}
            {ticket.notes || "No notes"}
          </p>

          <p>
            <strong>Created:</strong>
            {" "}
            {new Date(
              ticket.created_at
            ).toLocaleString()}
          </p>

          <p>
            <strong>Last Updated:</strong>
            {" "}
            {new Date(ticket.updated_at).toLocaleString()}
          </p>

          <Link
            to="/"
            className="btn btn-secondary mt-3"
          >
            Back to Dashboard
          </Link>
        </div>

      )}

    </div>
  );
}

export default TrackTicket;