import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const loadBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data);
    } catch (error) {
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?",
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/api/bookings/${id}`);

      alert(res.data.message);

      loadBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredBookings = bookings.filter((item) => {
    const guest = item.guestName?.toLowerCase() || "";
    const email = item.email?.toLowerCase() || "";
    const room = String(item.roomId?.roomNumber || "");
    const query = search.toLowerCase();

    return (
      guest.includes(query) || email.includes(query) || room.includes(search)
    );
  });

  return (
    <div>
      <h1 className="page-title">Bookings</h1>

      <input
        className="search-box"
        placeholder="Search by guest / email / room"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="booking-list">
        {filteredBookings.length === 0 && (
          <div className="card">No bookings found.</div>
        )}

        {filteredBookings.map((item) => (
          <div className="booking-card" key={item._id}>
            <div className="booking-info">
              <h3>{item.guestName}</h3>

              <span>{item.email}</span>

              <span>{item.phone || "No phone"}</span>

              <span>Room: {item.roomId?.roomNumber || "N/A"}</span>

              <span>Type: {item.roomId?.type || "N/A"}</span>

              <span>₹{item.totalAmount}</span>

              <span>Invoice: {item.invoiceNumber || "N/A"}</span>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                className={`status ${item.status?.toLowerCase() || "booked"}`}
              >
                {item.status || "Booked"}
              </div>

              <br />

              <button
                style={{ marginTop: "12px" }}
                onClick={() => deleteBooking(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
