import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/order/orders`, {
        headers: {
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-4 text-rose-500 text-center text-7xl font-bold mt2">
        Loading orders...
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto bg-[#22223b] min-h-screen text-white">
      <h1 className="text-4xl text-center font-bold mt-4 mb-5">
        Orders Dashboard
      </h1>
      <div className="overflow-auto rounded shadow-md">
        <table className="min-w-full bg-[#2a2a40] border border-[#444] text-sm">
          <thead className="bg-[#3a3a55] text-indigo-200">
            <tr className="text-left font-medium">
              <th className="p-3">Product</th>
              <th className="p-3">Orderer</th>
              <th className="p-3">City</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price/Day</th>
              <th className="p-3">Days</th>
              <th className="p-3">Total</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Created</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-[#444] hover:bg-[#333350] transition"
              >
                <td className="p-3">{order.productName}</td>
                <td className="p-3">{order.ordererName}</td>
                <td className="p-3">{order.city}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">₹{order.pricePerDay}</td>
                <td className="p-3">{order.totalDaysRented}</td>
                <td className="p-3 font-semibold text-green-300">
                  ₹{order.totalPrice}
                </td>
                <td className="p-3">{order.from}</td>
                <td className="p-3">{order.to}</td>
                <td className="p-3">{order.createdAt}</td>
                <td className="p-3">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-semibold",
                      order.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    )}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
