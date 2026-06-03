import { useState } from "react";
import API from "../services/api";

function CreateTicket({ onTicketCreated }) {

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    priority: "Medium"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitTicket = async (e) => {

    e.preventDefault();

    if (
      !form.customer_name ||
      !form.customer_email ||
      !form.subject ||
      !form.description
    ) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/api/tickets", form);
    onTicketCreated();
    alert("Ticket Created");

    setForm({
      customer_name: "",
      customer_email: "",
      subject: "",
      description: "",
      priority: "Medium"
    });
  };

  return (
    <div className="card shadow p-4 mt-4">

      <h2 className="text-center mb-4">
        Create Ticket
      </h2>

      <form onSubmit={submitTicket}>

        <input
          className="form-control mb-2"
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="customer_email"
          placeholder="Customer Email"
          value={form.customer_email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        
        <select
          className="form-select mb-2"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          className="btn btn-primary w-100"
          type="submit"
        >
          Create Ticket
        </button>

      </form>

    </div>
  );
}

export default CreateTicket;