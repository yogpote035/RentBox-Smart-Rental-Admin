import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Add these

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 For toggling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        toast.error("This Phone or Email already exists");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }

    setTimeout(() => setIsDisable(false), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#22223b] text-white p-10 rounded-lg shadow-lg w-full max-w-2xl border border-[#2e2e44] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#9a8c98] mb-4">
          Welcome to RentBox Admin
        </h2>

        {/* Name */}
        <div>
          <label className="block font-medium text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-[#2e2e44] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#c08497]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-[#2e2e44] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#c08497]"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 bg-[#2e2e44] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#c08497]"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block font-medium text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-[#2e2e44] text-white border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#c08497] pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[38px] right-3 text-gray-400 hover:text-[#c08497] focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          disabled={isDisable}
          type="submit"
          className={`w-full py-2 font-semibold rounded transition-colors ${
            isDisable
              ? "bg-[#6c5b7b] text-gray-300 cursor-not-allowed"
              : "bg-[#c08497] hover:bg-[#9a8c98] text-white"
          }`}
        >
          {isDisable ? "Processing..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
