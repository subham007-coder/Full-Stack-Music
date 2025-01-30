const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    day: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Non-binary', 'Other']
  },
  preferredArtists: [{
    type: String,
    default: []
  }],
  preferredLanguages: [{
    type: String,
    default: []
  }],
  avatarUrl: {
    type: String,
    required: true // Making it required since we generate it during registration
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);