import { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft, FiClock, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import h1 from '../Images/Hotdeals/H1.png';
import h2 from '../Images/Hotdeals/H2.png';
import h3 from '../Images/Hotdeals/H3.png';
import './DealsSlider.css';

const dealImages = [h1, h2, h3];

/* ── Per-deal modal content (matches screenshots) ── */
const dealModalData = {
  '1': {
    badge: 'Special Offer',
    title: 'Buy 4 Get Up to $200 Gift Card on Selected Michelin Tyres',
    subtitle: 'Buy a set of 4 selected Michelin tyres and receive gift card based on tyre size',
    infoLabel: 'Tiers:',
    infoText: '17 inch and below — $100 Gift card | 18 and 19 inch — $150 Gift card | 20″ and above — $200 Gift card',
    ctaLabel: 'Shop Michelin Tyres',
    disclaimers: [
      'Gift card amount varies by tyre size purchased.',
      'Offer valid on selected Michelin tyres purchased from Tyroola.',
      'Valid until December 31. T&Cs apply.',
    ],
    tcLink: '#',
  },
  '2': {
    badge: 'Special Offer',
    title: 'Get Free Fitting When You Buy 4 Selected Michelin Tyres',
    subtitle: 'Get Free Fitting When You Buy 4 Selected Michelin Tyres',
    infoLabel: 'Eligible patterns:',
    infoText: 'Pilot Sport 5 | Pilot Sport 5 Energy | Primacy 5 | Primacy 5 Energy',
    ctaLabel: 'Shop Michelin Tyres',
    disclaimers: [
      'Free fitting applies to a set of 4 eligible tyres only.',
      'Offer valid on eligible Michelin tyres purchased from Tyroola.',
      'Valid until November 30. T&Cs apply.',
    ],
    tcLink: '#',
  },
  '3': {
    badge: 'Special Offer',
    title: 'Buy 4 Get Up to $150 Cashback on Selected BFGoodrich On-Road Tyres',
    subtitle: 'Buy a set of 4 selected BFGoodrich on-road tyres and receive cashback based on tyre size',
    infoLabel: 'Eligible pattern:',
    infoText: 'Advantage Control | Advantage Touring | G-Force Phenom T/A\nTiers: 17 inch and below — $80 cashback | 18 inch and above — $150 cashback',
    ctaLabel: 'Shop BFGoodrich Tyres',
    disclaimers: [
      'Cashback amount varies by tyre size purchased.',
      'Offer valid on eligible BFGoodrich tyres purchased from Tyroola.',
      'Valid until November 30. T&Cs apply.',
    ],
    tcLink: '#',
  },
};

/* ── Deal Offer Modal ── */
const DealOfferModal = ({ deal, onClose }) => {
  const modal = dealModalData[deal._id] || {
    badge: 'Special Offer',
    title: deal.title,
    subtitle: deal.description,
    infoLabel: 'Offer Details:',
    infoText: deal.discount,
    ctaLabel: `Shop ${deal.brand} Tyres`,
    disclaimers: ['Offer valid while stocks last.', 'T&Cs apply.'],
    tcLink: '#',
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="deal-modal-backdrop" onClick={handleBackdrop}>
      <div className="deal-modal-box">
        {/* Close Button */}
        <button className="deal-modal-close" onClick={onClose} aria-label="Close">
          <FiX size={18} />
        </button>

        {/* Special Offer Pill */}
        <div className="deal-modal-pill">{modal.badge}</div>

        {/* Title */}
        <h2 className="deal-modal-title">{modal.title}</h2>

        {/* Subtitle */}
        <p className="deal-modal-subtitle">{modal.subtitle}</p>

        {/* Info Box */}
        <div className="deal-modal-info-box">
          <span className="deal-modal-info-label">{modal.infoLabel}</span>
          <span className="deal-modal-info-text">{modal.infoText}</span>
        </div>

        {/* CTA Button */}
        <Link to="/tyres" className="deal-modal-cta-btn" onClick={onClose}>
          {modal.ctaLabel}
        </Link>

        {/* Disclaimer Box */}
        <div className="deal-modal-disclaimer-box">
          <strong>Disclaimer:</strong>
          <ul>
            {modal.disclaimers.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const DealsSlider = () => {
  const [deals, setDeals] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeDeal, setActiveDeal] = useState(null); // deal object for modal

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
    <>
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
                    {/* SHOP THIS OFFER button — opens modal */}
                    <button
                      className="btn btn-outline deal-cta"
                      onClick={() => setActiveDeal(deal)}
                    >
                      Shop this offer <FiArrowRight />
                    </button>
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

      {/* Deal Offer Modal */}
      {activeDeal && (
        <DealOfferModal deal={activeDeal} onClose={() => setActiveDeal(null)} />
      )}
    </>
  );
};

export default DealsSlider;
