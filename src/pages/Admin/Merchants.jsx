import React, { useEffect, useState } from "react";
import { getMerchants } from "../../services/adminService";

export default function Merchants() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMerchants()
      .then(({ data }) => setMerchants(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><div className="card">Loading merchants...</div></div>;

  return (
    <div className="page">
      <div className="card">
        <h3>Merchants</h3>
        {merchants.length === 0 ? (
          <p>No merchants found</p>
        ) : (
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td style={{ color: m.active ? "green" : "red" }}>
                    {m.active ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

