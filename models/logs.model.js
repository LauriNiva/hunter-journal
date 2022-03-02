import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
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
  weapon: {
    type: String,
    required: true
  },
  weapontype: {
    type: String,
    required: true
  },
  ammo: { 
    type: String,
    required: true
  },
  shotdistance: {
    type: String,
    required: true
  },
  reserve: {
    type: String
  },
  notes: {
    type: String
  },
  images: [{
    type: String
  }],
  likes: [{ 
    type: String,
    ref: 'User',
  }]
},
  { timestamps: true });

  logSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.user = returnedObject.user?.username ?? '??'
      delete returnedObject.__v
    }
  })

export default mongoose.model('Log', logSchema);