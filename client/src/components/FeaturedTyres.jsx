import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import axios from 'axios';
import './FeaturedTyres.css';

const mockTyres = [
  {
    _id: '1', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17',
    price: 189, originalPrice: 220, category: 'SUV', rating: 4.8, reviews: 234,
    isFeatured: true, badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    _id: '2', brand: 'Michelin', model: 'Pilot Sport 5 Energy', size: '235/45R18',
    price: 245, originalPrice: 290, category: 'Sports', rating: 4.9, reviews: 189,
    isFeatured: true, badge: 'New',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&q=80',
  },
  {
    _id: '3', brand: 'BFGoodrich', model: 'All-Terrain T/A KO2', size: '265/70R17',
    price: 310, originalPrice: 360, category: '4WD', rating: 4.7, reviews: 456,
    isFeatured: true, badge: '$150 Cashback',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&q=80',
  },
  {
    _id: '4', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16',
    price: 142, originalPrice: 165, category: 'Sedan', rating: 4.6, reviews: 312,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
];

const StarRating = ({ rating }) => (
  <div className="stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} size={12} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`} />
    ))}
  </div>
);

const TyreCard = ({ tyre, delay = 0 }) => {
  const discount = tyre.originalPrice
    ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100)
    : 0;

  return (
    <div className="tyre-card card-3d" style={{ animationDelay: `${delay}s` }}>
      {/* Badge */}
      {tyre.badge && <div className="tyre-badge">{tyre.badge}</div>}
      {discount > 0 && <div className="tyre-discount-badge">-{discount}%</div>}

      {/* Image */}
      <div className="tyre-img-wrap">
        <img src={tyre.image} alt={`${tyre.brand} ${tyre.model}`} className="tyre-img" loading="lazy" />
        <div className="tyre-img-overlay" />
        <div className="tyre-category-tag">{tyre.category}</div>
      </div>

      {/* Body */}
      <div className="tyre-body">
        <div className="tyre-brand">{tyre.brand}</div>
        <h3 className="tyre-model">{tyre.model}</h3>
        <div className="tyre-size-row">
          <span className="tyre-size">{tyre.size}</span>
          <div className="tyre-rating">
            <StarRating rating={tyre.rating} />
            <span className="rating-count">({tyre.reviews})</span>
          </div>
        </div>

        <div className="tyre-pricing">
          <span className="tyre-price">${tyre.price}</span>
          {tyre.originalPrice && (
            <span className="tyre-original-price">${tyre.originalPrice}</span>
          )}
          <span className="per-tyre">/ tyre</span>
        </div>

        <div className="tyre-actions">
          <Link to={`/tyres/${tyre._id}`} className="btn btn-outline tyre-detail-btn">
            Details
          </Link>
          <button className="btn btn-primary tyre-cart-btn">
            <FiShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedTyres = () => {
  const [tyres, setTyres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'SUV', 'Sedan', 'Sports', '4WD'];

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const { data } = await axios.get('/api/tyres?featured=true');
        setTyres(data.data || mockTyres);
      } catch {
        setTyres(mockTyres);
      } finally {
        setLoading(false);
      }
    };
    fetchTyres();
  }, []);

  const filtered = activeFilter === 'All' ? tyres : tyres.filter(t => t.category === activeFilter);

  return (
    <section className="section featured-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <h2 className="section-title">Meet Michelin's Newest Energy Tyres</h2>
            <p className="section-subtitle">Premium performance. Superior comfort. Unbeatable value.</p>
          </div>
          <Link to="/tyres" className="btn btn-outline">
            All Tyres <FiArrowRight />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid-4">
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '380px', borderRadius: '16px' }} />)}
          </div>
        ) : (
          <div className="tyres-grid">
            {filtered.map((tyre, i) => (
              <TyreCard key={tyre._id} tyre={tyre} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTyres;

