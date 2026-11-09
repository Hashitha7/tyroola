import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight, FiShield, FiCalendar, FiClock, FiFileText, FiAward, FiSearch, FiCompass, FiDollarSign } from 'react-icons/fi';
import './VehicleInspections.css';

// Images
import inspectionHeroImg from '../Images/Mechanic/inspection-hero.svg';
import m1Img from '../Images/Mechanic/m1.jpg';

// 6 Comprehensive Vehicle Inspection Types from Screenshot 4
const inspectionCategories = [
  {
    id: 'pink-blue-slips',
    title: 'Pink / Blue Slips',
    description: 'Mandatory annual safety check for NSW registration renewal (Pink Slip) or unregistered / interstate vehicles (Blue Slip).',
    bullets: [
      'RMS & transport authority approved',
      'Tyres, brakes, suspension & lights check',
      'Electronic e-Safety slip submitted instantly',
    ],
    priceEst: '$45 - $75',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Checklist document */}
        <rect x="12" y="8" width="28" height="36" rx="4" stroke="#111827" strokeWidth="2.4" fill="none" />
        <line x1="18" y1="16" x2="34" y2="16" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" />
        {/* Checkmark 1 */}
        <path d="M18 24 L22 28 L32 20" stroke="#00b4d8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Checkmark 2 */}
        <path d="M18 34 L22 38 L32 30" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'roadworthy',
    title: 'Roadworthy Certificate',
    description: 'Official safety certificate (RWC) verifying your vehicle meets road safety standards for sale, re-registration or transfer.',
    bullets: [
      'Comprehensive steering & brake testing',
      'Seatbelts, airbags & structural safety',
      'Official government certificate issued',
    ],
    priceEst: '$99 - $149',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Certificate document */}
        <rect x="11" y="7" width="30" height="38" rx="3" stroke="#111827" strokeWidth="2.4" fill="none" />
        <line x1="17" y1="15" x2="35" y2="15" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="21" x2="27" y2="21" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        {/* Ribbon rosette seal */}
        <circle cx="26" cy="31" r="7" stroke="#f5a623" strokeWidth="2.5" fill="#fef3c7" />
        <path d="M23 37 L21 44 L26 41 L31 44 L29 37" fill="#f5a623" stroke="#d97706" strokeWidth="1" />
        <path d="M23 31 L25 33 L29 29" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'pre-purchase',
    title: 'Pre-Sale Inspection & Pre-Purchase Inspection',
    description: 'Forensic multi-point inspection before buying or selling a used vehicle to reveal hidden crash damage or engine defects.',
    bullets: [
      '150+ point bumper-to-bumper inspection',
      'Diagnostic scan for hidden OBD fault codes',
      'Detailed digital report with photos & repair quote',
    ],
    priceEst: '$189 - $279',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Car silhouette */}
        <path d="M8 28 L14 19 C15 17 18 16 21 16 L33 16 C36 16 39 17 40 19 L46 28 Z" stroke="#111827" strokeWidth="2" />
        <rect x="6" y="28" width="40" height="8" rx="3" stroke="#111827" strokeWidth="2" fill="none" />
        <circle cx="15" cy="36" r="3.5" fill="#111827" />
        <circle cx="37" cy="36" r="3.5" fill="#111827" />
        {/* Large Magnifying Glass over car */}
        <circle cx="28" cy="22" r="9" stroke="#00b4d8" strokeWidth="2.8" fill="rgba(0, 180, 216, 0.12)" />
        <line x1="34.5" y1="28.5" x2="44" y2="38" stroke="#00b4d8" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'warranty',
    title: 'End of Warranty Preparation',
    description: 'Specialist audit before your manufacturer warranty expires, catching worn parts so they are repaired under factory warranty free.',
    bullets: [
      'Audit against manufacturer defect bulletins',
      'Transmission, turbo & engine seals check',
      'Documentation ready for dealer warranty claim',
    ],
    priceEst: '$149 - $199',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Rosette warranty badge */}
        <circle cx="26" cy="22" r="13" stroke="#111827" strokeWidth="2.4" fill="none" />
        <circle cx="26" cy="22" r="9" stroke="#f5a623" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M22 22 L25 25 L30 19" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dual hanging ribbons */}
        <path d="M19 32 L15 45 L22 41 L25 35" fill="#f5a623" stroke="#d97706" strokeWidth="1" />
        <path d="M33 32 L37 45 L30 41 L27 35" fill="#f5a623" stroke="#d97706" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'road-trip',
    title: 'Road Trip Inspection',
    description: 'Complete reliability check before long Australian highway trips or outback adventures, avoiding breakdowns in remote areas.',
    bullets: [
      'Cooling system, radiator & hose pressure test',
      'Brake pad wear, brake fluid & tyre tread depth',
      'Alternator, battery health & wiper blade check',
    ],
    priceEst: '$89 - $139',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Road perspective leading to distance */}
        <path d="M22 10 L30 10 L39 42 L13 42 Z" stroke="#111827" strokeWidth="2.4" fill="none" />
        {/* Road center dashed lines */}
        <line x1="26" y1="13" x2="26" y2="18" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="23" x2="26" y2="30" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="35" x2="26" y2="41" stroke="#f5a623" strokeWidth="2.8" strokeLinecap="round" />
        {/* Horizon Sun / Compass mark */}
        <circle cx="26" cy="9" r="3" fill="#f5a623" />
      </svg>
    ),
  },
  {
    id: 'insurance-loan',
    title: 'Car Insurance & Car Loan Requierements',
    description: 'Formal vehicle valuation and structural condition assessment as required by Australian banks, finance companies & insurance underwriters.',
    bullets: [
      'Accredited inspection certificate for finance',
      'Vehicle identity & PPSR clean title confirmation',
      'Compliant with top Australian lenders & insurers',
    ],
    priceEst: '$120 - $175',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="2" className="inspection-card-icon">
        {/* Security Shield */}
        <path d="M26 8 L39 13 C39 25 34 35 26 42 C18 35 13 25 13 13 Z" stroke="#111827" strokeWidth="2.4" fill="none" />
        {/* Dollar Coin inside Shield */}
        <circle cx="26" cy="24" r="8" stroke="#f5a623" strokeWidth="2.2" fill="#fef3c7" />
        <text x="26" y="29" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d97706" stroke="none">$</text>
      </svg>
    ),
  },
];

