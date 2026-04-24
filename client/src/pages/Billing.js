import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Billing() {
  const [bookings, setBookings] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selected, setSelected] = useState(null);

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

  useEffect(() => {
    const item = bookings.find((b) => b._id === selectedId);
    setSelected(item || null);
  }, [selectedId, bookings]);

  const printInvoice = () => {
    window.print();
  };

  const roomCharge = Number(selected?.totalAmount || 0);
  const gst = roomCharge * 0.18;
  const total = roomCharge + gst;

  return (
    <div>
      <h1 className="page-title no-print">Billing & Invoice</h1>

      <div className="card no-print">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select Booking</option>

          {bookings.map((item) => (
            <option key={item._id} value={item._id}>
              {item.guestName} - Room {item.roomId?.roomNumber}
            </option>
          ))}
        </select>
      </div>

      {!selected && (
        <div className="card" style={{ marginTop: "20px" }}>
          Select a booking to generate invoice.
        </div>
      )}

      {selected && (
        <div className="invoice-box" style={{ marginTop: "20px" }}>
          <h2>Enticing Stays</h2>
          <p>Luxury Hotel Management</p>

          <hr />

          <p>
            <b>Invoice No:</b> {selected.invoiceNumber || "N/A"}
          </p>

          <p>
            <b>Customer:</b> {selected.guestName}
          </p>

          <p>
            <b>Email:</b> {selected.email}
          </p>

          <p>
            <b>Phone:</b> {selected.phone || "N/A"}
          </p>

          <p>
            <b>Room Number:</b> {selected.roomId?.roomNumber}
          </p>

          <p>
            <b>Room Type:</b> {selected.roomId?.type}
          </p>

          <hr />

          <p>Room Charge: ₹{roomCharge.toFixed(2)}</p>
          <p>GST (18%): ₹{gst.toFixed(2)}</p>

          <h3>Total: ₹{total.toFixed(2)}</h3>

          <hr />

          <p>Thank you for choosing Enticing Stays.</p>

          <button className="no-print" onClick={printInvoice}>
            Print Invoice
          </button>
        </div>
      )}
    </div>
  );
}
