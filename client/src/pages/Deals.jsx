import { useState, useEffect } from 'react';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import axios from 'axios';
import h1 from '../Images/Hotdeals/H1.png';
import h2 from '../Images/Hotdeals/H2.png';
import h3 from '../Images/Hotdeals/H3.png';
import './Deals.css';

const dealImages = [h1, h2, h3];

const mockDeals = [
  { _id: '1', title: 'Michelin – Up to $200 Gift Card', brand: 'Michelin', description: 'when you buy 4 selected Michelin tyres. Gift card sent via email within 2 business days of qualifying purchase.', discount: '$200 Gift Card', validUntil: '2026-12-31', badge: 'Gift Card', color: '#1a1a2e' },
  { _id: '2', title: 'Michelin – Free Fitting', brand: 'Michelin', description: 'Buy 4 tyres, get free fitting on selected Michelin tyres only. Terms & conditions apply.', discount: 'FREE FITTING', validUntil: '2026-11-30', badge: 'Free Service', color: '#0f3460' },
  { _id: '3', title: 'BFGoodrich – Up to $150 Cashback', brand: 'BFGoodrich', description: 'when you buy 4 on-road BFGoodrich tyres. Cashback is applied automatically at checkout.', discount: '$150 Cashback', validUntil: '2026-11-30', badge: 'Cashback', color: '#16213e' },
  { _id: '4', title: 'Bridgestone – 10% Off', brand: 'Bridgestone', description: 'Get 10% off all Bridgestone Turanza tyres. Limited time offer — use code BSTONE10 at checkout.', discount: '10% OFF', validUntil: '2026-12-15', badge: 'Promo Code', color: '#0a2744' },
  { _id: '5', title: 'Goodyear – Free Tyre Insurance', brand: 'Goodyear', description: 'Buy any 4 Goodyear tyres and receive complimentary tyre insurance for 12 months.', discount: 'FREE INSURANCE', validUntil: '2026-12-31', badge: 'Bundle', color: '#1c0d33' },
  { _id: '6', title: 'Continental – $50 Cash Back', brand: 'Continental', description: 'Receive $50 cashback when you purchase 4 Continental PremiumContact 7 tyres.', discount: '$50 Cashback', validUntil: '2026-11-30', badge: 'Cashback', color: '#001a33' },
];

const Deals = () => {
  const [deals, setDeals] = useState(mockDeals);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('/api/deals');
        setDeals(Array.isArray(data?.data) && data.data.length > 0 ? data.data : mockDeals);
      } catch {
        setDeals(mockDeals);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main className="deals-page">
      <div className="deals-page-hero">
        <div className="container">
          <h1 className="section-title">🔥 Hot Deals & Offers</h1>
          <p className="section-subtitle">Save big on Australia's top tyre brands. Limited time only!</p>
        </div>
      </div>

      <div className="container section">
        {loading ? (
          <div className="deals-page-grid">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: '320px', borderRadius: '16px' }} />)}
          </div>
        ) : (
          <div className="deals-page-grid">
            {deals.map((deal, i) => {
              const cardImg = dealImages[i % dealImages.length];
              return (
                <div key={deal._id} className="deal-page-card card-3d" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="deal-page-top">
                    <img src={cardImg} alt={deal.title} className="deal-page-top-img" />
                    <div className="deal-page-top-overlay" />
                  </div>
                <div className="deal-page-body">
                  <div className="deal-page-badge badge badge-yellow">{deal.badge}</div>
                  <h3 className="deal-page-title">{deal.title}</h3>
                  <p className="deal-page-desc">{deal.description}</p>
                  {deal.validUntil && (
                    <div className="deal-page-expiry">
                      <FiClock size={12} />
                      Offer valid until {formatDate(deal.validUntil)}
                    </div>
                  )}
                  <a href="/tyres" className="btn btn-primary deal-page-btn">
                    Shop this offer <FiArrowRight />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </main>
  );
};

export default Deals;

