import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-body container" style={{ display: "flex", gap: 24 }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
