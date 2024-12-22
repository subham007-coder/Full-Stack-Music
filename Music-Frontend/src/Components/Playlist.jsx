import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/playlists', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(''); // Clear input
      // Optionally, fetch playlists again to update the list
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div>
      <h2>Your Playlists</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Playlist Name"
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
      <div>
        {playlists.map(playlist => (
          <div key={playlist._id}>
            <h3>{playlist.name}</h3>
            {/* Add functionality to view or edit playlists */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;