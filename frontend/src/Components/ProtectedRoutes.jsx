// src/Components/ProtectedRoutes.jsx
import { Navigate, Outlet } from "react-router-dom"; // Import Outlet
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute() { // children prop is not needed
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />; // Use Outlet
}