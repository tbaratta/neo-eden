import mongoose from 'mongoose';

const insightSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  prompt: { 
    type: String, 
    required: true,
    trim: true
  },
  geminiResponse: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Add any pre-save middleware
insightSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add methods if needed
insightSchema.methods.toJSON = function() {
  const insight = this.toObject();
  return insight;
};

const Insight = mongoose.model('Insight', insightSchema);

export default Insight; 