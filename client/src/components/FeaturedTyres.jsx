import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiShoppingCart, FiCheck } from 'react-icons/fi';
import axios from 'axios';
import './FeaturedTyres.css';

import tyreImg1 from '../Images/Tyres/t1.jpg';
import tyreImg2 from '../Images/Tyres/t2.jpg';
import tyreImg3 from '../Images/Tyres/t3.jpg';
import tyreImg4 from '../Images/Tyres/t4.jpg';

const mockTyres = [
  {
    _id: '1', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16',
    price: 142, originalPrice: 165, category: 'Sedan', rating: 4.6, reviews: 312,
    isFeatured: true, badge: 'Eco Friendly',
    image: tyreImg1,
  },
  {
    _id: '2', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17',
    price: 189, originalPrice: 220, category: 'SUV', rating: 4.8, reviews: 234,
    isFeatured: true, badge: 'Best Seller',
    image: tyreImg2,
  },
  {
    _id: '3', brand: 'Continental', model: 'PremiumContact 7', size: '225/50R17',
    price: 198, originalPrice: 230, category: 'Sedan', rating: 4.7, reviews: 267,
    isFeatured: true, badge: 'Top Rated',
    image: tyreImg3,
  },
  {
    _id: '4', brand: 'BFGoodrich', model: 'All-Terrain T/A KO2', size: '265/70R17',
    price: 310, originalPrice: 360, category: '4WD', rating: 4.9, reviews: 456,
    isFeatured: true, badge: '$150 Cashback',
    image: tyreImg4,
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
  const [added, setAdded] = useState(false);
  const discount = tyre.originalPrice
    ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    try {
      const saved = localStorage.getItem('tyroola_cart');
      const cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find(item => item._id === tyre._id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ ...tyre, qty: 1 });
      }
      localStorage.setItem('tyroola_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('tyroola_cart_change'));
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tyre-card" style={{ animationDelay: `${delay}s` }}>
      {/* Badges */}
      {tyre.badge && <div className="tyre-badge">{tyre.badge}</div>}
      {discount > 0 && <div className="tyre-discount-badge">-{discount}%</div>}

      {/* Image */}
      <div className="tyre-img-wrap">
        <img src={tyre.image} alt={`${tyre.brand} ${tyre.model}`} className="tyre-img" loading="lazy" />
        <div className="tyre-img-overlay" />
        <div className="tyre-category-tag">{tyre.category}</div>
      </div>

      <div className="tyre-card-accent" />

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
          <button
            type="button"
            className="btn btn-primary tyre-cart-btn"
            style={{ background: added ? '#10b981' : undefined }}
            onClick={handleAddToCart}
          >
            {added ? <><FiCheck size={13} /> Added!</> : <><FiShoppingCart size={13} /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedTyres = () => {
  const [tyres, setTyres] = useState(mockTyres);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'SUV', 'Sedan', 'Sports', '4WD'];

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const { data } = await axios.get('/api/tyres?featured=true');
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setTyres(data.data);
        } else {
          setTyres(mockTyres);
        }
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

