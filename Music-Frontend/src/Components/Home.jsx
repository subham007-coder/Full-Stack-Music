import "../App.css";
import { useState, useEffect, useRef } from "react";
import { HiHome, HiSearch, HiLibrary } from "react-icons/hi";
import {
  IoNotifications,
  IoTimeOutline,
  IoSettingsSharp,
  IoClose,
} from "react-icons/io5";
import { FaPlay, FaPause } from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [activeCategory, setActiveCategory] = useState("For you");
  const [isFilterActive, setIsFilterActive] = useState(false);

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
        imageUrl:
          "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        artist: "Jung Kook",
      },
      {
        id: 2,
        title: "RapCaviar",
        description: "New music from Drake, 21 Savage and Lil Uzi Vert.",
        imageUrl:
          "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        artist: "Drake",
      },
    ],
    Relax: [
      {
        id: 3,
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imageUrl:
          "https://images.pexels.com/photos/1631645/pexels-photo-1631645.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        artist: "Various Artists",
      },
      {
        id: 4,
        title: "Deep Focus",
        description: "Keep calm and focus with ambient and post-rock music.",
        imageUrl: "https://images.pexels.com/photos/34199/pexels-photo.jpg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        artist: "Various Artists",
      },
    ],
    Workout: [
      {
        id: 5,
        title: "Beast Mode",
        description: "Get your beast mode on!",
        imageUrl:
          "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        artist: "Various Artists",
      },
      {
        id: 6,
        title: "Workout Beats",
        description: "High-energy beats to power your workout.",
        imageUrl:
          "https://images.pexels.com/photos/896059/pexels-photo-896059.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        artist: "Various Artists",
      },
    ],
    Travel: [
      {
        id: 7,
        title: "Road Trip",
        description: "The perfect soundtrack for your adventures.",
        imageUrl:
          "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        artist: "Various Artists",
      },
      {
        id: 8,
        title: "Travel Vibes",
        description: "Music for your journey.",
        imageUrl:
          "https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        artist: "Various Artists",
      },
    ],
    Focus: [
      {
        id: 9,
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imageUrl:
          "https://images.pexels.com/photos/1420701/pexels-photo-1420701.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        artist: "Various Artists",
      },
      {
        id: 10,
        title: "Focus Flow",
        description: "Uptempo instrumental hip hop beats.",
        imageUrl:
          "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        artist: "Various Artists",
      },
    ],
    Energize: [
      {
        id: 11,
        title: "Morning Motivation",
        description: "Uplifting music to start your day.",
        imageUrl:
          "https://images.pexels.com/photos/1647972/pexels-photo-1647972.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        artist: "Various Artists",
      },
      {
        id: 12,
        title: "Power Hour",
        description: "Energy-packed hits to boost your mood.",
        imageUrl:
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
        songUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        artist: "Various Artists",
      },
    ],
  };

  const data = [
    {
      title: "Dekho Na Dekho Na (Jo Tum Mere Ho By Anuv...)",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format",
    },
    {
      title: "Anju Sharma Mix",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format",
    },
    {
      title: "Sanam",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format",
    },
    {
      title: "Pretkotha (Bengali Horror Podcast)",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format",
    },
    {
      title: "Hot Hits Hindi",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format",
    },
    {
      title: 'Aj Shara Bela (From "Bohurupi")',
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format",
    },
  ];

  // Get current category playlists
  const currentPlaylists = categoryPlaylists[activeCategory] || [];

  const { isPlaying, currentSong, playSong } = useAudio();
  const navigate = useNavigate();

  const categoriesRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsFilterActive(true);

    // Get all category buttons
    const categoryButtons = Array.from(categoriesRef.current.children);

    // Animate out all categories except the selected one
    categoryButtons.forEach((button) => {
      if (button.textContent !== category) {
        gsap.to(button, {
          duration: 0.3,
          opacity: 0,
          x: 20,
          display: "none",
          ease: "power2.inOut",
        });
      }
    });

    // Find and animate the selected category
    const selectedButton = categoryButtons.find(
      (button) => button.textContent === category
    );

    if (selectedButton) {
      gsap.to(selectedButton, {
        duration: 0.3,
        opacity: 1,
        x: 0,
        display: "block",
        ease: "power2.inOut",
      });
    }

    // Animate close button in
    gsap.fromTo(
      closeButtonRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        display: "flex",
        ease: "power2.inOut",
      }
    );
  };

  const handleResetFilter = () => {
    setIsFilterActive(false);

    // Get all category buttons
    const categoryButtons = Array.from(categoriesRef.current.children);

    // Animate all categories back in
    categoryButtons.forEach((button) => {
      gsap.to(button, {
        duration: 0.3,
        opacity: 1,
        x: 0,
        display: "block",
        ease: "power2.inOut",
        stagger: 0.05,
      });
    });

    // Animate close button out
    gsap.to(closeButtonRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      display: "none",
      ease: "power2.inOut",
    });
  };

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
          <div className="overflow-x-auto scrollbar-hide mt-4">
            <div className="flex items-center gap-4 px-4 pb-2">
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={handleResetFilter}
                className="hidden p-2 rounded-full bg-[#282828] hover:bg-[#3e3e3e] transition-all duration-300"
                aria-label="Clear filter"
              >
                <IoClose className="text-white text-xl" />
              </button>

              {/* Categories */}
              <div ref={categoriesRef} className="flex gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                      activeCategory === category && isFilterActive
                        ? "bg-[#1ed760] text-black"
                        : "bg-[#282828] text-white hover:bg-[#3e3e3e]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your content */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-zinc-800/40 rounded-md overflow-hidden hover:bg-zinc-700/40 transition-all cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-white text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                      className="absolute play-button bottom-2 right-2 p-3 bg-green-500 rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (playlist) {
                          playSong(playlist);
                        }
                      }}
                    >
                      {isPlaying &&
                      currentSong?.songUrl === playlist.songUrl ? (
                        <FaPause className="text-white text-xl" />
                      ) : (
                        <FaPlay className="text-white text-xl" />
                      )}
                    </button>
                  </div>
                  <h3 className="font-bold text-sm truncate">
                    {playlist.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {playlist.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      {currentSong && (
        <div
          className="fixed bottom-16 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-2 pb-4 pt-2"
          onClick={() => navigate("/player")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <img
                src={currentSong.imageUrl}
                alt="Now playing"
                className="w-12 h-12 rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">
                  {currentSong.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentSong) {
                  playSong(currentSong);
                }
              }}
              className="p-2 play-button"
            >
              {isPlaying ? (
                <FaPause className="text-white text-xl" />
              ) : (
                <FaPlay className="text-white text-xl" />
              )}
            </button>
          </div>
        </div>
      )}

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
