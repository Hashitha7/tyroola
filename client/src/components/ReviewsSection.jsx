import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import axios from 'axios';
import './ReviewsSection.css';

const mockReviews = [
  { _id: '1', name: 'James K.', rating: 5, comment: 'Amazing tyres! Completely transformed my car\'s handling. Fast delivery and professional fitting.', location: 'Melbourne, VIC', tyre: 'Michelin Primacy 5', verified: true },
  { _id: '2', name: 'Sarah M.', rating: 5, comment: 'Best price I could find anywhere. The website is so easy to use. Highly recommend!', location: 'Sydney, NSW', tyre: 'Bridgestone Turanza', verified: true },
  { _id: '3', name: 'Tom R.', rating: 4, comment: 'Great service from start to finish. The tyre size guide was very helpful. Will definitely order again.', location: 'Brisbane, QLD', tyre: 'BFGoodrich AT KO2', verified: true },
  { _id: '4', name: 'Emma L.', rating: 5, comment: 'Incredible website experience! Tyres arrived quickly. The 3D visualization made it so easy to choose.', location: 'Perth, WA', tyre: 'Goodyear Eagle F1', verified: true },
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('/api/reviews');
        setReviews(data.data || mockReviews);
      } catch {
        setReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="section reviews-section">
      <div className="container">
        {/* Header */}
        <div className="reviews-header">
          <h2 className="section-title">Voted Australia's Best Tyre Shop</h2>
          <p className="section-subtitle">Buy Tyres, save money, time, and energy</p>
        </div>

        {/* Google Rating Card */}
        <div className="google-rating-card glass">
          <div className="google-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} size={28} fill="#FFD700" color="#FFD700" />
            ))}
          </div>
          <div className="google-brand">
            <span style={{ color: '#4285F4', fontWeight: 700 }}>G</span>
            <span style={{ color: '#EA4335', fontWeight: 700 }}>o</span>
            <span style={{ color: '#FBBC05', fontWeight: 700 }}>o</span>
            <span style={{ color: '#4285F4', fontWeight: 700 }}>g</span>
            <span style={{ color: '#34A853', fontWeight: 700 }}>l</span>
            <span style={{ color: '#EA4335', fontWeight: 700 }}>e</span>
          </div>
          <div className="google-score">
            <span className="google-num glow-text">4.7</span>
            <span className="google-label">out of 5</span>
          </div>
          <div className="google-count">from 4530+ reviews</div>
        </div>

        {/* Review Cards */}
        <div className="reviews-grid">
          {(loading ? mockReviews : reviews).map((review, i) => (
            <div key={review._id} className="review-card card-3d" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="review-top">
                <div className="reviewer-avatar">
                  {review.name.charAt(0)}
                </div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-loc">{review.location}</div>
                </div>
                {review.verified && <div className="verified-badge">✓ Verified</div>}
              </div>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} size={12} fill={j < review.rating ? '#FFD700' : 'none'} color={j < review.rating ? '#FFD700' : '#444'} />
                ))}
              </div>
              <p className="review-comment">"{review.comment}"</p>
              {review.tyre && <div className="review-tyre">Purchased: {review.tyre}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

