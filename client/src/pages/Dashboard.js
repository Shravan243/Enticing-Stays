import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    totalUsers: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  const loadDashboard = async () => {
    try {
      const statsRes = await api.get("/api/dashboard/stats");
      const bookingRes = await api.get("/api/bookings");

      setStats(statsRes.data);
      setRecentBookings(bookingRes.data.slice(0, 5));
    } catch (err) {
      console.log(err);
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const occupancy =
    stats.totalRooms === 0
      ? 0
      : Math.round((stats.occupiedRooms / stats.totalRooms) * 100);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="grid-3">
        <div className="card">
          <h3>Total Rooms</h3>
          <h2>{stats.totalRooms}</h2>
        </div>

        <div className="card">
          <h3>Available Rooms</h3>
          <h2>{stats.availableRooms}</h2>
        </div>

        <div className="card">
          <h3>Occupied Rooms</h3>
          <h2>{stats.occupiedRooms}</h2>
        </div>

        <div className="card">
          <h3>Total Bookings</h3>
          <h2>{stats.totalBookings}</h2>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.revenue}</h2>
        </div>
      </div>

      <div className="card mt">
        <h3>Occupancy Rate</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${occupancy}%` }}
          ></div>
        </div>

        <p>{occupancy}% Occupied</p>
      </div>

      <div className="card mt">
        <h3>Recent Bookings</h3>

        {recentBookings.length === 0 && <p>No bookings found</p>}

        {recentBookings.map((item) => (
          <div key={item._id} className="booking-row">
            <strong>{item.guestName}</strong> | Room{" "}
            {item.roomId?.roomNumber || "-"} | ₹{item.totalAmount}
          </div>
        ))}
      </div>
    </div>
  );
}
