import React, { createContext, useEffect, useMemo, useState } from "react";
import { loginUser, signupUser, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role") || "user");
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    if (userId) localStorage.setItem("user_id", userId);
    else localStorage.removeItem("user_id");
  }, [userId]);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    setToken(data.token);
    setRole(data.role || "user");
    if (data.user_id) setUserId(data.user_id); // optional
    return data;
  };

  const signup = async (email, password, roleInput = "user") => {
    const { data } = await signupUser({ email, password, role: roleInput });
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.warn("Mock logout error (safe to ignore)", e);
    }
    setToken(null);
    setRole("user");
    setUserId(null);
  };

  // ✅ Removed refresh since not available
  const value = useMemo(
    () => ({ token, role, userId, login, signup, logout, setUserId }),
    [token, role, userId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
