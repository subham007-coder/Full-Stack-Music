import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import ChooseArtists from './Components/ChooseArtists';
import ChooseSongLanguage from './Components/ChooseSongLanguage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/choose-artists" element={<ChooseArtists />} />
        <Route path="/choose-language" element={<ChooseSongLanguage />} />
      </Routes>
    </Router>
  );
}

export default App;