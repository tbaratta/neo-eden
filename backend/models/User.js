const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number],  // [longitude, latitude]
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'MODERATOR'],
    default: 'USER'
  },
  // Location tracking
  currentLocation: {
    type: pointSchema,
    index: '2dsphere'
  },
  lastKnownLocation: {
    type: pointSchema,
    index: '2dsphere'
  },
  locationHistory: [{
    location: pointSchema,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  // Location preferences
  baseLocation: {
    type: pointSchema,
    description: "User's home base or primary location"
  },
  searchRadius: {
    type: Number,
    default: 5000,  // Default search radius in meters
    min: 100,
    max: 50000
  },
  locationUpdateTime: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp and location history before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Add to location history if current location has changed
  if (this.isModified('currentLocation') && this.currentLocation) {
    this.lastKnownLocation = this.currentLocation;
    this.locationHistory.push({
      location: this.currentLocation,
      timestamp: Date.now()
    });
    
    // Keep only last 100 locations in history
    if (this.locationHistory.length > 100) {
      this.locationHistory = this.locationHistory.slice(-100);
    }
    
    this.locationUpdateTime = Date.now();
  }
  
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update user location
userSchema.methods.updateLocation = async function(longitude, latitude) {
  this.currentLocation = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };
  return this.save();
};

// Method to get nearby users
userSchema.statics.getNearbyUsers = async function(longitude, latitude, maxDistance = 5000) {
  return this.find({
    currentLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    }
  }).select('-password');
};

// Method to return user data without sensitive information
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema); 