import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store token
      navigate('/home'); // Redirect to home
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
          alt="Spotify Logo"
          className="w-32 invert mx-auto"
        />

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-3xl font-bold">
            Millions of songs.
          </h1>
          <p className="text-white text-xl">
            Free on Spotify.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          {/* login Button */}
          <Link to="/login" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full font-semibold transition duration-200 flex items-center justify-center">
            Login
          </Link>

          {/* Phone Number Button */}
          {/* <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <HiPhone className="text-xl" />
            Continue with phone number
          </button> */}

          {/* Google Button */}
          <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Facebook Button */}
          <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <FaFacebook className="text-xl text-blue-600" />
            Continue with Facebook
          </button>

          {/* Additional Links to Other Pages */}
          <div className="space-y-4">
            {/* Create Account Link */}
            <Link to="/create-account" className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200">
              Create Account
            </Link>

            {/* Choose Artists Link */}
            {/* <Link to="/choose-artists" className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200">
              Choose Artists
            </Link> */}

            {/* Choose Song Language Link */}
            {/* <Link to="/choose-language" className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200">
              Choose Song Language
            </Link> */}

            {/* Home Link */}
            {/* <Link to="/home" className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200">
              Home
            </Link> */}
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <Link to="/create-account" className="text-white hover:underline ml-2">
              Sign up
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;