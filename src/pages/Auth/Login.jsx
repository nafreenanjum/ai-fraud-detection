import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/wallet");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 12 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
            <button disabled={loading} type="submit">{loading ? "Logging in..." : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
