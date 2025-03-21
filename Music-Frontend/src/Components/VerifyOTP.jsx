import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30); // Set OTP expiry time in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await axios.post('https://full-stack-music-backend.onrender.com/api/auth/verify-otp', {
        otp: otpString
      });

      if (response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/choose-artists');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      setError('');
      setIsResendDisabled(true);
      setTimer(30); // Reset the timer
  
      // Retrieve the email from localStorage
      const email = localStorage.getItem('email'); 
      if (!email) {
        throw new Error('Email is not available for resending OTP');
      }
  
      await axios.post('https://full-stack-music-backend.onrender.com/api/auth/resend-otp', { email });
      setError('OTP resent successfully. Please check your email.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleVerify} className="flex flex-col items-center">
        <h1 className="text-2xl mb-6">Enter OTP</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-2xl bg-zinc-900 border border-zinc-700 focus:border-green-500"
              maxLength="1"
            />
          ))}
        </div>
        <div className="text-sm mb-4">
          {isResendDisabled ? (
            <span className="text-gray-500">Resend OTP in {timer} seconds</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-green-500 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;