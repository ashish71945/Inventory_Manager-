import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

import ProductForm from "../components/products/ProductForm";
import ProductTable from "../components/products/ProductTable";
function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, {
          name,
          sku,
          price: Number(price),
          quantity: Number(quantity),
        });

        setEditingId(null);
      } else {
        await api.post("/products", {
          name,
          sku,
          price: Number(price),
          quantity: Number(quantity),
        });
      }

      setName("");
      setSku("");
      setPrice("");
      setQuantity("");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.detail?.[0]?.msg ||
          error.response?.data?.detail ||
          "Something went wrong",
      );
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Something went wrong");
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setName(product.name);
    setSku(product.sku);
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">Products</h1>

        <p className="text-slate-500">Manage inventory products</p>
      </div>

      <ProductForm
        name={name}
        setName={setName}
        sku={sku}
        setSku={setSku}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        editingId={editingId}
        handleSubmit={addProduct}
      />

      <ProductTable
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default Products;
