import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isDisable, setIsDisable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("print");
  console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisable(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        navigate("/");
      }
      if (res.status === 208) {
        toast.error("This Phone Or Mail User Already Exists");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }

    setTimeout(() => {
      setIsDisable(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Welcome On RentBox Please SignUp
        </h2>

        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          disabled={isDisable}
          type="submit"
          className={`w-full ${
            isDisable ? "bg-rose-600" : "bg-indigo-500"
          }  text-white font-semibold py-2 rounded shadow`}
        >
          {isDisable ? "Validating Credentials..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
