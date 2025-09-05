import React, { useState } from "react";
import { getFraudScore } from "../../services/fraudService"; // ✅ fixed import

export default function FraudScore() {
  const [userId, setUserId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState("");
  const [ip, setIp] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getFraudScore({
        user_id: userId,
        merchant_id: merchantId,
        amount: Number(amount),
        device_info: deviceInfo,
        ip,
      });
      setResult(data);
    } catch (err) {
      setResult({ error: err?.response?.data?.message || "Error fetching fraud score" });
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 520 }}>
        <h3>Fraud Score</h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              required
            />
            <input
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="Merchant ID"
              required
            />
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              type="number"
              required
            />
            <input
              value={deviceInfo}
              onChange={(e) => setDeviceInfo(e.target.value)}
              placeholder="Device Info"
            />
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="IP"
            />
            <button type="submit">Get Score</button>
          </div>
        </form>

        {result && (
          <div style={{ marginTop: 16 }}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
