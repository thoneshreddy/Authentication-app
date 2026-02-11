import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // ✅ STORE BOTH TOKEN AND USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      // ✅ ROLE-BASED REDIRECT
      if (res.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center text-slate-800">
        Login
      </h2>

      <input
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
<p className="text-sm text-right">
  <Link
    to="/forgot-password"
    className="text-indigo-600 hover:underline"
  >
    Forgot Password?
  </Link>
</p>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition active:scale-95">
        Login
      </button>

      <p className="text-sm text-center text-slate-600">
        No account?{" "}
        <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </form>
  </div>
);


}
