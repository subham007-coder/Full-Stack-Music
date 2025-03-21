const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const { sendVerificationEmail } = require("../utils/emailService");
const crypto = require("crypto");
const md5 = require("md5");

// Register user
router.post("/register", async (req, res) => {
  try {
    console.log('Received registration data:', req.body);

    const { name, email, password, dateOfBirth, gender } = req.body;

    // Validate all required fields
    if (!name || !email || !password || !gender) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Validate dateOfBirth
    if (!dateOfBirth || !dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      return res.status(400).json({
        message: "Complete date of birth is required"
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Generate avatar URL based on gender
    const seed = crypto.randomBytes(16).toString("hex");
    let style = "micah"; // default style

    if (gender === "Male") {
      style = "adventurer";
    } else if (gender === "Female") {
      style = "adventurer-neutral";
    }

    const avatarUrl = `https://api.dicebear.com/6.x/${style}/svg?seed=${seed}`;

    // Create user with avatar URL
    const user = new User({
      name,
      email,
      password,
      dateOfBirth,
      gender,
      avatarUrl // Include the generated avatar URL
    });

    await user.save();

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationToken = otp;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, otp);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    res.status(200).json({
      message: "Registration successful. Please check your email for the OTP.",
      avatarUrl // Send back the avatar URL in the response
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
      error: error.message,
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
      error: error.message,
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
      error: error.message,
    });
  }
});

// Verify email
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.redirect("/verification-feedback?message=Invalid token");
    }

    user.isVerified = true; // Mark user as verified
    user.verificationToken = undefined; // Clear the token
    await user.save();

    res.redirect("/verification-feedback?message=Email verified successfully!");
  } catch (error) {
    console.error("Email verification error:", error);
    res.redirect("/verification-feedback?message=Email verification failed");
  }
});

// Add this route at the end of your existing routes

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { otp } = req.body;

  try {
    // Check if OTP is provided
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Find user by OTP
    const user = await User.findOne({ verificationToken: otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark user as verified and clear the token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Email verified successfully!",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
});

// Resend OTP
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationToken = otp; // Store new OTP in the user document
    await user.save();

    // Send new OTP via email
    await sendVerificationEmail(email, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to resend OTP", error: error.message });
  }
});

module.exports = router;
