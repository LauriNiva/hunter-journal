import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlenght: 4,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlenght: 4,
  },
  _id: {
    type: String,
    required: true,
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);