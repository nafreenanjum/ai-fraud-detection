import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-0 py-3 shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="brand-mark me-2">
            <i className="bi bi-shield-lock-fill text-white fs-5" aria-hidden="true"></i>
          </span>
          <span className="brand-text">Secure Pay</span>
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
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                <i className="bi bi-house-door me-2" aria-hidden="true"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
              >
                <i className="bi bi-person-circle me-2" aria-hidden="true"></i>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}
              >
                <i className="bi bi-pencil-square me-2" aria-hidden="true"></i>
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
