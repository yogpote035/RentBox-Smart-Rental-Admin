import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [usePhone, setUsePhone] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
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
    setIsDisable(true);
    e.preventDefault();
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
      setTimeout(() => {
        setIsDisable(false);
      }, 3000);
      // user found but password not match
      if (res.status === 208) {
        toast.error("You Enter Wrong Password");
      }

      // user Not found
      if (res.status === 204) {
        toast.error("User Not Found, Please Check Your Credentials");
      }
      // user Not found
      if (res.status === 203) {
        toast.error("You are not authorized to access this resource");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setTimeout(() => {
        setIsDisable(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-indigo-600 mb-6">
          Login to RentBox
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!usePhone ? (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                style={{ outline: "none" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                style={{ outline: "none" }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              style={{ outline: "none" }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <button
            disabled={isDisable}
            type="submit"
            className={`w-full ${
              isDisable ? " bg-indigo-300" : "bg-indigo-600"
            } text-white font-semibold py-2 rounded-md hover:bg-rose-800`}
          >
            {isDisable ? "Validating Credentials..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500">
            {usePhone ? "Prefer email login?" : "Prefer phone login?"}{" "}
            <button
              type="button"
              onClick={() => setUsePhone(!usePhone)}
              className="text-indigo-600 hover:underline font-medium"
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
