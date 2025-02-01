import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EntryPage from "./Components/EntryPage";
import Home from "./Components/Home";
import VerifyOTP from "./Components/VerifyOTP";
import ChooseArtists from "./Components/ChooseArtists";
import ChooseSongLanguage from "./Components/ChooseSongLanguage";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import SettingsPage from './Components/SettingsPage';
import ProtectedRoute from "./Components/ProtectedRoute";
import PlayerPage from "./Components/PlayerPage";
import { AudioProvider } from "./context/AudioContext";
import { UserDataProvider } from "./context/UserDataContext";

const App = () => {
  return (
    <Router>
      <AudioProvider>
        <UserDataProvider>
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/choose-artists" element={<ChooseArtists />} />
            <Route path="/choose-song-language" element={<ChooseSongLanguage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </UserDataProvider>
      </AudioProvider>
    </Router>
  );
};

export default App;