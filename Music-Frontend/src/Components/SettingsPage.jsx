import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoCameraOutline, IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
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
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  // Available avatar styles
  const avatarStyles = [
    { id: 'adventurer', name: 'Adventurer', preview: [] },
    { id: 'adventurer-neutral', name: 'Adventurer Neutral', preview: [] },
    { id: 'micah', name: 'Micah', preview: [] },
    { id: 'pixel-art', name: 'Pixel Art', preview: [] },
    { id: 'bottts', name: 'Robots', preview: [] }
  ];

  // Generate preview avatars for each style
  useEffect(() => {
    avatarStyles.forEach(style => {
      style.preview = Array(4).fill(null).map(() => {
        const seed = Math.random().toString(36).substring(7);
        return `https://api.dicebear.com/6.x/${style.id}/svg?seed=${seed}`;
      });
    });
  }, []);

  // Function to get initials
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Function to generate and set new avatar
  const generateNewAvatar = async (style) => {
    try {
    // console.log('Generating new avatar with style:', style); // Debug log
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const response = await axios.post(
        `https://full-stack-music-backend.onrender.com/api/users/${userId}/avatar`,
        { style }, // Send selected style to backend
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

    // console.log('Avatar response:', response.data); // Debug log

      if (response.data.avatarUrl) {
        setUserData(prev => ({
          ...prev,
          avatarUrl: response.data.avatarUrl
        }));
        setShowAvatarModal(false);
      }
    } catch (error) {
      console.error('Error generating new avatar:', error);
      // Show error to user
      alert('Failed to update avatar. Please try again.');
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

        // console.log('Raw response data:', response.data);

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

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      await axios.delete(
        `https://full-stack-music-backend.onrender.com/api/users/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Clear all local storage
      localStorage.clear();
      // Redirect to signup page
      navigate('/create-account');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
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
              onClick={() => setShowAvatarModal(true)}
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
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Choose Avatar Style</h3>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Filter styles based on user's gender */}
              {[
                ...(userData.gender === 'Male' ? [
                  { id: 'adventurer', name: 'Adventurer' },
                  { id: 'bottts', name: 'Robots' }, // Correct ID for robots
                  { id: 'pixel-art', name: 'Pixel Art' }
                ] : []),
                ...(userData.gender === 'Female' ? [
                  { id: 'adventurer-neutral', name: 'Adventurer Neutral' },
                  { id: 'bottts', name: 'Robots' }, // Correct ID for robots
                  { id: 'pixel-art', name: 'Pixel Art' }
                ] : []),
                ...(userData.gender === 'Non-binary' || userData.gender === 'Other' ? [
                  { id: 'micah', name: 'Micah' },
                  { id: 'bottts', name: 'Robots' }, // Correct ID for robots
                  { id: 'pixel-art', name: 'Pixel Art' }
                ] : [])
              ].map((style) => (
                <div key={style.id} className="mb-6">
                  <h4 className="text-sm text-gray-400 mb-3">{style.name}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Generate 9 random previews for each style */}
                    {Array.from({ length: 9 }, (_, index) => {
                      const seed = Math.random().toString(36).substring(7);
                      
                      // Special options for bottts (robots)
                      const options = style.id === 'bottts' ? 
                        '&radius=50&backgroundColor=172229' : '';

                      return (
                        <button
                          key={index}
                          onClick={() => generateNewAvatar(style.id, seed)}
                          className="aspect-square rounded-lg overflow-hidden bg-zinc-800 hover:ring-2 hover:ring-green-500 transition-all"
                        >
                          <img
                            src={`https://api.dicebear.com/6.x/${style.id}/svg?seed=${seed}${options}`}
                            alt={`${style.name} preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

        {/* Danger Zone */}
        <div className="mb-6">
          <h3 className="text-gray-400 text-sm uppercase mb-2">Danger Zone</h3>
          <div className="bg-gray-900 rounded-lg">
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-4 py-4 flex items-center justify-between text-red-500 hover:bg-red-500/10"
            >
              <div className="flex items-center space-x-3">
                <IoTrashOutline className="text-xl" />
                <div>
                  <span className="block">Delete Account</span>
                  {/* <span className="text-sm text-gray-400">This action cannot be undone</span> */}
                </div>
              </div>
            </button>
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

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-red-500 mb-4">Delete Account</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;