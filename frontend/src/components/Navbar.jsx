import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-blue-400 pb-1"
      : "text-slate-300 hover:text-white";

  return (
    <nav className="bg-slate-950 text-white shadow-lg relative">
      
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
          Inventory Manager
        </h1>

        <button
          className="md:hidden text-3xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

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

      <div
        className={`
          fixed top-0 right-0 h-full w-64
          bg-slate-900 shadow-xl z-50
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
        `}
      >
        <div className="flex flex-col gap-6 p-6 mt-16 text-lg">
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
