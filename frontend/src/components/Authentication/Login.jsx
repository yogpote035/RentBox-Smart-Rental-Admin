import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Import icons

function Login() {
  const navigate = useNavigate();
  const [usePhone, setUsePhone] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 Visibility toggle
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisable(true);

    const payload = {
      password: formData.password,
      ...(usePhone ? { phone: formData.phone } : { email: formData.email }),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        payload
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        navigate("/");
      }

      if (res.status === 208) return toast.error("You entered the wrong password.");
      if (res.status === 204) return toast.error("User not found.");
      if (res.status === 203) return toast.error("Not authorized as admin.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setTimeout(() => setIsDisable(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] px-4">
      <div className="bg-[#22223b] text-white shadow-lg rounded-xl p-8 w-full max-w-md border border-[#2e2e44]">
        <h2 className="text-center text-2xl font-bold text-[#9a8c98] mb-6">
          Admin Login - RentBox
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!usePhone ? (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full px-3 py-2 bg-[#2e2e44] text-white border border-[#444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8c98]"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 bg-[#2e2e44] text-white border border-[#444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8c98]"
                required
              />
            </div>
          )}

          {/* Password Field with Toggle */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-[#2e2e44] text-white border border-[#444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9a8c98] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-400 hover:text-[#c08497] focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isDisable}
            className={`w-full py-2 rounded-md font-semibold transition-colors ${
              isDisable
                ? "bg-[#6c5b7b] text-gray-300 cursor-not-allowed"
                : "bg-[#9a8c98] hover:bg-[#c08497] text-white"
            }`}
          >
            {isDisable ? "Validating..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-400">
            {usePhone ? "Prefer email login?" : "Prefer phone login?"}{" "}
            <button
              type="button"
              onClick={() => setUsePhone(!usePhone)}
              className="text-[#c08497] hover:underline font-medium"
            >
              Switch to {usePhone ? "Email" : "Phone"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
