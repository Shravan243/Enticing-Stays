import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadRooms = async () => {
    try {
      const res = await api.get("/api/rooms");
      setRooms(res.data);
    } catch (error) {
      alert("Failed to load rooms");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const resetForm = () => {
    setForm({
      roomNumber: "",
      type: "",
      price: "",
    });
    setEditId(null);
  };

  const submitRoom = async () => {
    if (!form.roomNumber || !form.type || !form.price) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      let res;

      if (editId) {
        res = await api.put(`/api/rooms/${editId}`, form);
      } else {
        res = await api.post("/api/rooms", form);
      }

      alert(res.data.message);

      resetForm();
      loadRooms();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const editRoom = (room) => {
    setForm({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
    });

    setEditId(room._id);
  };

  const deleteRoom = async (id) => {
    const confirmDelete = window.confirm("Delete this room?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/api/rooms/${id}`);
      alert(res.data.message);
      loadRooms();
    } catch {
      alert("Delete failed");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const query = search.toLowerCase();

    return (
      String(room.roomNumber).includes(query) ||
      room.type?.toLowerCase().includes(query) ||
      room.status?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <h1 className="page-title">Room Management</h1>

      {/* Form */}
      <div className="card">
        <h3>{editId ? "Edit Room" : "Add New Room"}</h3>

        <input
          type="number"
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
        />

        <input
          type="text"
          placeholder="Room Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <div className="btn-row">
          <button onClick={submitRoom}>
            {loading ? "Please wait..." : editId ? "Update Room" : "Add Room"}
          </button>

          {editId && (
            <button className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <input
        className="search-box"
        placeholder="Search rooms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Rooms List */}
      <div className="grid-3">
        {filteredRooms.map((room) => (
          <div className="card" key={room._id}>
            <h3>Room {room.roomNumber}</h3>

            <p>Type: {room.type}</p>
            <p>Price: ₹{room.price}</p>
            <p>Status: {room.status}</p>

            <div className="btn-row">
              <button onClick={() => editRoom(room)}>Edit</button>

              <button
                className="danger-btn"
                onClick={() => deleteRoom(room._id)}
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
