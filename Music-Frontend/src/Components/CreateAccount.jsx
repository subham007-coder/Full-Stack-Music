import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Log the current form data
      console.log('Current form data:', formData);

      // Validate required fields
      if (!formData.name || !formData.email || !formData.password || !formData.gender) {
        setError("Please fill in all required fields");
        return;
      }

      // Email validation
      if (formData.email !== formData.confirmEmail) {
        setError("Email addresses do not match");
        return;
      }

      // Password validation
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      // Date validation
      if (!formData.day || !formData.month || !formData.year) {
        setError("Please fill in complete date of birth");
        return;
      }

      // Format the data
      const formattedData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: {
          day: formData.day,
          month: formData.month,
          year: formData.year
        }
      };

      // Log the formatted data being sent
      console.log('Sending formatted data:', formattedData);

      const response = await axios.post(
        'https://full-stack-music-backend.onrender.com/api/auth/register',
        formattedData
      );
      
      if (response.data) {
        localStorage.setItem('email', formData.email);
        navigate('/verify-otp');
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4">
      {/* Logo */}
      <img 
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
        alt="Spotify Logo"
        className="w-28 invert my-6"
      />

      {/* Form Container */}
      <div className="w-full max-w-[320px] bg-black text-white">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create an account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Confirm Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Confirm email address</label>
            <input
              type="email"
              placeholder="Enter your email again"
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
              value={formData.confirmEmail}
              onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white pr-10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your profile name"
              className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Date of birth</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="DD"
                required
                maxLength="2"
                className="w-16 px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
                value={formData.day}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                  if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
                    setFormData({...formData, day: value});
                  }
                }}
              />
              <select
                required
                className="flex-1 px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="YYYY"
                required
                maxLength="4"
                className="w-20 px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-white"
                value={formData.year}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setFormData({...formData, year: value});
                }}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Gender</label>
            <div className="flex gap-4 flex-wrap">
              {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="accent-green-500"
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full mt-6"
          >
            Create account
          </button>

          {/* Login Link */}
          <div className="text-center pt-4">
            <span className="text-gray-400 text-sm">Already have an account?</span>
            <Link to="/login" className="text-white hover:underline ml-2 text-sm">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;