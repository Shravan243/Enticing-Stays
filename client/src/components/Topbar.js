import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="topbar">
      <span>Welcome, {user?.name || "Admin"}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
