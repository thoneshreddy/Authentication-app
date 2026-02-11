import React, { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  };

  useEffect(fetchUsers, []);

  const changeRole = (id, role) => {
    API.put(`/admin/users/${id}/role`, { role })
      .then(fetchUsers)
      .catch(() => alert("Failed to update role"));
  };

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    API.delete(`/admin/users/${id}`)
      .then(fetchUsers)
      .catch(() => alert("Delete failed"));
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <Navbar />

    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Admin Dashboard
          </h1>
          <span className="text-sm text-slate-500">
            Total Users: <b>{users.length}</b>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-white sticky top-0">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium text-slate-800">
                    {u.name}
                  </td>

                  <td className="p-4 text-slate-600">
                    {u.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                        u.role === "ADMIN"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        changeRole(
                          u._id,
                          u.role === "ADMIN" ? "USER" : "ADMIN"
                        )
                      }
                      className="px-3 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition active:scale-95"
                    >
                      Toggle Role
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="px-3 py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md transition active:scale-95"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);


}
