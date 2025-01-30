import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoCameraOutline } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { FaBirthdayCake } from 'react-icons/fa';  // Import the birthday icon
import axios from 'axios';

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    preferredArtists: [],
    preferredLanguages: [],
    avatarUrl: '', // Store the avatar URL
  });
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const navigate = useNavigate();

  // Function to get initials
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Function to generate new avatar
  const generateNewAvatar = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const response = await axios.post(
        `https://full-stack-music-backend.onrender.com/api/users/${userId}/avatar`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.avatarUrl) {
        setUserData(prev => ({
          ...prev,
          avatarUrl: response.data.avatarUrl
        }));
        setShowAvatarOptions(false);
      }
    } catch (error) {
      console.error('Error generating new avatar:', error);
    }
  };

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.log('No token or userId found');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`https://full-stack-music-backend.onrender.com/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Raw response data:', response.data);

        // Format the date from the object structure
        const dateObj = response.data.dateOfBirth;
        setUserData({
          ...response.data,
          dateOfBirth: `${dateObj.day} ${dateObj.month} ${dateObj.year}`
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");  // Remove user data
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="min-h-screen pb-4 bg-black text-white">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Profile Section with Avatar */}
      <div className="px-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
              {userData.avatarUrl ? (
                <img
                  src={userData.avatarUrl}
                  alt={`${userData.name}'s avatar`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-green-600 flex items-center justify-center text-2xl font-bold">
                  {getInitials(userData.name)}
                </div>
              )}
            </div>
            
            {/* Edit Avatar Button */}
            <button
              onClick={() => setShowAvatarOptions(!showAvatarOptions)}
              className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 text-black"
            >
              <IoCameraOutline size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-400">{userData.email}</p>
          </div>
        </div>

        {/* Avatar Options Modal */}
        {showAvatarOptions && (
          <div className="mt-2 p-4 bg-gray-900 rounded-lg">
            <button
              onClick={generateNewAvatar}
              className="w-full py-2 px-4 bg-green-500 text-black rounded-lg mb-2"
            >
              Generate New Avatar
            </button>
          </div>
        )}
      </div>

      {/* Settings Sections */}
      <div className="px-4">
        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm uppercase mb-2">Account</h3>
          <div className="bg-gray-900 rounded-lg">
            <div className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <IoPersonOutline className="text-xl" />
                <div>
                  <span className="block">Gender</span>
                  <span className="text-sm text-gray-400">{userData.gender}</span>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBirthdayCake className="text-xl" /> {/* Add birthday cake icon */}
                <div>
                  <span className="block">Date of Birth</span>
                  <span className="text-sm text-gray-400">{userData.dateOfBirth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm uppercase mb-2">Preferences</h3>
          <div className="bg-gray-900 rounded-lg">
            <div className="px-4 py-4 border-b border-gray-800">
              <h4 className="text-sm text-gray-400 mb-2">Preferred Artists</h4>
              <div className="flex flex-wrap gap-2">
                {userData.preferredArtists.map((artist, index) => (
                  <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {artist}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-4 py-4">
              <h4 className="text-sm text-gray-400 mb-2">Preferred Languages</h4>
              <div className="flex flex-wrap gap-2">
                {userData.preferredLanguages.map((language, index) => (
                  <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mb-2 px-4 py-4 bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;