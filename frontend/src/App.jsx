import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AllProductShow from "./components/product/AllProductShow";
import AllUserInfo from "./components/User/AllUserInfo";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-15">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <AllProductShow />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/signup" element={<Signup />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AllUserInfo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
