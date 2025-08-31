// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            MyApp
          </Link>

          {/* Links */}
          <div className="flex gap-6">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Messages", "/messages"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
