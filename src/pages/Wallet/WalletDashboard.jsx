import React, { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function WalletDashboard() {
  const { balance, loading } = useContext(WalletContext);
  return (
    <div className="page">
      <div className="card">
        <h3>Wallet</h3>
        <p>Current Balance: {loading ? "..." : formatCurrency(balance)}</p>
      </div>
    </div>
  );
}
