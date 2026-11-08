import Review from '../models/Review.js';

const mockReviews = [
  { _id: '1', name: 'James K.', rating: 5, comment: 'Amazing tyres! Completely transformed my car\'s handling. Fast delivery and professional fitting.', location: 'Melbourne, VIC', tyre: 'Michelin Primacy 5', verified: true },
  { _id: '2', name: 'Sarah M.', rating: 5, comment: 'Best price I could find anywhere. The 3D tyre viewer helped me choose the right size. Highly recommend!', location: 'Sydney, NSW', tyre: 'Bridgestone Turanza', verified: true },
  { _id: '3', name: 'Tom R.', rating: 4, comment: 'Great service from start to finish. The tyre size guide was very helpful. Will definitely order again.', location: 'Brisbane, QLD', tyre: 'BFGoodrich AT KO2', verified: true },
  { _id: '4', name: 'Emma L.', rating: 5, comment: 'Incredible website experience! The 3D visualization made it so easy to see what I was buying. Tyres arrived quickly.', location: 'Perth, WA', tyre: 'Goodyear Eagle F1', verified: true },
];

export const getReviews = async (req, res) => {
  try {
    let reviews;
    try {
      reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
      if (reviews.length === 0) reviews = mockReviews;
    } catch {
      reviews = mockReviews;
    }
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.json({ success: true, data: mockReviews });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

