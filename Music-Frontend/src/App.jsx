import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./Components/Header";
import EntryPage from "./Components/EntryPage";
import Home from "./Components/Home";
import VerifyOTP from "./Components/VerifyOTP";
import ChooseArtists from "./Components/ChooseArtists";
import ChooseSongLanguage from "./Components/ChooseSongLanguage";
import CreateAccount from "./Components/CreateAccount";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AudioProvider } from "./context/AudioContext";
import { UserDataProvider } from "./context/UserDataContext";
import Login from "./Components/Login";
import SettingsPage from './Components/SettingsPage';
import ChooseLanguage from './Components/ChooseSongLanguage';

const App = () => {
  return (
    <AudioProvider>
      <UserDataProvider>
        <Router>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/choose-artists" element={<ChooseArtists />} />
            <Route
              path="/choose-song-language"
              element={<ChooseSongLanguage />}
            />
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
            <Route 
              path="/choose-language" 
              element={
                <ProtectedRoute>
                  <ChooseLanguage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </UserDataProvider>
    </AudioProvider>
  );
};

export default App;