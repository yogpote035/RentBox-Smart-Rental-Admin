import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [activities, setActivities] = useState([]);

  const OrdersUsersProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/count/all`,
        {
          headers: {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        setOrders(res.data.totalOrders);
        setUsers(res.data.totalUsers);
        setProducts(res.data.totalProducts);
      }
    } catch (error) {
      console.error("Error fetching order, product, and user counts:", error);
      setOrders(0);
      setUsers(0);
      setProducts(0);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/recent-activities`,
        {
          headers: {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      );
      if (res.status === 200) {
        setActivities(res.data);
      }
    } catch (err) {
      console.error("Error fetching recent activities:", err);
    }
  };

  useEffect(() => {
    OrdersUsersProducts();
    fetchRecentActivities();
  }, []);

  const stats = [
    { label: "Total Users", value: users },
    { label: "Total Products", value: products },
    { label: "Total Orders", value: orders },
  ];

  return (
    <div className="p-8 bg-[#22223b] min-h-screen text-white">
      <h1 className="text-4xl text-center font-bold mb-5">Admin Dashboard</h1>
      <div className="text-2xl text-center font-bold mb-10">
        Welcome back, {localStorage.getItem("username")} 👋
      </div>

      <div className="flex flex-wrap gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#4a4e69] rounded-xl shadow-lg p-6 min-w-[200px] flex-1 text-center"
          >
            <div className="text-5xl font-extrabold text-[#c9ada7]">
              {stat.value}
            </div>
            <div className="text-[#f2e9e4] mt-2 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#4a4e69] rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-[#f2e9e4]">
          Recent Activities
        </h2>
        <ul className="divide-y divide-[#9a8c98]">
          {activities.length === 0 ? (
            <p className="text-[#ccc]">No recent activities available.</p>
          ) : (
            activities.map((item, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center"
              >
                <span className="font-medium text-[#f2e9e4]">
                  {item.description}
                </span>
                <span className="text-[#ccc] text-sm">{item.time}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
