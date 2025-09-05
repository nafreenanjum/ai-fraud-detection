import React from "react";
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      {message}
    </div>
  );
}
