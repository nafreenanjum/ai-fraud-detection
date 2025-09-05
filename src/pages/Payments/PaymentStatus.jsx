import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentStatus } from "../../services/paymentService"; // ✅ fixed import

export default function PaymentStatus() {
  const { txnId } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getPaymentStatus(txnId) // ✅ use correct function
      .then(({ data }) => mounted && setInfo(data))
      .catch((err) =>
        mounted && setError(err?.response?.data?.message || "Error fetching txn")
      )
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [txnId]);

  if (loading)
    return (
      <div className="page">
        <div className="card">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="page">
        <div className="card">{error}</div>
      </div>
    );

  return (
    <div className="page">
      <div className="card">
        <h3>Payment Status</h3>
        <pre>{JSON.stringify(info, null, 2)}</pre>
      </div>
    </div>
  );
}
