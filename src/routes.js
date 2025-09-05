import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import WalletDashboard from "./pages/Wallet/WalletDashboard";
import AddFunds from "./pages/Wallet/AddFunds";
import Transactions from "./pages/Wallet/Transactions";

import MakePayment from "./pages/Payments/MakePayment";
import PaymentStatus from "./pages/Payments/PaymentStatus";
import PaymentHistory from "./pages/Payments/PaymentHistory";

import FraudScore from "./pages/Fraud/FraudScore";
import FraudLogs from "./pages/Fraud/FraudLogs";

import Merchants from "./pages/Admin/Merchants";
import Alerts from "./pages/Admin/Alerts";
import AdminDashboard from "./pages/Admin/Dashboard";

function ProtectedRoute({ allowedRoles }) {
  const { token, role } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function RoutesConfig() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute allowedRoles={["user", "merchant", "admin"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/wallet" element={<WalletDashboard />} />
          <Route path="/wallet/add" element={<AddFunds />} />
          <Route path="/wallet/transactions" element={<Transactions />} />

          <Route path="/pay" element={<MakePayment />} />
          <Route path="/payment/:txnId" element={<PaymentStatus />} />
          <Route path="/payments/history" element={<PaymentHistory />} />

          <Route path="/fraud/score" element={<FraudScore />} />
          <Route path="/fraud/logs" element={<FraudLogs />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/merchants" element={<Merchants />} />
          <Route path="/admin/alerts" element={<Alerts />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
