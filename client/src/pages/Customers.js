import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    try {
      const res = await api.get("/api/bookings");
      setCustomers(res.data);
    } catch (error) {
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.guestName?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.phone?.includes(search) ||
      String(item.roomId?.roomNumber || "").includes(search)
    );
  });

  return (
    <div>
      <h1 className="page-title">Customers</h1>

      <input
        className="search-box"
        placeholder="Search customer name / email / phone / room"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid-3">
        {filteredCustomers.length === 0 && (
          <div className="card">No customers found.</div>
        )}

        {filteredCustomers.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.guestName}</h3>

            <p>{item.email}</p>

            <p>{item.phone || "No phone number"}</p>

            <p>Room: {item.roomId?.roomNumber || "N/A"}</p>

            <p>Type: {item.roomId?.type || "N/A"}</p>

            <p>Invoice: {item.invoiceNumber || "N/A"}</p>

            <p>₹{item.totalAmount}</p>

            <div
              className={`status ${item.status?.toLowerCase() || "booked"}`}
              style={{ marginTop: "10px" }}
            >
              {item.status || "Booked"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
