import { useEffect, useState } from "react";
import api from "../services/api";
import OrderForm from "../components/orders/OrderForm";
import OrderTable from "../components/orders/OrderTable";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  const fetchCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders", {
        customer_id: Number(customerId),
        product_id: Number(productId),
        quantity: Number(quantity),
      });

      setCustomerId("");
      setProductId("");
      setQuantity("");

      fetchOrders();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.detail || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <OrderForm
        customers={customers}
        products={products}
        customerId={customerId}
        setCustomerId={setCustomerId}
        productId={productId}
        setProductId={setProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        handleSubmit={createOrder}
      />

      <OrderTable orders={orders} customers={customers} products={products} />
    </div>
  );
}

export default Orders;
