import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import BookRoom from "./pages/BookRoom";
import Bookings from "./pages/Bookings";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";

import Layout from "./components/Layout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Panel */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="book-room" element={<BookRoom />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
