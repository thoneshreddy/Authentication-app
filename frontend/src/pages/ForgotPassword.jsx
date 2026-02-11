import React, { useState } from "react";
import { toast } from "react-hot-toast";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Send Reset Link
        </button>

        <p className="text-sm text-center">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
