import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../features/Auth/adminAuth";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authAdmin
  );
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/admin-dashboard"); // redirect to admin dashboard or desired route
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
