import { useState, useEffect, useRef } from "react";
import { HiHome, HiSearch, HiLibrary } from "react-icons/hi";
import {
  IoNotifications,
  IoTimeOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState("For you");

  // Categories data
  const categories = [
    "For you",
    "Relax",
    "Workout",
    "Travel",
    "Focus",
    "Energize",
  ];

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good afternoon");
      } else if (hour >= 18 && hour < 22) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }
    };

    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Categories data with their respective playlists
  const categoryPlaylists = {
    "For you": [
      {
        id: 1,
        title: "Today's Top Hits",
        description: "Jung Kook is on top of the Hottest 50!",
        imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        artist: "Jung Kook"
      },
      {
        id: 2,
        title: "RapCaviar",
        description: "New music from Drake, 21 Savage and Lil Uzi Vert.",
        imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        artist: "Drake"
      }
    ],
    "Relax": [
      {
        id: 3,
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imageUrl: "https://images.pexels.com/photos/1631645/pexels-photo-1631645.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        artist: "Various Artists"
      },
      {
        id: 4,
        title: "Deep Focus",
        description: "Keep calm and focus with ambient and post-rock music.",
        imageUrl: "https://images.pexels.com/photos/34199/pexels-photo.jpg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        artist: "Various Artists"
      }
    ],
    "Workout": [
      {
        id: 5,
        title: "Beast Mode",
        description: "Get your beast mode on!",
        imageUrl: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        artist: "Various Artists"
      },
      {
        id: 6,
        title: "Workout Beats",
        description: "High-energy beats to power your workout.",
        imageUrl: "https://images.pexels.com/photos/896059/pexels-photo-896059.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        artist: "Various Artists"
      }
    ],
    "Travel": [
      {
        id: 7,
        title: "Road Trip",
        description: "The perfect soundtrack for your adventures.",
        imageUrl: "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        artist: "Various Artists"
      },
      {
        id: 8,
        title: "Travel Vibes",
        description: "Music for your journey.",
        imageUrl: "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        artist: "Various Artists"
      }
    ],
    "Focus": [
      {
        id: 9,
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imageUrl: "https://images.pexels.com/photos/1420701/pexels-photo-1420701.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        artist: "Various Artists"
      },
      {
        id: 10,
        title: "Focus Flow",
        description: "Uptempo instrumental hip hop beats.",
        imageUrl: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        artist: "Various Artists"
      }
    ],
    "Energize": [
      {
        id: 11,
        title: "Morning Motivation",
        description: "Uplifting music to start your day.",
        imageUrl: "https://images.pexels.com/photos/1647972/pexels-photo-1647972.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        artist: "Various Artists"
      },
      {
        id: 12,
        title: "Power Hour",
        description: "Energy-packed hits to boost your mood.",
        imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
        songUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        artist: "Various Artists"
      }
    ]
  };

  // Get current category playlists
  const currentPlaylists = categoryPlaylists[activeCategory] || [];

  // Add audio functionality
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(new Audio());

  const playSong = (songUrl) => {
    if (currentSong === songUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      }
      audioRef.current.src = songUrl;
      audioRef.current.play();
      setCurrentSong(songUrl);
      setIsPlaying(true);
    }
  };

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 bg-gradient-to-b from-zinc-900 to-black overflow-y-auto pb-24">
        {/* Header with icons */}
        <div className="sticky top-0 bg-zinc-900 bg-opacity-90 backdrop-blur-md z-10">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{greeting}</h1>
              <div className="flex items-center gap-4">
                <button className="text-white">
                  <IoNotifications className="text-2xl" />
                </button>
                <button className="text-white">
                  <IoTimeOutline className="text-2xl" />
                </button>
                <button className="text-white">
                  <IoSettingsSharp className="text-2xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 rounded-full whitespace-nowrap text-sm ${
                    activeCategory === category
                      ? "bg-white text-black"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of your content */}
        <div className="p-4">
          {/* Made For You Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">{activeCategory}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-zinc-900/40 p-3 rounded-md space-y-2"
                >
                  <div className="relative">
                    <img
                      src={playlist.imageUrl}
                      alt={playlist.title}
                      className="w-full aspect-square object-cover rounded-md shadow-lg"
                    />
                    <button
                      onClick={() => playSong(playlist.songUrl)}
                      className="absolute bottom-2 right-2 p-3 bg-green-500 rounded-full shadow-lg"
                    >
                      {isPlaying && currentSong === playlist.songUrl ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>
                  <h3 className="font-bold text-sm truncate">{playlist.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-2 pb-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <img
              src={currentPlaylists.find(p => p.songUrl === currentSong)?.imageUrl || currentPlaylists[0].imageUrl}
              alt="Now playing"
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">
                {currentPlaylists.find(p => p.songUrl === currentSong)?.title || currentPlaylists[0].title}
              </h4>
              <p className="text-xs text-gray-400">
                {currentPlaylists.find(p => p.songUrl === currentSong)?.artist || currentPlaylists[0].artist}
              </p>
            </div>
          </div>
          <button 
            onClick={() => currentSong && playSong(currentSong)} 
            className="p-2"
          >
            {isPlaying ? (
              <FaPause className="text-white text-xl" />
            ) : (
              <FaPlay className="text-white text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center text-white p-2">
            <HiHome className="text-2xl" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 p-2">
            <HiSearch className="text-2xl" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 p-2">
            <HiLibrary className="text-2xl" />
            <span className="text-xs mt-1">Library</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
