import { useEffect, useState } from "react";
import api from "../services/api";

import DashboardCard from "../components/DashboardCard";
function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock_products: 0,
  });

  const fetchDashboard = async () => {
    const res = await api.get("/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>

          <p className="text-slate-500">Inventory overview and stock status</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Products" value={stats.total_products} />

        <DashboardCard title="Customers" value={stats.total_customers} />

        <DashboardCard title="Orders" value={stats.total_orders} />

        <DashboardCard title="Low Stock" value={stats.low_stock_products} />
      </div>
      {stats.low_stock_items?.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow max-w-md">
          {" "}
          <h2 className="font-bold text-xl mb-4 text-red-600">
            ⚠️ Low Stock Products
          </h2>
          <ul className="space-y-3">
            {stats.low_stock_items.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center bg-red-50 px-4 py-3 rounded-lg"
              >
                <span className="font-medium">{item.name}</span>

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Qty: {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
