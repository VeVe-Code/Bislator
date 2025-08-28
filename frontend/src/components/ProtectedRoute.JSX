// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function ProtectedRoutes({ children }) {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}