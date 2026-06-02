import { useEffect, useState } from "react";
import api from "../services/api";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCustomers = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", {
        full_name: fullName,
        email,
        phone,
      });

      setFullName("");
      setEmail("");
      setPhone("");

      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.detail || "Something went wrong");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);

      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.detail || "Delete failed");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <CustomerForm
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        handleSubmit={addCustomer}
      />

      <CustomerTable customers={customers} deleteCustomer={deleteCustomer} />
    </div>
  );
}

export default Customers;
