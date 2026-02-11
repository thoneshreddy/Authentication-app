import React, { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => console.log("Not authorized"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ✅ NAVBAR (handles logout + admin link hiding) */}
      <Navbar user={user} />

      {/* CONTENT */}
      <div className="p-6">
        <h1 className="text-xl font-bold">Dashboard</h1>

        {user && (
          <p className="mt-4">
            Welcome <b>{user.name}</b> (Role: {user.role})
          </p>
        )}
      </div>
    </div>
  );
}
