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
  confirmEmail: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.email;
      },
      message: 'Email addresses must match'
    }
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
    type: String
  }],
  preferredLanguages: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  avatarUrl: { type: String },
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