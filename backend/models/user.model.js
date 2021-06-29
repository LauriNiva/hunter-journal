import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlenght: 4,
    unique: true
  },
  passwordHash: String,
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
  // logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);