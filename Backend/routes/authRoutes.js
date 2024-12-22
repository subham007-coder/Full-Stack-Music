const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Register user
router.post("/register", async (req, res) => {
  try {
    const { 
      name, 
      email, 
      confirmEmail, 
      password, 
      dateOfBirth, 
      gender 
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Validate email match
    if (email !== confirmEmail) {
      return res.status(400).json({ message: "Email addresses do not match" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      confirmEmail,
      password,
      dateOfBirth,
      gender,
      preferredArtists: [],
      preferredLanguages: []
    });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      preferredArtists: user.preferredArtists,
      preferredLanguages: user.preferredLanguages,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed", 
      error: error.message 
    });
  }
});

// Update user preferences
router.put("/preferences", protect, async (req, res) => {
  try {
    const { preferredArtists, preferredLanguages } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      if (preferredArtists) user.preferredArtists = preferredArtists;
      if (preferredLanguages) user.preferredLanguages = preferredLanguages;
      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        preferredArtists: updatedUser.preferredArtists,
        preferredLanguages: updatedUser.preferredLanguages,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update preferences error:", error);
    res.status(500).json({ 
      message: "Failed to update preferences", 
      error: error.message 
    });
  }
});

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        preferredArtists: user.preferredArtists,
        preferredLanguages: user.preferredLanguages,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ 
      message: "Failed to get profile", 
      error: error.message 
    });
  }
});

module.exports = router; 