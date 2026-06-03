import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Support CRM
        </Link>

        <div>
          <Link
            className="btn btn-outline-light me-2"
            to="/"
          >
            Dashboard
          </Link>

          <Link
            className="btn btn-outline-light"
            to="/track"
          >
            Track Ticket
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;