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
      <nav className="bg-slate-950 text-white shadow-lg relative">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Inventory Manager
          </h1>

          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

          <div
            className={`
              ${menuOpen ? "flex" : "hidden"}
              absolute top-full left-0 w-full
              flex-col gap-3
              bg-slate-900
              p-4 shadow-lg
              md:static md:flex md:flex-row
              md:bg-transparent md:p-0 md:shadow-none
              md:w-auto md:gap-6
            `}
          >
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
