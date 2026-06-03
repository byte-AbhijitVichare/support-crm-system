import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
  fetchTickets();
}, [refresh]);

  const deleteTicket = async (ticketId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    await API.delete(
      `/api/tickets/${ticketId}`
    );

    fetchTickets();

  } catch (error) {

    console.error(error);

  }
};
  const fetchTickets = async () => {
    try {
      const response = await API.get("/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const searchMatch =
      ticket.ticket_id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" ||
      ticket.status === statusFilter;
      
    return searchMatch && statusMatch;
  });

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="text-center mb-4">
        All Tickets
      </h2>
      <input
      className="form-control mb-3"
      placeholder="Search by Ticket ID, Customer or Subject"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="form-select mb-3"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
       <option value="All">All</option>
       <option value="Open">Open</option>
       <option value="Closed">Closed</option>
       <option value="In Progress">In Progress</option>
      </select>
      
      <button
        className="btn btn-success mb-3 float-end"
        onClick={() => {
          window.open(
            "https://support-crm-system-mzed.onrender.com/api/export"
          );
        }}
      >
        Export CSV
      </button>

      <div className="table-responsive">

        <table className="table table-hover table-bordered align-middle">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
              
            </tr>
          </thead>

          <tbody>

            {filteredTickets.length === 0 ? (

              <tr>
                <td colSpan="6" className="text-center">
                  No tickets found
                </td>
              </tr>

            ) : (

              filteredTickets.map((ticket) => (
                <tr key={ticket.id}>

                  <td>
                    <Link to={`/ticket/${ticket.ticket_id}`}>
                      {ticket.ticket_id}
                    </Link>
                  </td>
    
                  <td>{ticket.customer_name}</td>

                  <td>{ticket.subject}</td>

                  <td>
                    {new Date(
                      ticket.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {ticket.priority === "High" && (
                      <span className="badge bg-danger">
                        High
                      </span>
                    )}

                    {ticket.priority === "Medium" && (
                      <span className="badge bg-warning text-dark">
                        Medium
                      </span>
                    )}

                    {ticket.priority === "Low" && (
                      <span className="badge bg-success">
                        Low
                      </span>
                    )}
                  </td>

                  <td>
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
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteTicket(ticket.ticket_id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;
