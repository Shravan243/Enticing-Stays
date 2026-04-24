import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Enticing Stays</h2>

      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/rooms">Rooms</NavLink>
      <NavLink to="/admin/book-room">Book Room</NavLink>
      <NavLink to="/admin/bookings">Bookings</NavLink>
      <NavLink to="/admin/customers">Customers</NavLink>
      <NavLink to="/admin/billing">Billing</NavLink>
    </aside>
  );
}
