import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllProductShow() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/products`, {
        headers: {
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#22223b]">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Product Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-[#4a4e69] text-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-sm text-[#d9d9d9] mb-1">
              <span className="font-medium">Price:</span> ₹{product.price}
            </p>
            <p className="text-sm text-[#d9d9d9] mb-1">
              <span className="font-medium">Owner:</span> {product.ownerName}
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-xs bg-blue-200 text-blue-900 px-3 py-1 rounded-full font-medium">
                Reviews: {product.reviewsCount}
              </span>
              <span className="text-xs bg-green-200 text-green-900 px-3 py-1 rounded-full font-medium">
                Orders: {product.ordersCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
