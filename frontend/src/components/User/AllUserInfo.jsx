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
      <div className="flex justify-center items-center h-screen bg-[#1e1e2f] text-white text-xl font-semibold tracking-wide">
        Loading users...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1e1e2f] p-12 font-sans text-gray-100">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-white tracking-wide drop-shadow-lg">
        Users &amp; Activities
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-[#2a2a3d] border border-[#44475a]">
        <table className="min-w-full divide-y divide-[#44475a] rounded-lg">
          <thead>
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
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 tracking-wide select-none"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-400 font-semibold tracking-wide"
                >
                  No users found.
                </td>
              </tr>
            )}

            {users.map((u, idx) => (
              <tr
                key={u._id}
                className={`${
                  idx % 2 === 0 ? "bg-[#35354a]" : "bg-[#2f2f42]"
                } hover:bg-[#44475a] transition-colors duration-300 cursor-default rounded-md`}
              >
                <td className="px-6 py-5 whitespace-nowrap font-semibold text-white">
                  {u.name}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-300 truncate max-w-xs">
                  {u.email}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-300">
                  {u.phone}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-300">
                  {u.city || "-"}
                </td>
                <td className="px-6 py-5 whitespace-nowrap capitalize text-sm font-semibold text-indigo-400">
                  {u.role}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-semibold text-indigo-400">
                  {u.productsCount}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-semibold text-indigo-400">
                  {u.reviewsCount}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-center text-sm font-semibold text-indigo-400">
                  {u.ordersCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUserInfo;
