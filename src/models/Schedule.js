import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: [true, 'Author ID is required!'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  videoKey: {
    type: String,
    required: false,
    trim: true,
  },
  time: {
    type: Date,
    required: [true, 'Time is required!'],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Schedule ||
  mongoose.model('Schedule', ScheduleSchema);
