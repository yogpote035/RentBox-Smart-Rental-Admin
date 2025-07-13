import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const isAuthenticated = token && userId;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-[#22223b] px-8 py-3 text-white shadow-md">
      {isAuthenticated ? (
        <div
          className="flex flex-col font-bold cursor-pointer"
          onClick={() => handleNav("/")}
        >
          <span className="text-2xl tracking-wider">RentBox</span>
          <span className="text-sm text-[#9a8c98] -mt-1">Admin Panel</span>
        </div>
      ) : (
        <div className="flex flex-col font-bold cursor-pointer">
          <span className="text-2xl tracking-wider">RentBox</span>
          <span className="text-sm text-[#9a8c98] -mt-1">Admin Panel</span>
        </div>
      )}

      {/* Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {isAuthenticated ? (
          <>
            <li>
              <button
                onClick={() => handleNav("/")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/products")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/orders")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/users")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white font-medium hover:text-red-400 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={() => handleNav("/admin/login")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("/admin/signup")}
                className="text-white font-medium hover:text-[#9a8c98] transition-colors duration-200"
              >
                Signup
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-[#22223b] flex flex-col gap-4 py-4 px-8 md:hidden shadow-lg z-20">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => handleNav("/")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/products")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Products
                </button>
              </li>{" "}
              <li>
                <button
                  onClick={() => handleNav("/orders")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/users")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Users
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium hover:text-red-400 text-left w-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => handleNav("/admin/login")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("/admin/signup")}
                  className="text-white font-medium hover:text-[#9a8c98] text-left w-full"
                >
                  Signup
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
