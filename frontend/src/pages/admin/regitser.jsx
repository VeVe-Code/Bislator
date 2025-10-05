import axios from "../../helpers/axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // <-- loading state

  let navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    setError(null); // clear previous errors

    try {
      let data = { name, email, password };
      let res = await axios.post("/api/admins/register/", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        navigate("/admin/service");
      }
    } catch (e) {
      setError(e.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-200 p-8">
      <div
        className="relative backdrop-blur-lg bg-white/40 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto border border-white/30 transform transition-transform duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 animate-float"
        style={{ perspective: "1000px" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Register Form
        </h2>

        <form className="space-y-5" onSubmit={register}>
          {/* Name */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!(error && error.name) && (
              <h1 className="text-red-500 text-sm">{error.name.msg}</h1>
            )}
          </div>

          {/* Email */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!(error && error.email) && (
              <h1 className="text-red-600 text-sm">{error.email.msg}</h1>
            )}
          </div>

          {/* Password */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!(error && error.password) && (
              <h1 className="text-red-600 text-sm">{error.password.msg}</h1>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading} // disable button while loading
            className={`w-full text-white py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>

          <h1 className="text-sm text-center mt-4">
            Pls{" "}
            <Link to="/admin/login" className="text-blue-600 hover:underline">
              Login here
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

export default Register;
