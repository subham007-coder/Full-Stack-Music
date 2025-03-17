import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      const response = await axios.post(
        "https://full-stack-music-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        // Store token and user ID
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("user", JSON.stringify(response.data));
        
        // Navigate to home page
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4">
      {/* Logo */}
      <img 
        src="/assets/fabicon.png"
        alt="MusicMirror Logo"
        className="w-28 my-6"
      />

      {/* Form Container */}
      <div className="w-full max-w-[320px] bg-black text-white">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200"
          >
            Login
          </button>

          {/* Create Account Link */}
          <div className="text-center pt-4">
            <span className="text-gray-400 text-sm">Don't have an account?</span>
            <Link to="/create-account" className="text-white hover:underline ml-2 text-sm">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;