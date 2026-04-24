import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const nav = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/");
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <div className={dark ? "dark" : ""}>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Enticing Stays</div>

        <div className="nav-links">
          <Link to="/admin" className={isActive("/admin")}>
            Dashboard
          </Link>

          <Link to="/admin/rooms" className={isActive("/admin/rooms")}>
            Rooms
          </Link>

          <Link to="/admin/book-room" className={isActive("/admin/book-room")}>
            Book Room
          </Link>

          <Link to="/admin/bookings" className={isActive("/admin/bookings")}>
            Bookings
          </Link>

          <Link to="/admin/customers" className={isActive("/admin/customers")}>
            Customers
          </Link>

          <Link to="/admin/billing" className={isActive("/admin/billing")}>
            Billing
          </Link>
        </div>

        <div className="nav-user">
          <span>{user.name || "Admin"}</span>

          <button onClick={() => setDark(!dark)}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="main top-layout">
        <Outlet />
      </div>
    </div>
  );
}
