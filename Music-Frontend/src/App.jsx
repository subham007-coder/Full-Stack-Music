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
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;