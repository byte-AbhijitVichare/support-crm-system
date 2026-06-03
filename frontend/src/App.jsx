import { BrowserRouter, Routes, Route }
from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";
import TrackTicket from "./pages/TrackTicket";
import Navbar from "./components/Navbar";

import { useState } from "react";

function App() {

  const [refresh, setRefresh] = useState(false);

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <div
              className="container-fluid px-5"
              style={{ maxWidth: "1400px" }}
            >

              <h1 className="text-center mt-4 mb-4">
                Support CRM Dashboard
              </h1>

              <CreateTicket
                onTicketCreated={() =>
                  setRefresh(!refresh)
                }
              />

              <Dashboard refresh={refresh} />

              <AdminDashboard refresh={refresh} />

            </div>
          }
        />

        <Route
          path="/ticket/:ticketId"
          element={<TicketDetail />}
        />

        <Route
          path="/track"
          element={<TrackTicket />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;