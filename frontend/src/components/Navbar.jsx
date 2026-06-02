import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-l-4 border-blue-400 pl-3 py-2 bg-slate-800 rounded-r"
      : "text-slate-300 hover:text-white pl-3 py-2";

  return (
    <nav className="bg-slate-950 text-white shadow-lg relative">

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          Inventory Manager
        </h1>

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl z-[60] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/customers" className={linkClass}>
            Customers
          </NavLink>

          <NavLink to="/orders" className={linkClass}>
            Orders
          </NavLink>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed top-[72px] right-0
          h-[calc(100vh-72px)]
          w-44
          bg-slate-900
          shadow-xl
          z-50
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex flex-col gap-5 p-4 text-lg">

          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/customers"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Customers
          </NavLink>

          <NavLink
            to="/orders"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </NavLink>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;
