import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} AI Pay. All rights reserved.</small>
      </div>
    </footer>
  );
}
