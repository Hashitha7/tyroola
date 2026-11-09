import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiX } from 'react-icons/fi';
import heroBg from '../Images/Background/B1.jpg';
import car1 from '../Images/Cars/c1.png';
import car2 from '../Images/Cars/c2.png';
import car3 from '../Images/Cars/c3.png';
import car4 from '../Images/Cars/C4.png';
import TyreSizeModal from './TyreSizeModal';
import './Hero.css';

const carImages = [car1, car2, car3, car4];

const Hero = () => {
  const navigate = useNavigate();
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // 'size' | 'rego' | null
  const [tyreSize, setTyreSize] = useState({ width: '205', aspectRatio: '55', rim: '16' });
  const [rego, setRego] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % carImages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSizeSearch = (e) => {
    e.preventDefault();
    const { width, aspectRatio, rim } = tyreSize;
    if (width && aspectRatio && rim) {
      navigate(`/tyres?width=${width}&aspectRatio=${aspectRatio}&rimSize=${rim}`);
    } else {
      navigate('/tyres');
    }
  };

  const handleRegoSearch = (e) => {
    e.preventDefault();
    navigate('/tyres');
  };

  return (
    <div className="hero-wrapper">
      {/* Top Trust Features Strip (Exact as screenshot) */}
      <div className="hero-trust-bar">
        <div className="container">
          <div className="trust-bar-grid">
            <div className="trust-bar-item">
              <span className="trust-icon">🚚</span>
              <div className="trust-text">
                <span className="trust-head">NATIONWIDE FITTING & DELIVERY</span>
                <span className="trust-sub">800+ Locations, Easy Service</span>
              </div>
            </div>

            <div className="trust-bar-item">
              <span className="trust-icon">🐷</span>
              <div className="trust-text">
                <span className="trust-head">PRICE MATCH GUARANTEE</span>
                <span className="trust-sub">We'll Beat Lower Prices 3%</span>
              </div>
            </div>

            <div className="trust-bar-item">
              <span className="trust-icon">⚡</span>
              <div className="trust-text">
                <span className="trust-head">0% INTEREST WITH AFTERPAY</span>
                <span className="trust-sub">Easy Payment Options</span>
              </div>
            </div>

            <div className="trust-bar-item">
              <span className="trust-icon">👍</span>
              <div className="trust-text">
                <span className="trust-head">4.7/5 ON GOOGLE REVIEWS</span>
                <span className="trust-sub">Over 4530+ Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        {/* Chevron Diagonal Graphics Background */}
        <div className="hero-chevron-bg">
          <div className="chevron-stripe stripe-1" />
          <div className="chevron-stripe stripe-2" />
        </div>

        <div className="container hero-container">
          <div className="hero-content-row">
            {/* Left Content */}
            <div className="hero-left">
              <h1 className="hero-headline">
                <span className="line-1">Buy tyres online.</span>
                <span className="line-2">Fit locally. Done.</span>
              </h1>
              <p className="hero-subhead">
                All brands. All options. All across Australia.
              </p>
            </div>

            {/* Right Car Graphic: C1.png, C2.jpg, C3.jpg, C4.jpg auto-carousel */}
            <div className="hero-car-visual">
              <div className="hero-car-carousel">
                {carImages.map((car, idx) => (
                  <img
                    key={idx}
                    src={car}
                    alt={`Tyroola Vehicle ${idx + 1}`}
                    className={`hero-car-img hero-car-img-${idx + 1} ${idx === currentCarIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
              <div className="car-carousel-dots">
                {carImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`car-dot ${idx === currentCarIndex ? 'active' : ''}`}
                    onClick={() => setCurrentCarIndex(idx)}
                    title={`Vehicle ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* EXACT SEARCH BAR AS CIRCLED IN USER SCREENSHOT */}
          <div className="hero-exact-search-bar">
            {/* Left Yellow Label */}
            <div className="search-label-yellow">
              <span>Search for tyres by</span>
            </div>

            {/* Middle Button: Tyre Size (Easiest) */}
            <button
              type="button"
              className={`search-tab-pill tab-tyre-size ${activeModal === 'size' ? 'active' : ''}`}
              onClick={() => setActiveModal(activeModal === 'size' ? null : 'size')}
            >
              <div className="tab-pill-left">
                <div className="wheel-icon-svg">
                  <svg viewBox="0 0 36 36" width="28" height="28">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#222" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="9" fill="none" stroke="#222" strokeWidth="2" />
                    <circle cx="18" cy="18" r="3.5" fill="#222" />
                    {Array.from({ length: 8 }).map((_, i) => {
                      const ang = (i / 8) * Math.PI * 2;
                      const x1 = 18 + Math.cos(ang) * 9;
                      const y1 = 18 + Math.sin(ang) * 9;
                      const x2 = 18 + Math.cos(ang) * 15;
                      const y2 = 18 + Math.sin(ang) * 15;
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#222" strokeWidth="1.8" />;
                    })}
                  </svg>
                </div>
                <span className="tab-title">Tyre Size</span>
                <span className="easiest-pill-badge">Easiest</span>
              </div>
              <FiArrowRight className="blue-arrow-icon" />
            </button>

            {/* Vertical Divider Line */}
            <div className="search-tabs-divider" />

            {/* Right Button: Rego */}
            <button
              type="button"
              className={`search-tab-pill tab-rego ${activeModal === 'rego' ? 'active' : ''}`}
              onClick={() => setActiveModal(activeModal === 'rego' ? null : 'rego')}
            >
              <div className="tab-pill-left">
                <div className="rego-box-icon">
                  <span>AB-123</span>
                </div>
                <span className="tab-title">Rego</span>
              </div>
              <FiArrowRight className="blue-arrow-icon" />
            </button>
          </div>

          {/* Multi-Step 3D Tyre Size Modal (Matching attached Screenshots) */}
          <TyreSizeModal
            isOpen={activeModal === 'size'}
            onClose={() => setActiveModal(null)}
            onSwitchToRego={() => setActiveModal('rego')}
          />

          {/* Interactive 3D Search Popdown Modal for Rego */}
          {activeModal === 'rego' && (
            <div className="hero-search-dropdown glass">
              <div className="dropdown-header">
                <h4>🚗 Search by Vehicle Rego</h4>
                <button
                  type="button"
                  className="dropdown-close-btn"
                  onClick={() => setActiveModal(null)}
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleRegoSearch} className="rego-search-row">
                <div className="rego-input-wrap">
                  <span className="rego-aus-flag">🇦🇺</span>
                  <input
                    type="text"
                    className="hero-rego-input"
                    value={rego}
                    onChange={(e) => setRego(e.target.value.toUpperCase())}
                    placeholder="ENTER REGO (e.g. ABC123)"
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn btn-primary hero-dropdown-submit">
                  <span>Find My Tyres</span>
                  <FiArrowRight />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
