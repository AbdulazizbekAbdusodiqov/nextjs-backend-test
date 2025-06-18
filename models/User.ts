import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ism majburiy'],
  },
  email: {
    type: String,
    required: [true, 'Email majburiy'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Parol majburiy'],
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
