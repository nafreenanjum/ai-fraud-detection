import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState(null);
  const { signup } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(email, password, role);
      setMessage(res?.msg || "Account created");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h3>Signup</h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 12 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="merchant">Merchant</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Create account</button>
          </div>
        </form>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
}
