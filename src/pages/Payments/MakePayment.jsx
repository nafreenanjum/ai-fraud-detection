import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makePayment } from "../../services/paymentService";

export default function MakePayment() {
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("wallet");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await makePayment({ merchant_id: merchantId, amount: Number(amount), method });
      navigate(`/payment/${data.txn_id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 480 }}>
        <h3>Make Payment</h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 12 }}>
            <input value={merchantId} onChange={(e) => setMerchantId(e.target.value)} placeholder="Merchant ID" required />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="wallet">Wallet</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
            <button type="submit">Pay</button>
          </div>
        </form>
        {error && <p style={{ marginTop: 12, color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
