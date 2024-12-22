const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const { protect } = require("../middleware/authMiddleware");

// Get user's playlists
router.get("/", protect, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id })
      .populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new playlist
router.post("/", protect, async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const playlist = await Playlist.create({
      name,
      user: req.user._id,
      imageUrl,
      songs: [],
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add song to playlist
router.post("/:id/songs", protect, async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove song from playlist
router.delete("/:id/songs/:songId", protect, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs = playlist.songs.filter(
      (song) => song.toString() !== req.params.songId
    );
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 