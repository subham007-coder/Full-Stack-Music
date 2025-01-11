const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Update user preferences
router.put('/update-preferences/:id', async (req, res) => {
  const { preferredArtists, preferredLanguages } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { preferredArtists, preferredLanguages },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error: error.message });
  }
});

// Get user data by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v'); // Exclude version key
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get artist names by IDs
router.post('/artists/names', async (req, res) => {
  try {
    const { artistIds } = req.body;
    // Add your logic to map artist IDs to names
    // For now, returning the IDs as names
    const artistNames = artistIds;
    res.json({ artistNames });
  } catch (error) {
    console.error('Error fetching artist names:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get language names by IDs
router.post('/languages/names', async (req, res) => {
  try {
    const { languageIds } = req.body;
    // Add your logic to map language IDs to names
    // For now, returning the IDs as names
    const languageNames = languageIds;
    res.json({ languageNames });
  } catch (error) {
    console.error('Error fetching language names:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 