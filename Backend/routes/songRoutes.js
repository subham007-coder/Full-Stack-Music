const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const { protect } = require("../middleware/authMiddleware");
const { cloudinary } = require("../config/cloudinary");
const multer = require("multer");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get songs by category
router.get("/category/:category", async (req, res) => {
  try {
    const songs = await Song.find({ category: req.params.category });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get songs by language
router.get("/language/:language", async (req, res) => {
  try {
    const songs = await Song.find({ language: req.params.language });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get songs by artist
router.get("/artist/:artist", async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.artist });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new song (protected route)
router.post("/add", protect, 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Verify if user is admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized as admin" });
      }

      if (!req.files || !req.files.image || !req.files.audio) {
        return res.status(400).json({ message: 'Both image and audio files are required' });
      }

      // Convert buffers to base64 for Cloudinary
      const imageBase64 = `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString('base64')}`;
      const audioBase64 = `data:${req.files.audio[0].mimetype};base64,${req.files.audio[0].buffer.toString('base64')}`;

      // Upload image to Cloudinary
      const imageResult = await cloudinary.uploader.upload(imageBase64, {
        folder: 'music-app/images'
      });

      // Upload audio to Cloudinary
      const audioResult = await cloudinary.uploader.upload(audioBase64, {
        folder: 'music-app/audio',
        resource_type: 'auto'
      });

      const { title, artist, album, category, language } = req.body;

      if (!title || !artist || !album || !category || !language) {
        return res.status(400).json({ 
          message: 'All fields (title, artist, album, category, language) are required' 
        });
      }

      const song = await Song.create({
        title,
        artist,
        album,
        category,
        language,
        imageUrl: imageResult.secure_url,
        imagePublicId: imageResult.public_id,
        songUrl: audioResult.secure_url,
        audioPublicId: audioResult.public_id,
      });

      res.status(201).json(song);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: error.message });
    }
});

// Delete song (protected route)
router.delete("/:id", protect, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // Delete image from Cloudinary
    if (song.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(song.imagePublicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    // Delete audio from Cloudinary
    if (song.audioPublicId) {
      try {
        await cloudinary.uploader.destroy(song.audioPublicId, { 
          resource_type: 'video'  // Required for audio files
        });
      } catch (error) {
        console.error('Error deleting audio from Cloudinary:', error);
      }
    }

    // Delete song from database
    await Song.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting song' });
  }
});

module.exports = router;