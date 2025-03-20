const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  // Image fields for Cloudinary
  imageUrl: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  // Audio fields for Cloudinary
  songUrl: {
    type: String,
    required: true,
  },
  audioPublicId: {
    type: String,
    required: true,
  },
  // Additional metadata
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

module.exports = mongoose.model("Song", songSchema);