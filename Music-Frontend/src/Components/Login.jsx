import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Login = () => {
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
          {/* Sign up Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-full font-semibold transition duration-200">
            Sign up free
          </button>

          {/* Phone Number Button */}
          <button className="w-full bg-transparent border border-gray-500 hover:border-white text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-200">
            <HiPhone className="text-xl" />
            Continue with phone number
          </button>

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
