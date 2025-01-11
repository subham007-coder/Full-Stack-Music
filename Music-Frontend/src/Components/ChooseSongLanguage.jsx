import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseSongLanguage = () => {
  const { selectedLanguages, setSelectedLanguages } = useUserData();
  const navigate = useNavigate();

  // Example languages - replace with your actual language data
  const languages = [
    { id: 1, name: "Hindi", bgcolor: "bg-red-500" },
    { id: 2, name: "English", bgcolor: "bg-blue-500" },
    { id: 3, name: "Punjabi", bgcolor: "bg-green-500" },
    { id: 4, name: "Tamil", bgcolor: "bg-yellow-500" },
    { id: 5, name: "Telugu", bgcolor: "bg-purple-500" },
    { id: 6, name: "Malayalam", bgcolor: "bg-pink-500" },
    { id: 7, name: "Kannada", bgcolor: "bg-indigo-500" },
    { id: 8, name: "Bengali", bgcolor: "bg-orange-500" },
  ];

  const toggleLanguage = (languageId, languageName) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
      console.log("Retrieved User ID:", userId); // Log the retrieved user ID
      const languageNames = languages
        .filter((language) => selectedLanguages.includes(language.id))
        .map((language) => language.name); // Extract language names
      await axios.put(
        `https://full-stack-music-backend.onrender.com/api/users/update-preferences/${userId}`,
        {
          preferredLanguages: languageNames, // Send language names to backend
        }
      );
      // localStorage.setItem('userId', userId); // Store user ID in local storage
      navigate("/home"); // Navigate to home after updating
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto">
        {/* Centered Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png"
            alt="Spotify Logo"
            className="w-24 invert"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">
          What music languages do you like?
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Pick your favorite music languages
        </p>

        {/* Languages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-20">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => toggleLanguage(language.id, language.name)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                selectedLanguages.includes(language.id)
                  ? "ring-2 ring-green-500"
                  : "hover:ring-2 hover:ring-white"
              } ${language.bgcolor}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-bold text-lg">{language.name}</span>
              </div>
              {selectedLanguages.includes(language.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={selectedLanguages.length === 0}
              className={`w-full py-3 rounded-full font-bold ${
                selectedLanguages.length > 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSongLanguage;
