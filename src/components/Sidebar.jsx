import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <h3>Menu</h3>
        <nav className="side-links">
          <Link to="/wallet">Wallet</Link>
          <Link to="/pay">Make Payment</Link>
          <Link to="/payments/history">Payment History</Link>
          <Link to="/fraud/score">Fraud Score</Link>
          <Link to="/fraud/logs">Fraud Logs</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </nav>
      </div>
    </aside>
  );
}
