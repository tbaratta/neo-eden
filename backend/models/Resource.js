import mongoose from 'mongoose';

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

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere'
  },
  resourceType: {
    type: String,
    required: true,
    enum: [
      'WATER',      // Fresh water sources
      'FARMLAND',   // Arable land
      'SHELTER',    // Safe shelter locations
      'MEDICAL',    // Medical supplies/facilities
      'FOOD',       // Food sources (wild plants, etc)
      'DANGER',     // Dangerous areas
      'RADIATION',  // Radiation zones
      'POI',        // Point of Interest
      'LANDMARK'    // Notable landmarks
    ]
  },
  markerType: {
    type: String,
    required: true,
    enum: ['DEFAULT', 'RESOURCE', 'SAFE_ZONE', 'DANGER_ZONE'],
    default: 'DEFAULT'
  },
  zone: {
    type: String,
    required: true,
    enum: ['SAFE', 'NEUTRAL', 'DANGER'],
    default: 'NEUTRAL'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'UNVERIFIED', 'DEPLETED', 'DANGEROUS'],
    default: 'UNVERIFIED'
  },
  votes: {
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    },
    lastVoted: {
      type: Date,
      default: Date.now
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Update reliability score when votes change
resourceSchema.pre('save', function(next) {
  if (this.isModified('votes')) {
    const totalVotes = this.votes.upvotes + this.votes.downvotes;
    if (totalVotes > 0) {
      this.reliability = (this.votes.upvotes / totalVotes) * 100;
    }
  }
  this.updatedAt = Date.now();
  next();
});

// Index for resource type queries
resourceSchema.index({ resourceType: 1 });
// Index for reliability and status
resourceSchema.index({ reliability: -1, status: 1 });
// Index for zone-based queries
resourceSchema.index({ zone: 1 });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource; 