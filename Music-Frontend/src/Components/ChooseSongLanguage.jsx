import { useState } from 'react';
import { Link } from 'react-router-dom';

const ChooseSongLanguage = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Example languages - replace with your actual language data
  const languages = [
    { id: 1, name: 'Hindi', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 2, name: 'English', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 3, name: 'Punjabi', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 4, name: 'Tamil', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 5, name: 'Telugu', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 6, name: 'Malayalam', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 7, name: 'Kannada', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
    { id: 8, name: 'Bengali', imageUrl: 'https://i.pinimg.com/736x/cc/41/d5/cc41d575e8caf4f1ddb75955c6d4b241.jpg' },
  ];

  const toggleLanguage = (languageId) => {
    setSelectedLanguages(prev => 
      prev.includes(languageId)
        ? prev.filter(id => id !== languageId)
        : [...prev, languageId]
    );
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
              onClick={() => toggleLanguage(language.id)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                selectedLanguages.includes(language.id) 
                  ? 'ring-2 ring-green-500' 
                  : 'hover:ring-2 hover:ring-white'
              }`}
            >
              <img
                src={language.imageUrl}
                alt={language.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-bold text-lg">
                  {language.name}
                </span>
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
              disabled={selectedLanguages.length === 0}
              className={`w-full py-3 rounded-full font-bold ${
                selectedLanguages.length > 0
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-700 cursor-not-allowed'
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
