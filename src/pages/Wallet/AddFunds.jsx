import React, { useState, useContext } from "react";
import { WalletContext } from "../../context/WalletContext";

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const { addMoney } = useContext(WalletContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const val = Number(amount);
    if (!val || val <= 0) return setMessage("Enter a valid amount");
    const res = await addMoney(val);
    setMessage(`Added successfully. New balance: ${res.balance}`);
    setAmount("");
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 420 }}>
        <h3>Add Funds</h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 12 }}>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
            <button type="submit">Add</button>
          </div>
        </form>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
}
