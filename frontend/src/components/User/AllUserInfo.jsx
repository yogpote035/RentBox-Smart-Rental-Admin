import React, { useEffect, useState } from "react";
import axios from "axios";

function AllUserInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/user-info`, {
        headers: {
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#22223b] text-white text-xl font-semibold tracking-wide">
        Loading users...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#22223b] px-4 py-10 sm:px-10 font-sans text-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white tracking-wide">
        Users & Activities
      </h1>

      <div className="overflow-x-auto bg-[#2a2a3d] border border-[#3c3c4e] rounded-xl shadow-xl">
        <table className="min-w-full text-sm divide-y divide-[#44475a]">
          <thead className="bg-[#2f2f42]">
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "City",
                "Role",
                "Products Added",
                "Reviews Given",
                "Orders Placed",
              ].map((label) => (
                <th
                  key={label}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3c3c4e]">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-400 font-semibold"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr
                  key={u._id}
                  className={`${
                    idx % 2 === 0 ? "bg-[#34344e]" : "bg-[#2c2c3e]"
                  } hover:bg-[#3d3d56] transition-colors duration-200`}
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 text-gray-300 truncate max-w-xs">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{u.phone}</td>
                  <td className="px-6 py-4 text-gray-300">{u.city || "-"}</td>
                  <td className="px-6 py-4 capitalize text-indigo-400 font-semibold">
                    {u.role}
                  </td>
                  <td className="px-6 py-4 text-center text-indigo-300 font-semibold">
                    {u.productsCount}
                  </td>
                  <td className="px-6 py-4 text-center text-indigo-300 font-semibold">
                    {u.reviewsCount}
                  </td>
                  <td className="px-6 py-4 text-center text-indigo-300 font-semibold">
                    {u.ordersCount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUserInfo;
