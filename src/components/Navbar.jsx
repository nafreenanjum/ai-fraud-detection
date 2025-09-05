import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          AI Pay
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mainNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-semibold" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-semibold" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
