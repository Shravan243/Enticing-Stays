import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={submitLogin}>
        <h1>Enticing Stays</h1>
        <p>Hotel Management System</p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={updateField}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={updateField}
        />

        <button type="submit">{loading ? "Please wait..." : "Login"}</button>

        <p className="small-text">
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}
