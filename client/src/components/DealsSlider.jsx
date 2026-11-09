import { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import h1 from '../Images/Hotdeals/H1.png';
import h2 from '../Images/Hotdeals/H2.png';
import h3 from '../Images/Hotdeals/H3.png';
import './DealsSlider.css';

const dealImages = [h1, h2, h3];

const DealsSlider = () => {
  const [deals, setDeals] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axios.get('/api/deals');
        const formatted = (data.data || []).map((d, idx) => ({
          ...d,
          image: dealImages[idx % dealImages.length]
        }));
        setDeals(formatted);
      } catch {
        setDeals([
          {
            _id: '1', title: 'Michelin – Up to $200 Gift Card', brand: 'Michelin',
            description: 'when you buy 4 selected Michelin tyres.',
            discount: '$200 GIFT CARD', validUntil: '2026-12-31',
            badge: 'Gift Card', color: '#1a1a2e',
            image: h1,
          },
          {
            _id: '2', title: 'Michelin – Free Fitting', brand: 'Michelin',
            description: 'Buy 4 tyres, get free fitting on selected Michelin tyres only.',
            discount: 'FREE FITTING', validUntil: '2026-11-30',
            badge: 'Free Service', color: '#0f3460',
            image: h2,
          },
          {
            _id: '3', title: 'BFGoodrich – Up to $150 Cashback', brand: 'BFGoodrich',
            description: 'when you buy 4 on-road BFGoodrich tyres.',
            discount: '$150 CASHBACK', validUntil: '2026-11-30',
            badge: 'Cashback', color: '#16213e',
            image: h3,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + deals.length) % deals.length);
  const next = () => setCurrent((c) => (c + 1) % deals.length);

  const getDealsBatch = () => {
    if (deals.length <= 3) return deals;
    const batch = [];
    for (let i = 0; i < 3; i++) {
      batch.push(deals[(current + i) % deals.length]);
    }
    return batch;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '300px', borderRadius: '16px' }} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section deals-section">
      <div className="container">
        <div className="deals-header">
          <div>
            <h2 className="section-title">🔥 Hot Deals</h2>
            <p className="section-subtitle">Limited time offers — don't miss out!</p>
          </div>
          <Link to="/deals" className="btn btn-outline">View All Deals <FiArrowRight /></Link>
        </div>

        <div className="deals-grid">
          {getDealsBatch().map((deal, i) => {
            const cardImg = dealImages[(current + i) % dealImages.length];
            return (
              <div key={deal._id || i} className="deal-card card-3d" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="deal-card-top">
                  <img src={cardImg} alt={deal.title} className="deal-top-img" />
                  <div className="deal-top-overlay" />
                </div>
                <div className="deal-card-body">
                  <span className="badge badge-yellow">{deal.badge}</span>
                  <h3 className="deal-title">{deal.title}</h3>
                  <p className="deal-desc">{deal.description}</p>
                  {deal.validUntil && (
                    <p className="deal-expiry">
                      <FiClock size={12} />
                      Valid until {formatDate(deal.validUntil)}
                    </p>
                  )}
                  <Link to="/deals" className="btn btn-outline deal-cta">
                    Shop this offer <FiArrowRight />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="deals-pagination">
          <button className="page-btn" onClick={prev}><FiArrowLeft /></button>
          {deals.map((_, i) => (
            <button
              key={i}
              className={`page-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
          <button className="page-btn" onClick={next}><FiArrowRight /></button>
        </div>
      </div>
    </section>
  );
};

export default DealsSlider;

