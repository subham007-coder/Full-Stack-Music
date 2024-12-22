const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  }],
  imageUrl: {
    type: String,
    default: "default_playlist_image.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Playlist", playlistSchema); 