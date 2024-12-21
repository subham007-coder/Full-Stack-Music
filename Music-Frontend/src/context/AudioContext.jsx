import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  const playSong = async (song) => {
    try {
      if (!song || typeof song === 'string') {
        console.error("Invalid song object:", song);
        return;
      }

    //   console.log("Attempting to play:", song); // Debug log

      if (currentSong && currentSong.songUrl === song.songUrl) {
        // Same song - toggle play/pause
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Error playing current song:", error);
          }
        }
      } else {
        // New song
        if (isPlaying) {
          audioRef.current.pause();
        }
        
        // Update audio source
        audioRef.current.src = song.songUrl;
        setCurrentSong(song); // Store the entire song object
        
        // Reset time and duration
        setCurrentTime(0);
        setDuration(0);
        
        try {
          await audioRef.current.load();
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
              });
          }
        } catch (error) {
          console.error("Error loading or playing audio:", error);
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error("Error in playSong:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (error) => {
      console.error("Audio error:", error);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      isPlaying,
      setIsPlaying,
      currentSong,
      setCurrentSong,
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
      audioRef,
      playSong
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 