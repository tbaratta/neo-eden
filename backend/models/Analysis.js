import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'PLANT',
      'SOIL',
      'WATER',
      'INSECT',
      'TRACKS',
      'CAMPSITE'
    ]
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  results: {
    identification: {
      name: String,
      confidence: Number,
      category: String
    },
    safety: {
      isSafe: Boolean,
      dangerLevel: {
        type: String,
        enum: ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'EXTREME']
      },
      warnings: [String]
    },
    properties: {
      // For plants
      isEdible: Boolean,
      isMedicinal: Boolean,
      toxicity: String,
      preparation: [String],
      
      // For soil
      soilType: String,
      fertility: String,
      recommendedCrops: [String],
      
      // For water
      waterQuality: String,
      contaminants: [String],
      purificationMethods: [String],
      
      // For insects
      isPest: Boolean,
      isHelpful: Boolean,
      dietaryInfo: String,
      
      // For animal tracks
      animalType: String,
      habitatIndicator: String,
      resourceProximity: [String],
      
      // For campsites
      floodRisk: String,
      fireRisk: String,
      resourceAccess: [String],
      shelterQuality: String
    }
  },
  aiResponse: {
    summary: String,
    recommendations: [String],
    warnings: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  relatedResource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
analysisSchema.index({ location: '2dsphere' });
// Index for type-based queries
analysisSchema.index({ type: 1 });
// Index for related resources
analysisSchema.index({ relatedResource: 1 });

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis; 