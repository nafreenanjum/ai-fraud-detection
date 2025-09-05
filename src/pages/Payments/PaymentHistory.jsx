import React, { useEffect, useState } from "react";
import { getPaymentHistory } from "../../services/paymentService";

export default function PaymentHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getPaymentHistory().then(({ data }) => setItems(data));
  }, []);

  return (
    <div className="page">
      <h3>Payment History</h3>
      <div className="card">
        {!items?.length ? <p>No payments yet.</p> : (
          <table width="100%">
            <thead>
              <tr>
                <th align="left">Txn ID</th>
                <th align="right">Amount</th>
                <th align="left">Status</th>
                <th align="left">Fraud Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.txn_id}>
                  <td>{t.txn_id}</td>
                  <td align="right">{t.amount}</td>
                  <td>{t.status}</td>
                  <td>{t.fraud_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
