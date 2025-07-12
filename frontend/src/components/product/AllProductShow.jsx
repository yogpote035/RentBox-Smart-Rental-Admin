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
      });
  }, []);

  return (
    <div className="p-6 m-1 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Product Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 mb-2">Owner: {product.ownerName}</p>
            <div className="flex justify-between mt-4">
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Reviews: {product.reviewsCount}
              </span>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                Orders: {product.ordersCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
