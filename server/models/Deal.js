import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  discount: { type: String },
  validUntil: { type: Date },
  brand: { type: String },
  image: { type: String },
  badge: { type: String },
  color: { type: String, default: '#FFD700' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Deal', dealSchema);

