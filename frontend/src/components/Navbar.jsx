import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-blue-400 pb-1"
      : "text-slate-300 hover:text-white";

  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Inventory Manager
          </h1>

          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <div
          className={`
            ${menuOpen ? "flex" : "hidden"}
            flex-col gap-4 mt-4
            md:flex md:flex-row md:gap-6 md:mt-0
          `}
        >
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
    </nav>
  );
}

export default Navbar;
