import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { HiPhone, HiMicrophone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mediaError, setMediaError] = useState({ audio: null, video: null });

  // Add useEffect to check for existing credentials
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");

    // If all credentials exist, redirect to home
    if (token && userId && user) {
      // Verify if token matches the user's token
      const userData = JSON.parse(user);
      if (userData.token === token) {
        navigate("/home");
      }
    }
  }, [navigate]);

  // Replace the existing useEffect for user interaction with this:
  useEffect(() => {
    const handleUserClick = async () => {
      if (!hasInteracted && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (err) {
          setMediaError(prev => ({ ...prev, audio: err.message }));
        }
      }
    };

    // Only add click event listener
    document.addEventListener('click', handleUserClick, { once: true });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleUserClick);
    };
  }, [hasInteracted]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://full-stack-music-backend.onrender.com/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     localStorage.setItem("token", response.data.token); // Store token
  //     navigate("/home"); // Redirect to home
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Login failed. Please check your credentials.");
  //   }
  // };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      {/* Replace mic icon with speaker icon */}
      <div className="absolute top-4 right-4 border-2 border-gray-500 rounded-full p-2">
        {isPlaying ? (
          <HiSpeakerWave 
            className="text-2xl cursor-pointer text-white transition-colors duration-200 hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
              }
            }}
          />
        ) : (
          <HiSpeakerXMark 
            className="text-2xl cursor-pointer text-gray-500 transition-colors duration-200 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              if (audioRef.current) {
                audioRef.current.play().catch(err => {
                  setMediaError(prev => ({ ...prev, audio: err.message }));
                });
                setIsPlaying(true);
              }
            }}
          />
        )}
      </div>

      <div className="w-full max-w-md p-8 space-y-8">
        {/* Updated audio element */}
        <audio
          ref={audioRef}
          src="/assets/EntryMusic.mp3"
          preload="auto"
          loop
          onError={(e) => {
            console.error("Audio loading error:", e);
            setMediaError(prev => ({ ...prev, audio: "Failed to load audio" }));
          }}
        />

        <div className="flex justify-center">
          <div className="flex justify-center">
            <video
              src="/assets/logo-LigthBG.mp4"
              poster="/assets/logo-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-52 my-2 rounded-full"
              controlsList="nodownload"
              onError={(e) => {
                console.error("Video loading error:", e);
                setMediaError(prev => ({ ...prev, video: "Failed to load video" }));
              }}
            />
          </div>
        </div>

        {/* Display any media errors */}
        {(mediaError.audio || mediaError.video) && (
          <div className="text-red-500 text-sm text-center">
            {mediaError.audio && <p>Audio Error: {mediaError.audio}</p>}
            {mediaError.video && <p>Video Error: {mediaError.video}</p>}
          </div>
        )}

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-3xl font-bold">Millions Of Story.</h1>
          <p className="text-white text-xl">On Nightfall Suspense.</p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          {/* login Button */}
          <Link
            to="/login"
            className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200"
          >
            Login
          </Link>

          {/* Phone Number Button */}
          {/* <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <HiPhone className="text-xl" />
            Continue with phone number
          </button> */}

          {/* Google Button */}
          {/* <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button> */}

          {/* Facebook Button */}
          {/* <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <FaFacebook className="text-xl text-blue-600" />
            Continue with Facebook
          </button> */}

          {/* Additional Links to Other Pages */}
          <div className="space-y-4">
            {/* Create Account Link */}
            <Link
              to="/create-account"
              className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center transition duration-200"
            >
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
            <Link
              to="/create-account"
              className="text-white hover:underline ml-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;