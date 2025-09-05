import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><div className="card">Loading dashboard...</div></div>;

  return (
    <div className="page">
      <div className="card">
        <h3>Admin Dashboard</h3>
        <ul>
          <li>Total Merchants: {stats.totalMerchants}</li>
          <li>Active Merchants: {stats.activeMerchants}</li>
          <li>Fraud Alerts: {stats.fraudAlerts}</li>
        </ul>
      </div>
    </div>
  );
}
