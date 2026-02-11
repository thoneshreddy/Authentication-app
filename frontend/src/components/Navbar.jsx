import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-wide flex items-center gap-2"
          >
            🔐 <span>Auth App</span>
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-sm font-semibold px-3 py-1.5 rounded-md bg-indigo-500/30 hover:bg-indigo-500/50 transition"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="font-medium text-indigo-100">
                {user.name}
              </span>

              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold tracking-wide ${
                  user.role === "ADMIN"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-sky-500/90 text-white"
                }`}
              >
                {user.role}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 active:scale-95 transition px-4 py-1.5 rounded-md text-sm font-semibold shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
