import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import ChooseArtists from './Components/ChooseArtists';
import ChooseSongLanguage from './Components/ChooseSongLanguage';
import Home from './Components/Home';
import PlayerPage from './Components/PlayerPage';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          
          {/* Onboarding Routes */}
          <Route path="/choose-artists" element={<ChooseArtists />} />
          <Route path="/choose-language" element={<ChooseSongLanguage />} />
          
          {/* Main App Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/player" element={<PlayerPage />} />
          
          {/* Redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;