import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  return (
    <UserDataContext.Provider value={{ selectedArtists, setSelectedArtists, selectedLanguages, setSelectedLanguages }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}; 