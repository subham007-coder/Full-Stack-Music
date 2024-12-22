const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const { protect } = require("../middleware/authMiddleware");

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find({});
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
router.post("/", protect, async (req, res) => {
  try {
    const { title, artist, imageUrl, songUrl, category, language } = req.body;
    const song = await Song.create({
      title,
      artist,
      imageUrl,
      songUrl,
      category,
      language,
    });
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 