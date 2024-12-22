import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import Playlist from './Components/Playlist';
import PlayerPage from './Components/PlayerPage';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;