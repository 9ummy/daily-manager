import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'id is required!'],
    unique: true,
    trim: true,
  },
  pw: {
    type: String,
    required: [true, 'pw is required!'],
  },
  model: {
    type: String,
    default: '{"language": "ko", "model": "ysy", "clothes": "2"}',
  },
  uuid : {
    type : String,
  }
});

export default mongoose.models.User ||
mongoose.model('User', UserSchema);
