import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiChevronDown, FiSliders, FiX, FiCheck, FiTruck, FiShield, FiRotateCw, FiShoppingCart } from 'react-icons/fi';
import TyreCanvas from '../components/TyreCanvas';
import './Wheels.css';

// SVG Wheel assets
import mambaSilverImg from '../Images/Wheels/mamba-silver.svg';
import ultraBlackImg from '../Images/Wheels/ultra-black.svg';
import wildlandGalvImg from '../Images/Wheels/wildland-galvanised.svg';
import grudgeBlackImg from '../Images/Wheels/grudge-black.svg';
import splashBannerImg from '../Images/Background/splash-banner.jpg';

// Top 3 Featured Wheels (exact match from Screenshot 1)
const featuredWheels = [
  {
    id: 'w-mamba-1',
    brand: 'Mamba',
    badge: 'PREMIUM',
    badgeType: 'premium',
    name: 'MAMBA ADR NAVAJO SM28G TITANIUM SILVER',
    specs: '17x9 6/139.7 20',
    diameter: 17,
    width: 9,
    pcd: '6/139.7',
    offset: 20,
    finish: 'Titanium Silver',
    tagline: 'Top notch quality and performance',
    taglineType: 'black',
    price: 372,
    image: mambaSilverImg,
    inStock: 12,
    rimColor: '#cbd5e1',
    description: 'Forged-inspired lightweight alloy engineered for extreme performance and rugged luxury with multi-spoke load distribution.',
  },
  {
    id: 'w-ultra-1',
    brand: 'Ultra Wheel Company',
    badge: 'VALUE',
    badgeType: 'value',
    name: 'ULTRA ULTRA 226 MACHINE SATIN BLACK',
    specs: '20x9 6/139.7 25',
    diameter: 20,
    width: 9,
    pcd: '6/139.7',
    offset: 25,
    finish: 'Machine Satin Black',
    tagline: 'Performance without breaking bank',
    taglineType: 'green',
    price: 189,
    image: ultraBlackImg,
    stockWarning: 'Just 3 more wheels in stock. Notify me when re-stocked.',
    inStock: 3,
    rimColor: '#1e222d',
    description: 'Chiseled 10-spoke design with milled accents and high-strength A356 aluminium construction, perfect for modern 4WDs.',
  },
  {
    id: 'w-wildland-1',
    brand: 'Wildland',
    badge: 'BUDGET',
    badgeType: 'budget',
    name: 'WILDLAND OFFROADER GALVINISED',
    specs: '13x5 5/114.3 0',
    diameter: 13,
    width: 5,
    pcd: '5/114.3',
    offset: 0,
    finish: 'Galvanised Steel',
    tagline: 'Affordable tyres that get the job done',
    taglineType: 'blue',
    price: 98,
    image: wildlandGalvImg,
    inStock: 24,
    rimColor: '#94a3b8',
    description: 'Corrosion-resistant galvanised steel modular rim designed for boat trailers, utes, and heavy-duty utility work.',
  },
];

// Grudge Offroad Steel Wheels list (exact match from Screenshots 2, 3, 4)
const grudgeWheels = [
  {
    id: 'w-grudge-1',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '13x4.5 5/114.3 0',
    diameter: 13,
    width: 4.5,
    pcd: '5/114.3',
    offset: 0,
    price: 40,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 16,
  },
  {
    id: 'w-grudge-2',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '14x6 5/120 15',
    diameter: 14,
    width: 6,
    pcd: '5/120',
    offset: 15,
    price: 54,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 20,
  },
  {
    id: 'w-grudge-3',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '14x6 5/108 15',
    diameter: 14,
    width: 6,
    pcd: '5/108',
    offset: 15,
    price: 54,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 8,
  },
  {
    id: 'w-grudge-4',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '15x8 5/165.1 12',
    diameter: 15,
    width: 8,
    pcd: '5/165.1',
    offset: 12,
    price: 78,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 14,
  },
  {
    id: 'w-grudge-5',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '16x7 5/114.3 20',
    diameter: 16,
    width: 7,
    pcd: '5/114.3',
    offset: 20,
    price: 90,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 18,
  },
  {
    id: 'w-grudge-6',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '16x8 5/150 0',
    diameter: 16,
    width: 8,
    pcd: '5/150',
    offset: 0,
    price: 97,
    image: grudgeBlackImg,
    stockWarning: 'Just 4 more wheels in stock. Notify me when re-stocked.',
    rimColor: '#111111',
    inStock: 4,
  },
  {
    id: 'w-grudge-7',
    brand: 'Grudge Offroad',
    name: 'GRUDGE OFFROAD STEEL BLACK WITH WHITE LINE',
    specs: '17x8 6/139.7 0',
    diameter: 17,
    width: 8,
    pcd: '6/139.7',
    offset: 0,
    price: 110,
    image: grudgeBlackImg,
    rimColor: '#111111',
    inStock: 25,
  },
];

