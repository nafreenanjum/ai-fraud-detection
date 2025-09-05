import React, { useEffect, useState } from "react";
import { getFraudLogs } from "../../services/fraudService";

export default function FraudLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFraudLogs()
      .then(({ data }) => setLogs(data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Error fetching fraud logs")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="page">
        <div className="card">Loading fraud logs...</div>
      </div>
    );

  if (error)
    return (
      <div className="page">
        <div className="card" style={{ color: "red" }}>{error}</div>
      </div>
    );

  return (
    <div className="page">
      <div className="card" style={{ overflowX: "auto" }}>
        <h3>Fraud Logs</h3>
        {logs.length === 0 ? (
          <p>No fraud logs found.</p>
        ) : (
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead style={{ background: "#f2f2f2" }}>
              <tr>
                <th>Txn ID</th>
                <th>Score</th>
                <th>Risk</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.txn_id}</td>
                  <td>{log.score}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color:
                        log.risk === "HIGH"
                          ? "red"
                          : log.risk === "MEDIUM"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {log.risk}
                  </td>
                  <td>{new Date(log.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
