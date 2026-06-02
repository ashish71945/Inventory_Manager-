import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-blue-400 pb-1"
      : "text-slate-300 hover:text-white";

  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          <h1 className="text-3xl font-bold tracking-wide">
            Inventory Manager
          </h1>

          <div className="flex flex-wrap gap-6 text-lg">
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
      </div>
    </nav>
  );
}

export default Navbar;
