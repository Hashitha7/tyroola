import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight, FiPhone, FiCalendar, FiClock, FiShield } from 'react-icons/fi';
import './CarServices.css';

// Assets
import mechanicHeroImg from '../Images/Mechanic/mechanic-hero.svg';
import m1Img from '../Images/Mechanic/m1.jpg';
import m2Img from '../Images/Mechanic/m2.jpg';
import australiaMapBg from '../Images/Background/B3.jpg';

const CarServices = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('Log Book Service');
  const [quoteForm, setQuoteForm] = useState({
    carMake: 'Toyota',
    carModel: 'Corolla',
    carYear: '2021',
    postcode: '2000',
    serviceType: 'Log Book Service',
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenQuote = (serviceType = 'Log Book Service') => {
    setSelectedServiceType(serviceType);
    setQuoteForm(prev => ({ ...prev, serviceType }));
    setSubmitted(false);
    setQuoteModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setQuoteModalOpen(false);
      setSubmitted(false);
    }, 2800);
  };

  return (
    <main className="car-services-page">
      {/* ── 1. Hero Section (Matching Screenshot 1) ── */}
      <section className="services-hero">
        <div className="container services-hero-inner">
          {/* Left Text */}
          <div className="services-hero-text">
            <h1 className="services-hero-title">
              Book regular car <br />
              maintenance <br />
              services. <br />
              <span className="services-hero-highlight">So Easy.</span>
            </h1>
            <p className="services-hero-sub">
              Catch minor issues before they become major repairs.
            </p>
            <button
              type="button"
              className="btn-get-service-quote"
              onClick={() => handleOpenQuote('General Maintenance')}
            >
              Get Service Quote
            </button>
          </div>

          {/* Right Illustration */}
          <div className="services-hero-visual">
            <img
              src={mechanicHeroImg}
              alt="Car maintenance mechanics and online booking"
              className="services-hero-img"
            />
          </div>
        </div>
      </section>

      {/* ── 2. Car Services Care Banner (Matching Screenshot 1 bottom) ── */}
      <section className="services-care-banner" style={{ backgroundImage: `url(${m2Img})` }}>
        <div className="services-care-overlay" />
        <div className="container services-care-content">
          <h2 className="services-care-title">Car Services Care</h2>
          <p className="services-care-sub">
            Your car deserves to keep running like new longer.
          </p>
        </div>
      </section>

      {/* ── 3. The Tyroola Advantage (Matching Screenshot 2) ── */}
      <section className="services-advantage-section">
        <div className="container">
          <div className="advantage-header">
            <h2 className="section-heading-dark">The Tyroola Advantage</h2>
            <p className="section-sub-dark">
              We work with only the best professional mechanics to get your car roadworthy!
            </p>
          </div>

          <div className="advantage-grid">
            {/* Advantage 1 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                {/* Smartphone with wrench icon */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <rect x="14" y="6" width="20" height="36" rx="4" />
                  <line x1="22" y1="38" x2="26" y2="38" strokeLinecap="round" />
                  <path d="M22 18 L26 22 M21 21 L27 27 M27 21 L21 27" stroke="#ffc700" strokeWidth="2.5" />
                  <circle cx="24" cy="24" r="5" fill="none" stroke="#ffc700" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="advantage-card-title">Book the best mechanics</h3>
              <p className="advantage-card-text">
                Tyroola has over 500 partner auto care centres all over Australia. You'll only get the best.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                {/* Price tag with percent */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <path d="M12 24 L24 12 L36 12 L36 24 L24 36 Z" />
                  <circle cx="30" cy="18" r="2.5" fill="#222" />
                  <line x1="18" y1="28" x2="28" y2="18" stroke="#ffc700" strokeWidth="2.5" />
                  <circle cx="21" cy="21" r="1.5" fill="#ffc700" />
                  <circle cx="25" cy="25" r="1.5" fill="#ffc700" />
                </svg>
              </div>
              <h3 className="advantage-card-title">Repair Now & Pay Later</h3>
              <p className="advantage-card-text">
                With interest free payments so safety won't have to wait.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="advantage-card">
              <div className="advantage-icon-box">
                {/* Receipt with dollar sign */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <path d="M14 8 L34 8 L34 40 L30 37 L26 40 L22 37 L18 40 L14 37 Z" />
                  <text x="24" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffc700" stroke="none">$</text>
                  <line x1="18" y1="31" x2="30" y2="31" stroke="#cbd5e1" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="advantage-card-title">No hidden prices</h3>
              <p className="advantage-card-text">
                No car repair bill shock! You'll know how much it will cost before any work is started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Car Maintenance Service (Matching Screenshot 3) ── */}
      <section className="car-maintenance-section">
        <div className="container">
          <div className="maintenance-header">
            <h2 className="section-heading-dark">Car Maintenance Service</h2>
            <p className="section-sub-dark">
              Let us know what your vehicle needs
            </p>
          </div>

          <div className="maintenance-grid">
            {/* Card 1: Log Book Service */}
            <div className="maintenance-card" onClick={() => handleOpenQuote('Log Book Service')}>
              <div className="maintenance-img-wrap">
                <img
                  src={m1Img}
                  alt="Log Book Service consultation"
                  className="maintenance-img"
                />
                <div className="yellow-tint-overlay" />
              </div>

              <div className="maintenance-body">
                <h3 className="maintenance-card-title">Log Book Service</h3>
                <ul className="maintenance-bullets">
                  <li>• Preventive maintenance service</li>
                  <li>• Follows your car manufacturer's recommended schedule</li>
                  <li>• To help maintain vehicle warranty</li>
                </ul>
                <button
                  type="button"
                  className="btn-select-service"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenQuote('Log Book Service');
                  }}
                >
                  Book Log Book Service
                </button>
              </div>
            </div>

            {/* Card 2: Basic Service */}
            <div className="maintenance-card" onClick={() => handleOpenQuote('Basic Service')}>
              <div className="maintenance-img-wrap">
                <img
                  src={m2Img}
                  alt="Basic Service car under hoist inspection"
                  className="maintenance-img"
                />
                <div className="yellow-tint-overlay" />
              </div>

              <div className="maintenance-body">
                <h3 className="maintenance-card-title">Basic Service</h3>
                <ul className="maintenance-bullets">
                  <li>• After every 6 months or 10,000 km(whichever is first)</li>
                  <li>• General service & inspection</li>
                  <li>• Includes Change oil & filter & general safety checks</li>
                </ul>
                <button
                  type="button"
                  className="btn-select-service"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenQuote('Basic Service');
                  }}
                >
                  Book Basic Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Australia Map Promo Banner (Matching Screenshot 4) ── */}
      <section className="promo-map-banner" style={{ backgroundImage: `url(${australiaMapBg})` }}>
        <div className="promo-map-overlay" />
        <div className="container promo-map-content">
          <h2 className="promo-map-title">
            Need Tyres? Buy Your New Set From <br />
            The #1 Online Tyre Store In Australia!
          </h2>
          <p className="promo-map-note">
            * Total monthly visits, September 2021. Similarweb
          </p>
          <Link to="/tyres" className="btn-take-me-tyres">
            Take Me To Tyroola's Tyres
          </Link>
        </div>
      </section>

      {/* ── 6. How it works (Matching Screenshots 4 & 5) ── */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="how-it-works-header">
            <h2 className="section-heading-dark">How it works</h2>
            <p className="section-sub-dark">
              It's as easy as 1-2-3. Just request a quote, choose from the offers & get your car serviced!
            </p>
          </div>

          <div className="how-grid">
            {/* Step 1 */}
            <div className="how-card">
              <div className="how-icon-box">
                {/* Clipboard with dollar sheet */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <rect x="12" y="10" width="24" height="32" rx="3" />
                  <path d="M18 10 L18 6 L30 6 L30 10 Z" fill="#fff" />
                  <line x1="18" y1="20" x2="30" y2="20" stroke="#ffc700" strokeWidth="2.5" />
                  <line x1="18" y1="26" x2="30" y2="26" />
                  <line x1="18" y1="32" x2="25" y2="32" />
                </svg>
              </div>
              <h3 className="how-step-title">1. Get a service quote</h3>
              <p className="how-step-desc">
                Enter all your details, including car make & model in our quotation form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="how-card">
              <div className="how-icon-box">
                {/* Clipboard with clock sheet */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <rect x="12" y="10" width="24" height="32" rx="3" />
                  <path d="M18 10 L18 6 L30 6 L30 10 Z" fill="#fff" />
                  <circle cx="24" cy="24" r="7" stroke="#ffc700" strokeWidth="2" />
                  <polyline points="24,20 24,24 27,24" stroke="#ffc700" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="how-step-title">2. Wait for your quotation</h3>
              <p className="how-step-desc">
                We will send you the best prices from our partner car care centres.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-card">
              <div className="how-icon-box">
                {/* Car on hoist with wrench */}
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <path d="M14 18 L18 12 L30 12 L34 18 L38 18 L38 23 L10 23 L10 18 Z" />
                  <circle cx="15" cy="23" r="2.5" fill="#222" />
                  <circle cx="33" cy="23" r="2.5" fill="#222" />
                  <line x1="24" y1="23" x2="24" y2="36" strokeWidth="3" />
                  <line x1="18" y1="36" x2="30" y2="36" strokeWidth="3" />
                  <path d="M34 30 L38 34 M38 30 L34 34" stroke="#ffc700" strokeWidth="2.5" />
                </svg>
              </div>
              <h3 className="how-step-title">3. Schedule service</h3>
              <p className="how-step-desc">
                Get your vehicle serviced at our partner repair shops or at home if available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Payment Methods Bar (Matching Screenshot 5 bottom) ── */}
      <section className="payment-methods-strip">
        <div className="container">
          <h2 className="payment-strip-title">
            Buy now, pay later & major payment methods
          </h2>
          <div className="payment-badges-row">
            <span className="pay-badge pay-zip">Zip</span>
            <span className="pay-badge pay-paypal">PayPal</span>
            <span className="pay-badge pay-visa">VISA</span>
            <span className="pay-badge pay-mc">Mastercard</span>
            <span className="pay-badge pay-amex">AMEX</span>
            <span className="pay-badge pay-apple">Apple Pay</span>
            <span className="pay-badge pay-gpay">G Pay</span>
            <span className="pay-badge pay-afterpay">afterpay</span>
          </div>
        </div>
      </section>

      {/* ── 8. Interactive "Get Service Quote" Modal ── */}
      {quoteModalOpen && (
        <div className="quote-modal-backdrop" onClick={() => setQuoteModalOpen(false)}>
          <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="quote-modal-close"
              onClick={() => setQuoteModalOpen(false)}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {submitted ? (
              <div className="quote-success-state">
                <div className="success-icon-wrap">
                  <FiCheck size={32} />
                </div>
                <h3>Quote Request Received!</h3>
                <p>
                  Thank you, <strong>{quoteForm.name || 'valued customer'}</strong>! We have matched your{' '}
                  <strong>{quoteForm.carYear} {quoteForm.carMake} {quoteForm.carModel}</strong> for{' '}
                  <strong>{quoteForm.serviceType}</strong> with top rated mechanics in {quoteForm.postcode}.
                </p>
                <div className="quote-estimate-box">
                  <span>Estimated Pricing:</span>
                  <strong>$179 – $249 AUD</strong>
                </div>
                <p className="quote-sub-note">
                  A representative will reach out to <strong>{quoteForm.email || quoteForm.phone || 'you'}</strong> within 30 minutes!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="quote-form">
                <div className="quote-header">
                  <span className="quote-badge">Tyroola Verified Mechanics</span>
                  <h3 className="quote-modal-title">Get An Instant Service Quote</h3>
                  <p className="quote-modal-subtitle">
                    Select your vehicle details to compare accredited mechanic workshops near you.
                  </p>
                </div>

                <div className="form-group-grid">
                  <div className="form-field">
                    <label>Service Type</label>
                    <select
                      value={quoteForm.serviceType}
                      onChange={(e) => setQuoteForm({ ...quoteForm, serviceType: e.target.value })}
                      className="form-input"
                    >
                      <option value="Log Book Service">Log Book Service</option>
                      <option value="Basic Service">Basic Service (6-mo / 10,000km)</option>
                      <option value="Brake & Safety Inspection">Brake & Safety Inspection</option>
                      <option value="Roadworthy Certificate">Roadworthy Certificate</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Postcode (Australia)</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. 2000"
                      value={quoteForm.postcode}
                      onChange={(e) => setQuoteForm({ ...quoteForm, postcode: e.target.value.replace(/\D/g, '') })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-grid">
                  <div className="form-field">
                    <label>Vehicle Make</label>
                    <input
                      type="text"
                      placeholder="e.g. Toyota, Mazda, Ford"
                      value={quoteForm.carMake}
                      onChange={(e) => setQuoteForm({ ...quoteForm, carMake: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Model & Year</label>
                    <input
                      type="text"
                      placeholder="e.g. Corolla 2021"
                      value={quoteForm.carModel}
                      onChange={(e) => setQuoteForm({ ...quoteForm, carModel: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-grid">
                  <div className="form-field">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone or Email</label>
                    <input
                      type="text"
                      placeholder="Mobile or email address"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit-quote">
                  Submit & Compare Quotes Now <FiArrowRight />
                </button>

                <div className="quote-modal-footer-notes">
                  <span>🔒 100% Free & No Obligation</span>
                  <span>🛡️ 500+ Partner Garages</span>
                  <span>⭐ 4.8/5 Rated Mechanics</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CarServices;

