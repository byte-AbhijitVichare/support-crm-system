import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";

function TicketDetail() {

  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {

    try {

      const response = await API.get(
        `/api/tickets/${ticketId}`
      );

      console.log(response.data);

      setTicket(response.data);
      setStatus(response.data.status);
      setNotes(response.data.notes || "");
      setAssignedTo(response.data.assigned_to || "");

    } catch (error) {

      console.error(error);

    }
  };
    const updateStatus = async () => {
      try {

        await API.put(
         `/api/tickets/${ticketId}`,
         {
            status: status,
            notes: notes,
            assigned_to: assignedTo
         }
       );

        await fetchTicket();

        alert("Status Updated");


      } catch (error) {
        console.error(error);
      }
    };
  
    if (!ticket) {
      return <h3>Loading...</h3>;
    }


  return (
    <div className="container mt-4">

      <h2>Ticket Details</h2>

      <div className="card p-3">

        <h4>{ticket.ticket_id}</h4>

        <p>
          <strong>Customer:</strong>
          {" "}
          {ticket.customer_name}
        </p>

        <p>
          <strong>Email:</strong>
          {" "}
          {ticket.customer_email}
        </p>

        <p>
          <strong>Subject:</strong>
          {" "}
          {ticket.subject}
        </p>

        <p>
          <strong>Description:</strong>
          {" "}
          {ticket.description}
        </p>

        <div className="alert alert-secondary mt-3">
          <strong>Notes:</strong>
          <br />
          {ticket.notes || "No notes added yet"}
        </div>

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
          <strong>Assigned To:</strong>
          {" "}
          {ticket.assigned_to}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {ticket.priority}
        </p>
        
        <p>
          <strong>Created:</strong>
          {" "}
          {new Date(ticket.created_at).toLocaleString()}
        </p>

        <p>
          <strong>Updated:</strong>
          {" "}
          {new Date(ticket.updated_at).toLocaleString()}
        </p>

        <textarea
          className="form-control mt-3"
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes..."
        />

        <select
          className="form-select mt-3"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Agent</option>
          <option value="Agent A">Agent A</option>
          <option value="Agent B">Agent B</option>
          <option value="Agent C">Agent C</option>
        </select>

        <select
          className="form-select mt-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <button
          className="btn btn-primary mt-3"
          onClick={updateStatus}
        >
          Update Status
        </button>

        <Link
          to="/"
          className="btn btn-secondary mt-3 ms-2"
        >
          Back
        </Link>
      </div>

    </div>
  );
}

export default TicketDetail;