import React from "react";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="space-y-4 w-80">
        <h2 className="text-xl font-bold">Register</h2>
        <input placeholder="Name" className="input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input placeholder="Email" className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" placeholder="Password" className="input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn w-full">Register</button>
        <p className="text-sm">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
