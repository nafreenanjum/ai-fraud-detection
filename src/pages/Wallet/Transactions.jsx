import React, { useContext, useEffect } from "react";
import { WalletContext } from "../../context/WalletContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export default function Transactions() {
  const { transactions, refreshTransactions } = useContext(WalletContext);
  useEffect(() => { refreshTransactions(); }, []);

  return (
    <div className="page">
      <h3>Wallet Transactions</h3>
      <div className="card">
        {!transactions?.length ? <p>No transactions yet.</p> : (
          <table width="100%">
            <thead>
              <tr>
                <th align="left">Txn ID</th>
                <th align="left">Type</th>
                <th align="right">Amount</th>
                <th align="left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.txn_id}>
                  <td>{t.txn_id}</td>
                  <td>{t.type}</td>
                  <td align="right">{formatCurrency(t.amount)}</td>
                  <td>{formatDate(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
