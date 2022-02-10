import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  user: { 
    type: String,
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  furtype: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  badge: { 
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  images: [{ 
    type: String
  }]
});

export default mongoose.model('Log', logSchema);