const allBrandsList = ['All Brands', 'Mamba', 'Ultra Wheel Company', 'Wildland', 'Grudge Offroad', 'King Wheels', 'Fuel', 'KMC', 'Enkei'];
const australianStates = [
  'New South Wales',
  'Victoria',
  'Queensland',
  'Western Australia',
  'South Australia',
  'Australian Capital Territory',
  'Northern Territory',
  'Tasmania',
];

const Wheels = () => {
  const [searchParams] = useSearchParams();
  const [selectedState, setSelectedState] = useState('New South Wales');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterDiameter, setFilterDiameter] = useState('all');

  // Modal states
  const [activeWheelDetail, setActiveWheelDetail] = useState(null);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [shippingPostcode, setShippingPostcode] = useState('');
  const [shippingQuoteResult, setShippingQuoteResult] = useState(null);
  const [modalQty, setModalQty] = useState(4);
  const [modalRimColor, setModalRimColor] = useState('#888888');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync brand or type from query params
  useEffect(() => {
    const qType = searchParams.get('type');
    if (qType === '4x4') setSelectedBrand('Grudge Offroad');
    else if (qType === 'alloy') setSelectedBrand('Mamba');
    else if (qType === 'steel') setSelectedBrand('Wildland');
  }, [searchParams]);

  // Filter Grudge list
  const filteredGrudge = useMemo(() => {
    let list = [...grudgeWheels];
    if (selectedBrand !== 'All Brands' && selectedBrand !== 'Grudge Offroad') {
      return [];
    }
    if (filterDiameter !== 'all') {
      list = list.filter(w => String(w.diameter) === filterDiameter);
    }
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedBrand, filterDiameter, sortBy]);

  // Filter Featured list
  const filteredFeatured = useMemo(() => {
    let list = [...featuredWheels];
    if (selectedBrand !== 'All Brands') {
      list = list.filter(w => w.brand.toLowerCase() === selectedBrand.toLowerCase());
    }
    if (filterDiameter !== 'all') {
      list = list.filter(w => String(w.diameter) === filterDiameter);
    }
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedBrand, filterDiameter, sortBy]);

  // Open 3D Wheel Detail Modal
  const handleOpenDetail = (wheel) => {
    setActiveWheelDetail(wheel);
    setModalRimColor(wheel.rimColor || '#888');
    setModalQty(4);
    setAddedSuccess(false);
  };

  // Add to cart functionality
  const handleAddToCart = (wheel, quantity = 4) => {
    try {
      const saved = localStorage.getItem('tyroola_cart');
      const cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find(item => item._id === wheel.id);

      if (existing) {
        existing.qty = (existing.qty || 1) + quantity;
      } else {
        cart.push({
          _id: wheel.id,
          brand: wheel.brand,
          model: wheel.name,
          size: wheel.specs,
          price: wheel.price,
          category: 'Wheel',
          qty: quantity,
        });
      }

      localStorage.setItem('tyroola_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('tyroola_cart_change'));
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2200);
    } catch (err) {
      console.error(err);
    }
  };

  // Shipping Calculator
  const handleCalculateShipping = (e) => {
    e.preventDefault();
    if (!shippingPostcode || shippingPostcode.length < 4) {
      setShippingQuoteResult({ status: 'error', text: 'Please enter a valid 4-digit Australian postcode.' });
      return;
    }
    const pc = parseInt(shippingPostcode, 10);
    if (pc >= 2000 && pc <= 2999) {
      setShippingQuoteResult({ status: 'free', text: '✅ FREE Delivery to NSW / Sydney Metro! Estimated arrival: 1-2 business days.' });
    } else if (pc >= 3000 && pc <= 3999) {
      setShippingQuoteResult({ status: 'free', text: '✅ FREE Delivery to VIC / Melbourne Metro! Estimated arrival: 2 business days.' });
    } else if (pc >= 4000 && pc <= 4999) {
      setShippingQuoteResult({ status: 'standard', text: '🚚 $19 Express Freight to QLD Metro! Estimated arrival: 2-3 business days.' });
    } else {
      setShippingQuoteResult({ status: 'standard', text: '🚚 $29 Regional Australia Delivery! Estimated arrival: 3-5 business days.' });
    }
  };

  return (
    <main className="wheels-page">
      {/* ── 1. Hero Splash Banner (Matching Screenshot 1) ── */}
      <section className="wheels-hero" style={{ backgroundImage: `url(${splashBannerImg})` }}>
        <div className="wheels-hero-overlay" />
        <div className="container wheels-hero-content">
          {/* Breadcrumb */}
          <nav className="wheels-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="bc-link">Home</Link>
            <span className="bc-sep">&gt;</span>
            <span className="bc-current">Wheels</span>
          </nav>

          {/* Heading */}
          <div className="wheels-title-row">
            <h1 className="wheels-main-title">Wheel Prices in {selectedState}</h1>
            <select
              className="state-quick-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              title="Change State"
            >
              {australianStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Controls Bar (Pill design matching screenshot) */}
          <div className="wheels-pill-bar">
            {/* Filter Brands */}
            <div className="pill-select-wrap">
              <select
                className="pill-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                aria-label="Filter brands"
              >
                {allBrandsList.map(b => (
                  <option key={b} value={b}>{b === 'All Brands' ? 'Filter brands' : b}</option>
                ))}
              </select>
              <FiChevronDown className="pill-chevron" />
            </div>

            {/* More Filters Button */}
            <button
              type="button"
              className={`pill-btn-black ${showMoreFilters ? 'active' : ''}`}
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              <span>More filters</span>
              <FiSliders size={15} />
            </button>

            {/* Sort Dropdown */}
            <div className="pill-select-wrap sort-pill">
              <select
                className="pill-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort by"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <FiChevronDown className="pill-chevron" />
            </div>
          </div>

          {/* More Filters Expandable Drawer */}
          {showMoreFilters && (
            <div className="more-filters-drawer">
              <div className="filter-drawer-item">
                <span className="drawer-label">Rim Diameter:</span>
                <div className="drawer-chips">
                  {['all', '13', '14', '15', '16', '17', '20'].map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`drawer-chip ${filterDiameter === d ? 'active' : ''}`}
                      onClick={() => setFilterDiameter(d)}
                    >
                      {d === 'all' ? 'All Sizes' : `${d}"`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-drawer-actions">
                <button
                  type="button"
                  className="drawer-reset-btn"
                  onClick={() => {
                    setSelectedBrand('All Brands');
                    setFilterDiameter('all');
                    setSortBy('relevance');
                  }}
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setShowMoreFilters(false)}
                >
                  Apply & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Top 3 Featured Wheel Cards (Matching Screenshot 1 & 2) ── */}
      <section className="container wheels-content-section">
        {filteredFeatured.length > 0 && (
          <div className="featured-wheels-grid">
            {filteredFeatured.map((wheel) => (
              <article key={wheel.id} className="featured-wheel-card card-3d">
                {/* Brand Header & Badge */}
                <div className="card-top-row">
                  <span className="brand-logo-text">{wheel.brand}</span>
                  <span className={`badge-pill badge-${wheel.badgeType}`}>
                    {wheel.badge}
                  </span>
                </div>

                {/* 3D Wheel Visual */}
                <div className="wheel-visual-wrap" onClick={() => handleOpenDetail(wheel)}>
                  <img
                    src={wheel.image}
                    alt={wheel.name}
                    className="wheel-img-3d"
                    loading="lazy"
                  />
                  <div className="hover-3d-hint">
                    <FiRotateCw size={14} /> 3D View
                  </div>
                </div>

                {/* Info */}
                <div className="card-info-wrap">
                  <h2 className="wheel-title">{wheel.name}</h2>
                  <div className="wheel-specs-code">{wheel.specs}</div>
                </div>

                {/* Tagline Ribbon (Black / Green / Blue matching screenshot) */}
                <div className={`tagline-ribbon ribbon-${wheel.taglineType}`}>
                  {wheel.tagline}
                </div>

                {/* Footer with Postcode Link, Price, and Show Details Button */}
                <div className="card-footer-box">
                  <button
                    type="button"
                    className="shipping-quote-link"
                    onClick={() => {
                      setShippingModalOpen(true);
                      setShippingQuoteResult(null);
                    }}
                  >
                    Enter postcode for shipping quote
                  </button>

                  <div className="price-and-action-row">
                    <div className="price-ea-wrap">
                      <span className="price-dollar">${wheel.price}</span>
                      <span className="price-ea-label"> ea</span>
                    </div>

                    <button
                      type="button"
                      className="btn-show-details"
                      onClick={() => handleOpenDetail(wheel)}
                    >
                      Show details
                    </button>
                  </div>

                  {/* Stock Notice (e.g. Ultra 226) */}
                  {wheel.stockWarning && (
                    <div className="stock-warning-text">
                      {wheel.stockWarning}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── 3. Horizontal Wheel Cards List (Matching Screenshots 2, 3, 4) ── */}
        <div className="grudge-wheels-list">
          {filteredGrudge.map((w) => (
            <article key={w.id} className="horizontal-wheel-card card-3d">
              {/* Wheel Graphic */}
              <div
                className="horizontal-wheel-img-wrap"
                onClick={() => handleOpenDetail(w)}
              >
                <img src={w.image} alt={w.name} className="horizontal-wheel-img" />
              </div>

              {/* Center Info */}
              <div className="horizontal-wheel-info">
                <div className="grudge-brand-tag">
                  <span className="shield-icon">🛡️</span> {w.brand.toUpperCase()}
                </div>
                <h3 className="horizontal-wheel-name">{w.name}</h3>
                <div className="horizontal-wheel-specs">{w.specs}</div>
                <button
                  type="button"
                  className="shipping-quote-link"
                  onClick={() => {
                    setShippingModalOpen(true);
                    setShippingQuoteResult(null);
                  }}
                >
                  Enter postcode for shipping quote
                </button>

                {w.stockWarning && (
                  <div className="stock-warning-text" style={{ marginTop: '0.4rem' }}>
                    {w.stockWarning}
                  </div>
                )}
              </div>

              {/* Right Price & Button */}
              <div className="horizontal-wheel-actions">
                <div className="price-ea-wrap">
                  <span className="price-dollar">${w.price}</span>
                  <span className="price-ea-label"> ea</span>
                </div>
                <button
                  type="button"
                  className="btn-show-details"
                  onClick={() => handleOpenDetail(w)}
                >
                  Show details
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ── 4. Pagination (Matching Screenshot 4) ── */}
        <div className="wheels-pagination-bar">
          <button
            type="button"
            className="btn-pagination-next"
            onClick={() => {
              setCurrentPage(p => (p === 1 ? 2 : 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          >
            {currentPage === 1 ? 'Next' : 'Previous'}
          </button>
        </div>
      </section>

      {/* ── 5. Interactive 3D Wheel Detail Modal ("Show details") ── */}
      {activeWheelDetail && (
        <div
          className="wheel-modal-backdrop"
          onClick={() => setActiveWheelDetail(null)}
        >
          <div
            className="wheel-3d-modal card-3d"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveWheelDetail(null)}
              aria-label="Close modal"
            >
              <FiX size={20} />
            </button>

            <div className="wheel-modal-layout">
              {/* Left: 3D Interactive Canvas & Finish Controls */}
              <div className="modal-canvas-side">
                <div className="canvas-header-tag">
                  <FiRotateCw /> 360° Real-Time 3D Rim Inspector
                </div>
                <div className="canvas-holder">
                  <TyreCanvas
                    height="320px"
                    rimColor={modalRimColor}
                    rotate={true}
                    showParticles={false}
                  />
                </div>

                {/* Finish Swatches */}
                <div className="finish-picker-row">
                  <span className="finish-label">Rim Finish:</span>
                  <button
                    type="button"
                    className={`finish-swatch ${modalRimColor === '#cbd5e1' ? 'active' : ''}`}
                    style={{ background: '#cbd5e1' }}
                    onClick={() => setModalRimColor('#cbd5e1')}
                    title="Titanium Silver"
                  />
                  <button
                    type="button"
                    className={`finish-swatch ${modalRimColor === '#1e222d' ? 'active' : ''}`}
                    style={{ background: '#1e222d' }}
                    onClick={() => setModalRimColor('#1e222d')}
                    title="Satin Black"
                  />
                  <button
                    type="button"
                    className={`finish-swatch ${modalRimColor === '#e2e8f0' ? 'active' : ''}`}
                    style={{ background: 'linear-gradient(135deg, #ffffff, #94a3b8)' }}
                    onClick={() => setModalRimColor('#e2e8f0')}
                    title="Galvanised Chrome"
                  />
                  <button
                    type="button"
                    className={`finish-swatch ${modalRimColor === '#ffd700' ? 'active' : ''}`}
                    style={{ background: '#ffd700' }}
                    onClick={() => setModalRimColor('#ffd700')}
                    title="Anodized Gold"
                  />
                </div>
              </div>

              {/* Right: Specifications & Buy Section */}
              <div className="modal-details-side">
                <span className="modal-brand-badge">{activeWheelDetail.brand}</span>
                <h2 className="modal-wheel-title">{activeWheelDetail.name}</h2>
                <div className="modal-specs-pill">{activeWheelDetail.specs}</div>

                <div className="modal-price-row">
                  <div className="modal-single-price">
                    <strong>${activeWheelDetail.price}</strong> <span>ea</span>
                  </div>
                  <div className="modal-total-price">
                    Total: <strong>${(activeWheelDetail.price * modalQty).toFixed(2)}</strong> ({modalQty} wheels)
                  </div>
                </div>

                {/* Specs Table */}
                <div className="specs-table">
                  <div className="spec-row">
                    <span>Diameter</span>
                    <strong>{activeWheelDetail.diameter || 16}"</strong>
                  </div>
                  <div className="spec-row">
                    <span>Width</span>
                    <strong>{activeWheelDetail.width || 7}J</strong>
                  </div>
                  <div className="spec-row">
                    <span>Bolt Pattern (PCD)</span>
                    <strong>{activeWheelDetail.pcd || '5/114.3'}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Offset</span>
                    <strong>{activeWheelDetail.offset !== undefined ? `+${activeWheelDetail.offset}mm` : '0mm'}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Load Rating</span>
                    <strong>1,150 kg (Heavy Duty)</strong>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="modal-qty-row">
                  <span className="qty-label">Quantity:</span>
                  <div className="qty-counter">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setModalQty(q => Math.max(1, q - 1))}
                    >
                      –
                    </button>
                    <span className="qty-number">{modalQty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setModalQty(q => Math.min(8, q + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-action-row">
                  <button
                    type="button"
                    className={`btn-modal-add ${addedSuccess ? 'success' : ''}`}
                    onClick={() => handleAddToCart(activeWheelDetail, modalQty)}
                  >
                    {addedSuccess ? (
                      <>
                        <FiCheck size={18} /> Added {modalQty} Wheels!
                      </>
                    ) : (
                      <>
                        <FiShoppingCart size={17} /> Add {modalQty} to Cart
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-modal-checkout"
                    onClick={() => {
                      handleAddToCart(activeWheelDetail, modalQty);
                      window.dispatchEvent(new CustomEvent('tyroola_open_cart'));
                      setActiveWheelDetail(null);
                    }}
                  >
                    Instant Checkout
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="modal-trust-row">
                  <span><FiTruck size={13} /> Nationwide Delivery</span>
                  <span><FiShield size={13} /> Lifetime Structural Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. Interactive Shipping Postcode Modal ── */}
      {shippingModalOpen && (
        <div
          className="shipping-modal-backdrop"
          onClick={() => setShippingModalOpen(false)}
        >
          <div
            className="shipping-quote-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipping-modal-header">
              <h3>Calculate Wheel Shipping</h3>
              <button
                type="button"
                className="modal-close-icon"
                onClick={() => setShippingModalOpen(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCalculateShipping} className="shipping-form">
              <label htmlFor="postcode-input" className="postcode-label">
                Enter your Australian Postcode:
              </label>
              <div className="postcode-input-row">
                <input
                  id="postcode-input"
                  type="text"
                  placeholder="e.g. 2000, 3000, 4000"
                  maxLength={4}
                  value={shippingPostcode}
                  onChange={(e) => setShippingPostcode(e.target.value.replace(/\D/g, ''))}
                  className="postcode-field"
                  autoFocus
                />
                <button type="submit" className="btn-get-quote">
                  Calculate
                </button>
              </div>
            </form>

            {shippingQuoteResult && (
              <div className={`quote-result-box ${shippingQuoteResult.status}`}>
                {shippingQuoteResult.text}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Wheels;
