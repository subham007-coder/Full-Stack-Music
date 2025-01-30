const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');

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

// Add this new route for avatar generation
router.post('/:userId/avatar', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { style = 'micah', seed } = req.body; // Get both style and seed
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use provided seed or generate new one
    const avatarSeed = seed || crypto.randomBytes(16).toString("hex");
    
    // Generate avatar URL with the specific seed
    const avatarUrl = `https://api.dicebear.com/6.x/${style}/svg?seed=${avatarSeed}`;
    
    // Update user's avatar URL
    user.avatarUrl = avatarUrl;
    await user.save();

    res.json({ avatarUrl });
  } catch (error) {
    console.error('Error generating new avatar:', error);
    res.status(500).json({ message: 'Error generating new avatar' });
  }
});

module.exports = router; 