const VehicleInspections = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState('Pink / Blue Slips');
  const [inspectionForm, setInspectionForm] = useState({
    carMake: 'Toyota',
    carModel: 'Hilux',
    carYear: '2022',
    postcode: '2000',
    inspectionType: 'Pink / Blue Slips',
    preferredDate: '',
    customerName: '',
    customerPhone: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenQuote = (type = 'Pink / Blue Slips') => {
    setSelectedInspection(type);
    setInspectionForm(prev => ({ ...prev, inspectionType: type }));
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
    <main className="vehicle-inspections-page">
      {/* ── 1. Hero Section (Matching Screenshot 1) ── */}
      <section className="inspections-hero">
        <div className="container inspections-hero-inner">
          {/* Left Text */}
          <div className="inspections-hero-text">
            <h1 className="inspections-hero-title">
              Book A Vehicle Inspection. <br />
              <span className="inspections-hero-highlight">So Easy.</span>
            </h1>
            <p className="inspections-hero-sub">
              Get the best Australian inspectors to greenlight your vehicle.
            </p>
            <button
              type="button"
              className="btn-get-inspection-quote"
              onClick={() => handleOpenQuote('Pink / Blue Slips')}
            >
              Get an Inspection Quote
            </button>
          </div>

          {/* Right Hero Visual (Car on scissor hoist + inspectors + glowing phone checkmark) */}
          <div className="inspections-hero-visual">
            <img
              src={inspectionHeroImg}
              alt="Vehicle Inspection on Hydraulic Hoist"
              className="inspections-hero-img"
            />
          </div>
        </div>
      </section>

      {/* ── 2. Vehicle Inspections Near Me Middle Banner (Matching Screenshots 1 & 2) ── */}
      <section className="inspections-care-banner" style={{ backgroundImage: `url(${m1Img})` }}>
        <div className="inspections-care-overlay" />
        <div className="container inspections-care-content">
          <h2 className="inspections-care-title">Vehicle Inspections Near Me</h2>
          <p className="inspections-care-sub">
            Ensure safety & drive worry free with a comprehensive vehicle inspection. <br />
            Uncover its history via a forensic like examination conducted by certified professionals from Tyroola's vast network of Australian partner vehicle inspectors.
          </p>
          <button
            type="button"
            className="btn-click-for-quote"
            onClick={() => handleOpenQuote('Vehicle Inspections Near Me')}
          >
            Click for a quote
          </button>
        </div>
      </section>

      {/* ── 3. The Tyroola Advantage (Matching Screenshots 2 & 3) ── */}
      <section className="advantage-section">
        <div className="container">
          <div className="advantage-header">
            <h2 className="section-heading-dark">The Tyroola Advantage</h2>
            <p className="section-sub-dark">
              We work with only the best professional mechanics to get your car roadworthy!
            </p>
          </div>

          <div className="advantage-grid">
            {/* Card 1 */}
            <div className="advantage-card advantage-card-3d">
              <div className="advantage-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <rect x="14" y="6" width="20" height="36" rx="4" />
                  <line x1="22" y1="38" x2="26" y2="38" strokeLinecap="round" />
                  <path d="M22 18 L26 22 M21 21 L27 27 M27 21 L21 27" stroke="#f5a623" strokeWidth="2.5" />
                  <circle cx="24" cy="24" r="5" fill="none" stroke="#f5a623" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="advantage-card-title">Book the best mechanics</h3>
              <p className="advantage-card-text">
                Tyroola has over 500 partner auto care centres all over Australia. You'll only get the best.
              </p>
            </div>

            {/* Card 2 */}
            <div className="advantage-card advantage-card-3d">
              <div className="advantage-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <path d="M12 24 L24 12 L36 12 L36 24 L24 36 Z" />
                  <circle cx="30" cy="18" r="2.5" fill="#222" />
                  <line x1="18" y1="28" x2="28" y2="18" stroke="#f5a623" strokeWidth="2.5" />
                  <circle cx="21" cy="21" r="1.5" fill="#f5a623" />
                  <circle cx="25" cy="25" r="1.5" fill="#f5a623" />
                </svg>
              </div>
              <h3 className="advantage-card-title">Repair Now & Pay Later</h3>
              <p className="advantage-card-text">
                With interest free payments so safety won't have to wait.
              </p>
            </div>

            {/* Card 3 */}
            <div className="advantage-card advantage-card-3d">
              <div className="advantage-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="adv-icon">
                  <path d="M14 8 L34 8 L34 40 L30 37 L26 40 L22 37 L18 40 L14 37 Z" />
                  <text x="24" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#f5a623" stroke="none">$</text>
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

      {/* ── 4. Comprehensive Vehicle Inspections 6 Cards (Matching Screenshot 4) ── */}
      <section className="comprehensive-inspections-section">
        <div className="container">
          <div className="comprehensive-header">
            <h2 className="section-heading-dark">Comprehensive Vehicle Inspections</h2>
            <p className="section-sub-dark">
              Get your vehicle inspected for your peace of mind.
            </p>
          </div>

          <div className="inspections-grid">
            {inspectionCategories.map((item) => (
              <div
                key={item.id}
                className="inspection-card-3d"
                onClick={() => handleOpenQuote(item.title)}
              >
                {/* Dashed Circular Icon Frame */}
                <div className="inspection-dashed-circle">
                  {item.icon}
                </div>

                <h3 className="inspection-card-title">{item.title}</h3>
                <p className="inspection-card-desc">{item.description}</p>

                {/* Key inspection highlights */}
                <ul className="inspection-card-bullets">
                  {item.bullets.map((b, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="inspection-card-footer">
                  <span className="est-badge">Avg {item.priceEst} AUD</span>
                  <button
                    type="button"
                    className="btn-card-quote"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuote(item.title);
                    }}
                  >
                    Get Quote <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. How It Works (Matching Screenshot 5) ── */}
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
            <div className="how-card how-card-3d">
              <div className="how-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <rect x="12" y="10" width="24" height="32" rx="3" />
                  <path d="M18 10 L18 6 L30 6 L30 10 Z" fill="#fff" />
                  <line x1="18" y1="20" x2="30" y2="20" stroke="#f5a623" strokeWidth="2.5" />
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
            <div className="how-card how-card-3d">
              <div className="how-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <rect x="12" y="10" width="24" height="32" rx="3" />
                  <path d="M18 10 L18 6 L30 6 L30 10 Z" fill="#fff" />
                  <circle cx="24" cy="24" r="7" stroke="#f5a623" strokeWidth="2" />
                  <polyline points="24,20 24,24 27,24" stroke="#f5a623" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="how-step-title">2. Wait for yourquotation</h3>
              <p className="how-step-desc">
                We will send you the best prices from our partner car care centres.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-card how-card-3d">
              <div className="how-icon-box">
                <svg viewBox="0 0 48 48" fill="none" stroke="#222" strokeWidth="2.2" className="how-icon">
                  <line x1="8" y1="38" x2="40" y2="38" strokeWidth="2.5" />
                  <rect x="14" y="24" width="20" height="10" rx="3" />
                  <circle cx="19" cy="34" r="3" fill="#222" />
                  <circle cx="29" cy="34" r="3" fill="#222" />
                  <path d="M18 14 L22 18 L20 20 L16 16 Z" fill="#f5a623" />
                </svg>
              </div>
              <h3 className="how-step-title">3. Schedule service</h3>
              <p className="how-step-desc">
                Choose the best date & certified inspector partner near you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Australian Payment Methods Strip ── */}
      <section className="payment-strip">
        <div className="container payment-strip-inner">
          <span className="payment-label">Flexible Australian Payment Options:</span>
          <div className="payment-badges">
            <span className="pay-badge">Afterpay</span>
            <span className="pay-badge">Zip Pay</span>
            <span className="pay-badge">PayPal</span>
            <span className="pay-badge">Visa</span>
            <span className="pay-badge">Mastercard</span>
            <span className="pay-badge">AMEX</span>
          </div>
        </div>
      </section>

      {/* ── 7. Interactive 3D Vehicle Inspection Quote & Booking Modal ── */}
      {quoteModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setQuoteModalOpen(false)}>
          <div className="quote-modal-3d" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setQuoteModalOpen(false)}
            >
              <FiX />
            </button>

            {submitted ? (
              <div className="quote-success-state">
                <div className="success-icon-badge">
                  <FiCheck />
                </div>
                <h3>Vehicle Inspection Request Greenlighted!</h3>
                <p>
                  We have forwarded your <strong>{inspectionForm.inspectionType}</strong> request for your{' '}
                  <strong>{inspectionForm.carYear} {inspectionForm.carMake} {inspectionForm.carModel}</strong> to accredited partner vehicle inspectors in postcode{' '}
                  <strong>{inspectionForm.postcode}</strong>.
                </p>
                <div className="success-reference">
                  <span>Inspection Ticket: <strong>INS-AU-{Math.floor(100000 + Math.random() * 900000)}</strong></span>
                </div>
                <p className="success-sub">You will receive quotes & instant booking confirmation within 15 minutes.</p>
              </div>
            ) : (
              <div>
                <div className="modal-header-3d">
                  <span className="modal-pill">Tyroola 3D Certified Inspection</span>
                  <h3 className="modal-title">Get an Inspection Quote</h3>
                  <p className="modal-subtitle">
                    Fast quote from accredited Australian inspectors near you.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="quote-form-grid">
                  {/* Inspection Type Selector */}
                  <div className="form-group-full">
                    <label>Selected Inspection Type</label>
                    <select
                      value={inspectionForm.inspectionType}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, inspectionType: e.target.value })}
                      className="form-select"
                    >
                      {inspectionCategories.map((cat) => (
                        <option key={cat.id} value={cat.title}>
                          {cat.title} ({cat.priceEst} AUD)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Car Make & Model */}
                  <div className="form-group">
                    <label>Car Make</label>
                    <select
                      value={inspectionForm.carMake}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, carMake: e.target.value })}
                      className="form-select"
                    >
                      <option value="Toyota">Toyota</option>
                      <option value="Ford">Ford</option>
                      <option value="Mazda">Mazda</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Mitsubishi">Mitsubishi</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Holden">Holden</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Nissan">Nissan</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Car Model</label>
                    <input
                      type="text"
                      value={inspectionForm.carModel}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, carModel: e.target.value })}
                      placeholder="e.g. Hilux, Ranger, RAV4"
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Year & Postcode */}
                  <div className="form-group">
                    <label>Year of Manufacture</label>
                    <input
                      type="number"
                      value={inspectionForm.carYear}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, carYear: e.target.value })}
                      placeholder="e.g. 2020"
                      min="1980"
                      max="2026"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Postcode / Suburb</label>
                    <input
                      type="text"
                      value={inspectionForm.postcode}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, postcode: e.target.value })}
                      placeholder="e.g. 2000 Sydney"
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Preferred Inspection Date */}
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={inspectionForm.preferredDate}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, preferredDate: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Phone / Mobile</label>
                    <input
                      type="tel"
                      value={inspectionForm.customerPhone}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, customerPhone: e.target.value })}
                      placeholder="0400 000 000"
                      className="form-input"
                      required
                    />
                  </div>

                  {/* Notes / Special Requests */}
                  <div className="form-group-full">
                    <label>Vehicle Notes / Specific Checks Needed</label>
                    <textarea
                      rows="2"
                      value={inspectionForm.notes}
                      onChange={(e) => setInspectionForm({ ...inspectionForm, notes: e.target.value })}
                      placeholder="e.g. Buying used car in Parramatta, check underbody rust & gearbox"
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="btn-modal-submit">
                      Send My Free Inspection Quote Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default VehicleInspections;
