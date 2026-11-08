import mongoose from 'mongoose';

const tyreSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  size: { type: String, required: true },
  width: { type: Number },
  aspectRatio: { type: Number },
  rimSize: { type: Number },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, enum: ['SUV', 'Sedan', 'Sports', 'Truck', '4WD'], default: 'Sedan' },
  image: { type: String },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, default: 100 },
  features: [String],
  description: { type: String },
  isFeatured: { type: Boolean, default: false },
  badge: { type: String },
}, { timestamps: true });

export default mongoose.model('Tyre', tyreSchema);

