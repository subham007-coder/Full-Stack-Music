import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <h1>Settings</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;