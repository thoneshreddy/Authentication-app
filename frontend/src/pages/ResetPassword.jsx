import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error("Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-200">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
}
