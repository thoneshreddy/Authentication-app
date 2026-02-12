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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-slate-800">
        Create Account
      </h2>

      <input
        placeholder="Full Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition active:scale-95">
        Register
      </button>

      <p className="text-sm text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  </div>
);

}
