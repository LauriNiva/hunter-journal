import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  fur: {
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
  trophytype: {
    type: String,
    required: true
  },
  trophyorgans: {
    type: String,
    required: true
  },
  trophyrating: {
    type: String,
    required: true
  },
  images: [{
    id: { type: String },
  }]
});

export default mongoose.model('Log', logSchema);