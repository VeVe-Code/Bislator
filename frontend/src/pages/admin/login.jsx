import axios from "../../helpers/axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post("/api/admins/login/", { email, password });

      if (res.status === 200) {
        // 1️⃣ Store token in localStorage
        localStorage.setItem("token", res.data.token);

        // 2️⃣ Store admin info in localStorage via AuthContext
        dispatch({ type: "LOGIN", payload: res.data.admin });

        // 3️⃣ Redirect to admin page
        navigate("/admin/service");
      }
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
      console.error("Login error:", e.response?.data || e.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-200 p-8">
      <div
        className="w-full relative backdrop-blur-lg bg-white/40 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto border border-white/30 transform transition-transform duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 animate-float"
        style={{ perspective: "1000px" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Login Form
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!error && (
              <h1 className="text-red-600 text-sm mt-1">{error}</h1>
            )}
          </div>

          {/* Password */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Login
          </button>

          <h1 className="text-sm text-center mt-4">
            Pls{" "}
            <Link
              to="/admin/register"
              className="text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </h1>
        </form>
      </div>

      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
