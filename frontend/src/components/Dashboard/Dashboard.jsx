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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-md p-8 min-w-[200px] flex-1"
          >
            <div className="text-4xl font-extrabold text-blue-600">
              {stat.value}
            </div>
            <div className="text-gray-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="divide-y divide-gray-100">
          {activities.length === 0 ? (
            <p className="text-gray-500">No recent activities available.</p>
          ) : (
            activities.map((item, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center"
              >
                <span className="font-medium">{item.description}</span>
                <span className="text-gray-400 text-sm">{item.time}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
