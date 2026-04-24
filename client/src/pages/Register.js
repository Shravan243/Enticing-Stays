import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

  const submitRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("api/auth/register", form);

      alert(res.data.message || "Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={submitRegister}>
        <h1>Create Account</h1>
        <p>Join Enticing Stays</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={updateField}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={updateField}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={updateField}
        />

        <button type="submit">{loading ? "Please wait..." : "Register"}</button>

        <p className="small-text">
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
