import { useState } from "react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { useUserData } from "../context/UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChooseArtists = () => {
  const { selectedArtists, setSelectedArtists } = useUserData();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
      console.log("Retrieved User ID:", userId); // Log the retrieved user ID
      if (!userId) {
        throw new Error("User ID not found in local storage."); // Handle case where userId is not found
      }
      // Extract artist names from selectedArtists
      const artistNames = selectedArtists.map(
        (artistId) => artists.find((artist) => artist.id === artistId).name
      );
      await axios.put(
        `https://full-stack-music-backend.onrender.com/api/users/update-preferences/${userId}`,
        {
          preferredArtists: artistNames, // Send artist names to backend
        }
      );
      navigate("/choose-song-language"); // Navigate to ChooseSongLanguage after updating
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  // Example artists data - replace with your actual data
  const artists = [
    {
      id: 1,
      name: "Taylor Swift",
      imageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0",
    },
    {
      id: 2,
      name: "Ed Sheeran",
      imageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6",
    },
    {
      id: 3,
      name: "Drake",
      imageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
    },
    {
      id: 4,
      name: "The Weeknd",
      imageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
    },
    // Add more artists as needed
  ];

  const toggleArtist = (artistId) => {
    setSelectedArtists((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Choose more artists you like
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          We'll help you find music based on your picks.
        </p>

        {/* Search Bar */}
        <div className="relative mb-8">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search artists"
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredArtists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => toggleArtist(artist.id)}
              className={`relative aspect-square rounded-lg overflow-hidden group ${
                selectedArtists.includes(artist.id)
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="font-bold text-center px-2">
                  {artist.name}
                </span>
              </div>
              {selectedArtists.includes(artist.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-black text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="p-4 bg-gradient-to-t from-black to-transparent">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleNext}
              disabled={selectedArtists.length < 3}
              className={`w-full py-3 rounded-full font-bold ${
                selectedArtists.length >= 3
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

export default ChooseArtists;
