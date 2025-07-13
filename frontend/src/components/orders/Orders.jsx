import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActiveOrders] = useState(0);
  const [expired, setExpiredOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/order/order-state-count`, {
        headers: {
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        setActiveOrders(res.data.totalActive);
        setExpiredOrders(res.data.totalExpired);
        setTotalOrders(res.data.TotalOrders);
      })
      .catch((err) => {
        console.error("Failed to fetch order state count", err);
      });
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

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#4a4e69] p-5 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold mb-1">Active Orders</h3>
          <p className="font-bold">
            <span className="text-[#c9ada7] text-8xl">{active}</span>
          </p>
        </div>
        <div className="bg-[#4a4e69] p-5 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold mb-1">Expired Orders</h3>
          <p className="font-bold">
            <span className="text-[#c9ada7] text-8xl">{expired}</span>
          </p>
        </div>
        <div className="bg-[#4a4e69] p-5 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold mb-1">Total Orders</h3>
          <p className="font-bold">
            <span className="text-[#c9ada7] text-8xl">{totalOrders}</span>
          </p>
        </div>
      </div>
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
