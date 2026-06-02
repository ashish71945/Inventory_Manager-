function OrderTable({
  orders,
  customers,
  products,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full min-w-[700px]">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Total Amount</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t"
            >
              <td className="p-3">{order.id}</td>

              <td className="p-3">
                {
                  customers.find(
                    (customer) =>
                      customer.id === order.customer_id
                  )?.full_name
                }
              </td>

              <td className="p-3">
                {
                  products.find(
                    (product) =>
                      product.id === order.product_id
                  )?.name
                }
              </td>

              <td className="p-3">
                {order.quantity}
              </td>

              <td className="p-3">
                ₹{order.total_amount}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OrderTable;
