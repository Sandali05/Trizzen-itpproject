import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth"; // Import the useAdminAuth hook
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAdminAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admindashboard");
    }
  }, [isLoggedIn]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }
    // Add your authentication logic here
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side with a GIF image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('login.gif')" }}>
        </div>

        {/* Right side with the login form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Admin Login</h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Forgot password? <a href="#" className="text-blue-500 hover:underline">Reset here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
