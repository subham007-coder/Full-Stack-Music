import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronDown, IoHeart, IoShareSocial, IoEllipsisHorizontal } from 'react-icons/io5';
import { FaShuffle, FaBackwardStep, FaPlay, FaPause, FaForwardStep, FaRepeat } from 'react-icons/fa6';
import { useAudio } from '../context/AudioContext';

const PlayerPage = () => {
  const navigate = useNavigate();
  const progressRef = useRef(null);
  const { 
    isPlaying, 
    currentSong,
    currentTime, 
    duration, 
    audioRef,
    playSong,
    setCurrentTime,
    setDuration 
  } = useAudio();

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [setCurrentTime, setDuration]);

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-black p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2">
          <IoChevronDown className="text-white text-2xl" />
        </button>
        <span className="text-white text-sm font-medium">
          {currentSong?.artist || 'Now Playing'}
        </span>
        <button className="p-2">
          <IoEllipsisHorizontal className="text-white text-2xl" />
        </button>
      </div>

      {/* Album Art */}
      <div className="aspect-square w-full max-w-md mx-auto mb-8">
        <img
          src={currentSong?.imageUrl}
          alt={currentSong?.title}
          className="w-full h-full object-cover rounded-md shadow-2xl"
        />
      </div>

      {/* Song Info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">
            {currentSong?.title || 'No song playing'}
          </h1>
          <p className="text-gray-400 text-sm">
            {currentSong?.artist || 'Unknown artist'}
          </p>
        </div>
        <button className="p-2">
          <IoHeart className="text-white text-2xl" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div 
          ref={progressRef}
          className="h-1 bg-gray-600 rounded-full mb-2 cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-white rounded-full absolute top-0 left-0"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button className="p-2">
            <FaShuffle className="text-gray-400 text-xl" />
          </button>
          <button className="p-2">
            <FaBackwardStep className="text-white text-2xl" />
          </button>
          <button
            onClick={() => currentSong && playSong(currentSong)}
            className="w-16 h-16 flex items-center justify-center bg-white rounded-full"
          >
            {isPlaying ? (
              <FaPause className="text-black text-xl" />
            ) : (
              <FaPlay className="text-black text-xl ml-1" />
            )}
          </button>
          <button className="p-2">
            <FaForwardStep className="text-white text-2xl" />
          </button>
          <button className="p-2">
            <FaRepeat className="text-gray-400 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
