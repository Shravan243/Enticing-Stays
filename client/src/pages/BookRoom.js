import { useEffect, useState } from "react";
import api from "../utils/api";

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    roomId: "",
  });

  const loadRooms = async () => {
    try {
      const res = await api.get("/api/rooms");

      const availableRooms = res.data.filter(
        (room) => room.status === "Available",
      );

      setRooms(availableRooms);
    } catch (error) {
      alert("Failed to load rooms");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const selectedRoom = rooms.find((room) => room._id === form.roomId) || null;

  const handleBooking = async () => {
    if (!form.guestName || !form.email || !form.roomId) {
      return alert("Please fill all required fields");
    }

    try {
      setLoading(true);

      const payload = {
        guestName: form.guestName,
        email: form.email,
        phone: form.phone,
        roomId: form.roomId,
      };

      const res = await api.post("/api/bookings", payload);

      alert(res.data.message);

      setForm({
        guestName: "",
        email: "",
        phone: "",
        roomId: "",
      });

      loadRooms();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Book Room</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Guest Name"
          value={form.guestName}
          onChange={(e) => setForm({ ...form, guestName: e.target.value })}
        />

        <input
          type="email"
          placeholder="Guest Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          value={form.roomId}
          onChange={(e) => setForm({ ...form, roomId: e.target.value })}
        >
          <option value="">Select Room</option>

          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              Room {room.roomNumber} - {room.type}
            </option>
          ))}
        </select>

        {selectedRoom && (
          <div className="card mt-20">
            <h3>Selected Room</h3>
            <p>Room No: {selectedRoom.roomNumber}</p>
            <p>Type: {selectedRoom.type}</p>
            <p>Price: ₹{selectedRoom.price}</p>
          </div>
        )}

        <button onClick={handleBooking}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
