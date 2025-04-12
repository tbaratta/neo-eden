const mongoose = require('mongoose');

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

const mapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere'
  },
  type: {
    type: String,
    required: true,
    enum: ['POI', 'LANDMARK', 'RESOURCE', 'DANGER'], // Point of Interest types
    default: 'POI'
  },
  markerType: {
    type: String,
    required: true,
    enum: ['DEFAULT', 'QUEST', 'VENDOR', 'ENEMY', 'RESOURCE', 'SAFE_ZONE', 'DANGER_ZONE'],
    default: 'DEFAULT'
  },
  zone: {
    type: String,
    required: true,
    enum: ['SAFE', 'NEUTRAL', 'DANGER', 'PVP', 'EVENT'],
    default: 'NEUTRAL'
  },
  zoneColor: {
    type: String,
    default: '#808080' // Default gray color
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

// Update the updatedAt timestamp before saving
mapSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Map', mapSchema); 