import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight, FiTool, FiShield, FiCalendar, FiClock } from 'react-icons/fi';
import './AutoRepairs.css';

// Assets
import autoRepairHeroImg from '../Images/Mechanic/auto-repair-hero.svg';
import m3Img from '../Images/Mechanic/m3.jpg';

// 9 Auto Repair Categories from Screenshots 4 & 5
const repairCategories = [
  {
    id: 'batteries',
    title: 'Batteries',
    items: ['Battery replacement'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="repair-card-icon">
        <rect x="10" y="16" width="28" height="22" rx="3" fill="#1e2430" stroke="#111" />
        <rect x="14" y="11" width="6" height="5" rx="1" fill="#111" />
        <rect x="28" y="11" width="6" height="5" rx="1" fill="#111" />
        <path d="M26 21 L21 27 L25 27 L22 33 L29 25 L25 25 Z" fill="#ffd700" stroke="#ffd700" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'brakes',
    title: 'Brakes',
    items: [
      'Brake fluid replacement',
      'Brake pad replacement',
      'Brake rotor replacement',
      'Brake and hoses replacement',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="repair-card-icon">
        <circle cx="24" cy="24" r="16" stroke="#111" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="7" stroke="#111" strokeWidth="2" />
        {/* Caliper on left */}
        <path d="M10 16 C8 20 8 28 10 32 L15 30 C13.5 27 13.5 21 15 18 Z" fill="#00d4ff" stroke="#00b4d8" />
        {/* Vented holes */}
        <circle cx="24" cy="12" r="1.5" fill="#111" />
        <circle cx="34" cy="18" r="1.5" fill="#111" />
        <circle cx="34" cy="30" r="1.5" fill="#111" />
        <circle cx="24" cy="36" r="1.5" fill="#111" />
        <circle cx="14" cy="30" r="1.5" fill="#111" />
      </svg>
    ),
  },
  {
    id: 'transmission',
    title: 'DriveTrain / Transmission',
    items: [
      'Clutch repairs',
      'CV Joints',
      'Transmission fluid replacement',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="repair-card-icon">
        <rect x="13" y="10" width="22" height="28" rx="4" stroke="#111" strokeWidth="2.2" />
        {/* Gear shift H-pattern */}
        <line x1="18" y1="16" x2="18" y2="32" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="16" x2="24" y2="32" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="16" x2="30" y2="32" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="#00d4ff" strokeWidth="2.5" />
        <circle cx="24" cy="16" r="2" fill="#ffd700" />
      </svg>
    ),
  },
  {
    id: 'cooling',
    title: 'Cooling systems',
    items: [
      'Water pump repair/replacement',
      'Radiator hose & gasket repairs',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="repair-card-icon">
        <rect x="12" y="12" width="24" height="24" rx="3" stroke="#111" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="#111" strokeWidth="1.5" />
        {/* Fan blades */}
        <path d="M24 16 C25 20 27 20 24 24" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 24 C28 25 28 27 24 24" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 32 C23 28 21 28 24 24" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 24 C20 23 20 21 24 24" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'exhaust',
    title: 'Exhaust systems',
    items: ['Muffler replacement'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="repair-card-icon">
        <path d="M10 20 L16 20 L16 28 L10 28" stroke="#111" strokeLinecap="round" />
        <rect x="16" y="16" width="18" height="16" rx="5" stroke="#111" fill="none" />
        <path d="M34 22 L38 22 C41 22 41 16 41 16 L44 16" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'engine',
    title: 'Ignition / Engine Systems',
    items: [
      'Starter motor replacement',
      'Spark plug replacement',
      'Alternator repairs / replacement',
      'Timing belt replacement',
      'Timing chain replacement',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="repair-card-icon">
        {/* Dual Interlocking Gears & Spark */}
        <circle cx="20" cy="26" r="7" stroke="#111" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="20" cy="26" r="3" fill="#111" />
        <circle cx="31" cy="18" r="5" stroke="#00d4ff" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="31" cy="18" r="2" fill="#00d4ff" />
        <path d="M12 12 L16 16 M14 10 L18 14" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ac',
    title: 'Air Conditioning',
    items: [
      'AC compressor replacement',
      'Air conditioning deep clean & Re-gas',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="repair-card-icon">
        <rect x="10" y="14" width="28" height="15" rx="3" stroke="#111" strokeWidth="2.2" />
        <line x1="14" y1="21" x2="34" y2="21" stroke="#111" strokeWidth="1.5" />
        {/* Cold air waves */}
        <path d="M16 33 C16 36 17 37 18 39" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 33 C21 36 22 37 23 39" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 33 C26 36 27 37 28 39" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
        <path d="M31 33 C31 36 32 37 33 39" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'suspension',
    title: 'Steering & Suspension',
    items: ['Shock Absorber replacement'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" className="repair-card-icon">
        <circle cx="24" cy="24" r="14" stroke="#111" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="5" stroke="#111" strokeWidth="2" />
        <line x1="24" y1="10" x2="24" y2="19" stroke="#00d4ff" strokeWidth="2.5" />
        <line x1="13" y1="30" x2="20" y2="26" stroke="#00d4ff" strokeWidth="2.5" />
        <line x1="35" y1="30" x2="28" y2="26" stroke="#00d4ff" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'glass',
    title: 'Auto Glass',
    items: [
      'Windscreen replacement',
      'Side mirror replacement',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="repair-card-icon">
        <path d="M10 28 C12 18 36 18 38 28 Z" stroke="#111" strokeWidth="2.2" />
        {/* Wiper arm */}
        <line x1="24" y1="28" x2="32" y2="20" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const AutoRepairs = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [repairForm, setRepairForm] = useState({
    carMake: 'Ford',
    carModel: 'Ranger',
    carYear: '2022',
    postcode: '2000',
    category: 'Brakes',
    issueDescription: '',
    name: '',
    contact: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenQuote = (category = 'Brakes') => {
    setSelectedCategory(category);
    setRepairForm(prev => ({ ...prev, category }));
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
    <main className="auto-repairs-page">
      {/* ── 1. Hero Section (Matching Screenshot 1) ── */}
      <section className="repairs-hero">
        <div className="container repairs-hero-inner">
          {/* Left Text */}
          <div className="repairs-hero-text">
            <h1 className="repairs-hero-title">
              Book auto repair <br />
              services. <br />
              <span className="repairs-hero-highlight">So Easy.</span>
            </h1>
            <p className="repairs-hero-sub">
              Get the best Australian mechanics to repair your vehicle.
            </p>
            <button
              type="button"
              className="btn-get-repair-quote"
              onClick={() => handleOpenQuote('General Repair')}
            >
              Get a Repair Quote
            </button>
          </div>

          {/* Right Hero Illustration */}
          <div className="repairs-hero-visual">
            <img
              src={autoRepairHeroImg}
              alt="Auto repair mechanics and phone booking"
              className="repairs-hero-img"
            />
          </div>
        </div>
      </section>

      {/* ── 2. Auto Repairs Middle Banner (Matching Screenshots 1 & 2) ── */}
      <section className="repairs-care-banner" style={{ backgroundImage: `url(${m3Img})` }}>
        <div className="repairs-care-overlay" />
        <div className="container repairs-care-content">
          <h2 className="repairs-care-title">Auto Repairs</h2>
          <p className="repairs-care-sub">
            Get your car, ute or SUV back on the road where it belongs. <br />
            We offer a wide variety of repairs for all of your vehicle's needs via Tyroola's network of car care centre in 500 locations all over Australia.
          </p>
          <button
            type="button"
            className="btn-click-for-quote"
            onClick={() => handleOpenQuote('Full Vehicle Repair')}
          >
            Click for a quote
          </button>
        </div>
      </section>

      {/* ── 3. The Tyroola Advantage (Matching Screenshots 2 & 3) ── */}
      <section className="repairs-advantage-section">
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

      {/* ── 4. 9 Auto Repair Category Cards (Matching Screenshots 4 & 5) ── */}
      <section className="repairs-categories-section">
        <div className="container">
          <div className="categories-header">
            <h2 className="section-heading-dark">Auto Repairs</h2>
            <p className="section-sub-dark">
              Choose from our list of available auto repair services.
            </p>
          </div>

          <div className="repairs-categories-grid">
            {repairCategories.map((cat) => (
              <div
                key={cat.id}
                className="repair-category-card"
                onClick={() => handleOpenQuote(cat.title)}
              >
                {/* Dashed Circle Icon Box matching Screenshot */}
                <div className="dashed-icon-circle">
                  {cat.icon}
                </div>

                <h3 className="repair-card-title">{cat.title}</h3>

                {/* Yellow List Items */}
                <ul className="repair-items-list">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="repair-item-yellow">
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="card-quote-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenQuote(cat.title);
                  }}
                >
                  Request Quote <FiArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Interactive 3D Repair Quote Modal ── */}
      {quoteModalOpen && (
        <div className="repair-modal-backdrop" onClick={() => setQuoteModalOpen(false)}>
          <div className="repair-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="repair-modal-close"
              onClick={() => setQuoteModalOpen(false)}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {submitted ? (
              <div className="repair-success-state">
                <div className="repair-success-icon">
                  <FiCheck size={34} />
                </div>
                <h3>Repair Quotation Submitted!</h3>
                <p>
                  We have forwarded your repair request for <strong>{repairForm.category}</strong> on your{' '}
                  <strong>{repairForm.carYear} {repairForm.carMake} {repairForm.carModel}</strong> to 3 certified mechanic workshops in Australia {repairForm.postcode}.
                </p>
                <div className="repair-est-badge">
                  <span>Estimated Repair Cost:</span>
                  <strong>$160 – $320 AUD</strong>
                </div>
                <p className="repair-wait-note">
                  Expect a call or text message from our partner garage shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="repair-quote-form">
                <div className="repair-form-header">
                  <span className="repair-tag">Accredited Tyroola Mechanics</span>
                  <h3 className="repair-modal-heading">Get An Auto Repair Estimate</h3>
                  <p className="repair-modal-sub">
                    Compare verified mechanics in your local area with zero obligation.
                  </p>
                </div>

                <div className="form-two-col">
                  <div className="form-input-group">
                    <label>Repair Service Category</label>
                    <select
                      value={repairForm.category}
                      onChange={(e) => setRepairForm({ ...repairForm, category: e.target.value })}
                      className="repair-field-input"
                    >
                      {repairCategories.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-input-group">
                    <label>Australian Postcode</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. 2000"
                      value={repairForm.postcode}
                      onChange={(e) => setRepairForm({ ...repairForm, postcode: e.target.value.replace(/\D/g, '') })}
                      className="repair-field-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-input-group">
                    <label>Vehicle Make</label>
                    <input
                      type="text"
                      placeholder="e.g. Ford, Toyota, Holden"
                      value={repairForm.carMake}
                      onChange={(e) => setRepairForm({ ...repairForm, carMake: e.target.value })}
                      className="repair-field-input"
                      required
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Model & Year</label>
                    <input
                      type="text"
                      placeholder="e.g. Ranger 2022"
                      value={repairForm.carModel}
                      onChange={(e) => setRepairForm({ ...repairForm, carModel: e.target.value })}
                      className="repair-field-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-input-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={repairForm.name}
                      onChange={(e) => setRepairForm({ ...repairForm, name: e.target.value })}
                      className="repair-field-input"
                      required
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Phone / Email</label>
                    <input
                      type="text"
                      placeholder="Contact number"
                      value={repairForm.contact}
                      onChange={(e) => setRepairForm({ ...repairForm, contact: e.target.value })}
                      className="repair-field-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-repair-submit">
                  Get Quotes From Verified Mechanics <FiArrowRight />
                </button>

                <div className="repair-trust-footer">
                  <span>🔒 100% Free Quote</span>
                  <span>🛡️ Part & Labor Guarantee</span>
                  <span>⭐ 500+ Top Mechanics</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default AutoRepairs;
