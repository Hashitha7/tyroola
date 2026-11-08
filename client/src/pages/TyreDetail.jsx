import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar, FiCheck, FiTruck, FiShield } from 'react-icons/fi';
import TyreCanvas from '../components/TyreCanvas';
import axios from 'axios';
import './TyreDetail.css';

const mockTyres = {
  '1': { _id: '1', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17', price: 189, originalPrice: 220, category: 'SUV', rating: 4.8, reviews: 234, isFeatured: true, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Enjoy safer stops, longer tread life, better energy consumption, all in a quiet, comfortable ride. The Michelin Primacy 5 Energy represents the pinnacle of touring tyre technology, designed for drivers who demand the very best in safety, comfort, and longevity.', features: ['Safer stops on wet roads', 'Up to 20% longer tread life', 'Improved fuel efficiency', 'Ultra-quiet ride', 'All-season performance'] },
  '2': { _id: '2', brand: 'Michelin', model: 'Pilot Sport 5 Energy', size: '235/45R18', price: 245, originalPrice: 290, category: 'Sports', rating: 4.9, reviews: 189, badge: 'New', image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=80', description: 'Enjoy performance driving, save energy. The Pilot Sport 5 Energy is Michelin\'s latest ultra-high performance tyre, delivering exceptional grip and precise handling at high speeds.', features: ['Exceptional grip', 'Short braking distances', 'High-speed stability', 'Energy saving', 'Sporty design'] },
};

const TyreDetail = () => {
  const { id } = useParams();
  const [tyre, setTyre] = useState(null);
  const [qty, setQty] = useState(4);
  const [rimColor, setRimColor] = useState('#c0a020');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTyre = async () => {
      try {
        const { data } = await axios.get(`/api/tyres/${id}`);
        setTyre(data.data);
      } catch {
        setTyre(mockTyres[id] || mockTyres['1']);
      } finally {
        setLoading(false);
      }
    };
    fetchTyre();
  }, [id]);

  if (loading) return <div className="container section"><div className="skeleton" style={{ height: '500px', borderRadius: '20px' }} /></div>;
  if (!tyre) return <div className="container section"><p>Tyre not found.</p></div>;

  const disc = tyre.originalPrice ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100) : 0;
  const totalPrice = (tyre.price * qty).toFixed(2);

  const rimOptions = [
    { label: 'Gold', color: '#c0a020' },
    { label: 'Chrome', color: '#c0c0c0' },
    { label: 'Black', color: '#222' },
    { label: 'Blue', color: '#0088cc' },
  ];

  return (
    <main className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="bc-link">Home</Link>
          <span>/</span>
          <Link to="/tyres" className="bc-link">Tyres</Link>
          <span>/</span>
          <span>{tyre.brand} {tyre.model}</span>
        </div>

        <div className="detail-grid">
          {/* Left - 3D Viewer */}
          <div className="detail-left">
            <div className="detail-canvas-wrap glass">
              <div className="canvas-label">🔄 Drag to rotate</div>
              <TyreCanvas height="450px" rimColor={rimColor} rotate={true} showParticles={true} />
            </div>

            {/* Rim Color Picker */}
            <div className="rim-picker glass">
              <h4 className="rim-title">🎨 Rim Finish</h4>
              <div className="rim-options">
                {rimOptions.map((opt) => (
                  <button
                    key={opt.color}
                    className={`rim-btn ${rimColor === opt.color ? 'active' : ''}`}
                    style={{ background: opt.color }}
                    onClick={() => setRimColor(opt.color)}
                    title={opt.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="detail-right">
            {tyre.badge && <span className="badge badge-yellow">{tyre.badge}</span>}
            <div className="detail-brand">{tyre.brand}</div>
            <h1 className="detail-model">{tyre.model}</h1>

            {/* Rating */}
            <div className="detail-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={16} fill={i < Math.floor(tyre.rating) ? '#FFD700' : 'none'} color={i < Math.floor(tyre.rating) ? '#FFD700' : '#444'} />
              ))}
              <span className="detail-rating-num">{tyre.rating}</span>
              <span className="detail-rating-count">({tyre.reviews} reviews)</span>
            </div>

            {/* Size */}
            <div className="detail-size-row">
              <span className="detail-size-label">Size</span>
              <span className="detail-size">{tyre.size}</span>
              <span className="detail-category">{tyre.category}</span>
            </div>

            <p className="detail-desc">{tyre.description}</p>

            {/* Features */}
            {tyre.features && (
              <div className="detail-features">
                {tyre.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <FiCheck size={14} className="feature-check" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pricing */}
            <div className="detail-pricing">
              <div className="detail-price-main">
                <span className="detail-price">${tyre.price}</span>
                {tyre.originalPrice && <span className="detail-orig">${tyre.originalPrice}</span>}
                {disc > 0 && <span className="detail-disc">Save {disc}%</span>}
              </div>
              <div className="detail-per">per tyre</div>
              <div className="detail-total">
                Total for {qty}: <strong>${totalPrice}</strong>
              </div>
            </div>

            {/* Qty selector */}
            <div className="detail-qty">
              <label>Quantity</label>
              <div className="qty-controls">
                {[1, 2, 4].map(n => (
                  <button key={n} className={`qty-btn ${qty === n ? 'active' : ''}`} onClick={() => setQty(n)}>
                    {n} tyre{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button className="btn btn-primary" style={{ flex: 1 }}>
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }}>
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-item">
                <FiTruck />
                <span>Free delivery available</span>
              </div>
              <div className="trust-item">
                <FiShield />
                <span>Price match guarantee</span>
              </div>
              <div className="trust-item">
                <FiCheck />
                <span>800+ fitting locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '3rem' }}>
          <Link to="/tyres" className="btn btn-dark">
            <FiArrowLeft /> Back to Tyres
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TyreDetail;

