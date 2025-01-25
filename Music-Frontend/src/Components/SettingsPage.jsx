import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';
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

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.log('No token or userId found');
        navigate('/');
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
        const formattedDate = dateObj ? 
          `${dateObj.day} ${dateObj.month} ${dateObj.year}` : '';

        setUserData({
          name: response.data.name || '',
          email: response.data.email || '',
          gender: response.data.gender || '',
          dateOfBirth: formattedDate,
          preferredArtists: response.data.preferredArtists || [],
          preferredLanguages: response.data.preferredLanguages || [],
          avatarUrl: response.data.avatarUrl || '', // Use the stored avatar URL
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.clear();
          navigate('/');
        }
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
            <img
              src={userData.avatarUrl} // Use the stored avatar URL
              alt={`${userData.name}'s avatar`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                console.log("Avatar load error, trying simple fallback");
                e.target.onerror = null;
                e.target.src = 'path/to/fallback/image.png'; // Replace with your fallback image path
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-400">{userData.email}</p>
          </div>
        </div>
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