import React, { useEffect, useState } from "react";
import { getAlerts } from "../../services/adminService";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlerts()
      .then(({ data }) => setAlerts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><div className="card">Loading alerts...</div></div>;

  return (
    <div className="page">
      <div className="card">
        <h3>Fraud Alerts</h3>
        {alerts.length === 0 ? (
          <p>No alerts found</p>
        ) : (
          <ul>
            {alerts.map((a) => (
              <li key={a.id} style={{ marginBottom: "8px" }}>
                <strong style={{ color: a.severity === "HIGH" ? "red" : a.severity === "MEDIUM" ? "orange" : "green" }}>
                  [{a.severity}]
                </strong>{" "}
                {a.message} – {new Date(a.date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

