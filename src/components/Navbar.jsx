import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">AI Pay</Link>
        <div className="links">
          {token && <Link to="/wallet">Wallet</Link>}
          {token && <Link to="/pay">Pay</Link>}
          {token && <Link to="/payments/history">History</Link>}
          {token && <Link to="/fraud/score">Fraud</Link>}
          {role === "admin" && <Link to="/admin">Admin</Link>}
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={{ marginLeft: 12 }}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

