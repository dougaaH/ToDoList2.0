import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);