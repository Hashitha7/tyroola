import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiShoppingCart, FiStar, FiX, FiCheck, FiRefreshCw, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import './Tyres.css';

// Local high quality tyre imagery
import tyreImg1 from '../Images/Tyres/t1.jpg';
import tyreImg2 from '../Images/Tyres/t2.jpg';
import tyreImg3 from '../Images/Tyres/t3.jpg';
import tyreImg4 from '../Images/Tyres/t4.jpg';
import tyreImg5 from '../Images/Tyres/t5.jpg';
import tyreImg6 from '../Images/Tyres/t6.jpg';
import tyreImg7 from '../Images/Tyres/t7.jpg';

const mockTyres = [
  {
    _id: '1',
    brand: 'Bridgestone',
    model: 'Turanza T005',
    size: '205/55R16',
    width: 205,
    aspectRatio: 55,
    rimSize: 16,
    price: 142,
    originalPrice: 165,
    category: 'Sedan',
    rating: 4.6,
    reviews: 312,
    isFeatured: true,
    badge: 'Eco Friendly',
    image: tyreImg1,
    description: 'Superior comfort and fuel efficiency for everyday driving with quiet road tread.',
  },
  {
    _id: '2',
    brand: 'Michelin',
    model: 'Primacy 5 Energy',
    size: '265/65R17',
    width: 265,
    aspectRatio: 65,
    rimSize: 17,
    price: 189,
    originalPrice: 220,
    category: 'SUV',
    rating: 4.8,
    reviews: 234,
    isFeatured: true,
    badge: 'Best Seller',
    image: tyreImg2,
    description: 'Enjoy safer stops, longer tread life, better energy consumption, all in a quiet ride.',
  },
  {
    _id: '3',
    brand: 'Continental',
    model: 'PremiumContact 7',
    size: '225/50R17',
    width: 225,
    aspectRatio: 50,
    rimSize: 17,
    price: 198,
    originalPrice: 230,
    category: 'Sedan',
    rating: 4.7,
    reviews: 267,
    isFeatured: true,
    badge: 'Top Rated',
    image: tyreImg3,
    description: 'Next generation safety and comfort engineered in Germany with outstanding wet braking.',
  },
  {
    _id: '4',
    brand: 'BFGoodrich',
    model: 'All-Terrain T/A KO2',
    size: '265/70R17',
    width: 265,
    aspectRatio: 70,
    rimSize: 17,
    price: 310,
    originalPrice: 360,
    category: '4WD',
    rating: 4.9,
    reviews: 456,
    isFeatured: true,
    badge: '$150 Cashback',
    image: tyreImg4,
    description: 'Toughest all-terrain tyre ever made, engineered with CoreGard technology for serious off-road.',
  },
  {
    _id: '5',
    brand: 'Michelin',
    model: 'Pilot Sport 5 Energy',
    size: '235/45R18',
    width: 235,
    aspectRatio: 45,
    rimSize: 18,
    price: 245,
    originalPrice: 290,
    category: 'Sports',
    rating: 4.9,
    reviews: 189,
    isFeatured: true,
    badge: 'New',
    image: tyreImg5,
    description: 'Enjoy amplified sports performance driving and save energy with precision grip.',
  },
  {
    _id: '6',
    brand: 'Goodyear',
    model: 'Eagle F1 Asymmetric 6',
    size: '245/40R18',
    width: 245,
    aspectRatio: 40,
    rimSize: 18,
    price: 278,
    originalPrice: 320,
    category: 'Sports',
    rating: 4.8,
    reviews: 178,
    isFeatured: false,
    badge: 'Precision',
    image: tyreImg6,
    description: 'Ultra high performance tyre ready for anything with dry braking and wet weather adaptability.',
  },
  {
    _id: '7',
    brand: 'Pirelli',
    model: 'Scorpion All Terrain Plus',
    size: '265/60R18',
    width: 265,
    aspectRatio: 60,
    rimSize: 18,
    price: 285,
    originalPrice: 330,
    category: 'SUV',
    rating: 4.7,
    reviews: 195,
    isFeatured: false,
    badge: '4x4 Offroad',
    image: tyreImg7,
    description: 'Aggressive tread block pattern with reinforced sidewalls for tough Australian outback driving.',
  },
  {
    _id: '8',
    brand: 'Hankook',
    model: 'Dynapro ATM RF10',
    size: '245/70R16',
    width: 245,
    aspectRatio: 70,
    rimSize: 16,
    price: 175,
    originalPrice: 205,
    category: '4WD',
    rating: 4.6,
    reviews: 142,
    isFeatured: false,
    badge: 'Best Value',
    image: tyreImg1,
    description: 'Rugged all-terrain tyre designed for utes, 4x4s, and heavy-duty towing.',
  },
  {
    _id: '9',
    brand: 'Dunlop',
    model: 'SP Sport Maxx 050+',
    size: '225/45R18',
    width: 225,
    aspectRatio: 45,
    rimSize: 18,
    price: 215,
    originalPrice: 250,
    category: 'Sports',
    rating: 4.7,
    reviews: 168,
    isFeatured: false,
    badge: 'Maxx Grip',
    image: tyreImg2,
    description: 'Flagship ultra-high performance tyre engineered for premium sedans and performance sports cars.',
  },
  {
    _id: '10',
    brand: 'Bridgestone',
    model: 'Dueler A/T 697',
    size: '265/65R17',
    width: 265,
    aspectRatio: 65,
    rimSize: 17,
    price: 260,
    originalPrice: 300,
    category: 'SUV',
    rating: 4.8,
    reviews: 380,
    isFeatured: false,
    badge: 'Popular',
    image: tyreImg3,
    description: 'Australia favorite 4WD tyre tested in real outback conditions for puncture resistance.',
  },
  {
    _id: '11',
    brand: 'Continental',
    model: 'ContiVanContact 200',
    size: '215/65R16',
    width: 215,
    aspectRatio: 65,
    rimSize: 16,
    price: 165,
    originalPrice: 190,
    category: 'Light Truck',
    rating: 4.5,
    reviews: 115,
    isFeatured: false,
    badge: 'Commercial',
    image: tyreImg4,
    description: 'Robust transporter tyre offering safety, remarkable high mileage, and lower rolling resistance.',
  },
  {
    _id: '12',
    brand: 'Pirelli',
    model: 'P Zero Run-Flat',
    size: '245/45R19',
    width: 245,
    aspectRatio: 45,
    rimSize: 19,
    price: 340,
    originalPrice: 395,
    category: 'RunFlat',
    rating: 4.9,
    reviews: 210,
    isFeatured: false,
    badge: 'Run-Flat',
    image: tyreImg5,
    description: 'Self-supporting run-flat mobility engineered with Formula 1 racing technology.',
  },
];

const availableCategories = ['Sedan', 'SUV', '4WD', 'Sports', 'Light Truck', 'RunFlat'];
const availableBrands = ['Bridgestone', 'Michelin', 'Continental', 'BFGoodrich', 'Goodyear', 'Pirelli', 'Hankook', 'Dunlop'];

const Tyres = () => {
  const [tyres, setTyres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state (matches screenshot: Price: Low to High default)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'price-asc',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync category from URL param (e.g. clicked in Navbar)
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory !== null && urlCategory !== filters.category) {
      setFilters(prev => ({ ...prev, category: urlCategory }));
    }
    const urlBrand = searchParams.get('brand');
    if (urlBrand !== null && urlBrand !== filters.brand) {
      setFilters(prev => ({ ...prev, brand: urlBrand }));
    }
  }, [searchParams]);

  // Load tyres from API or fallback to mock data
  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const { data } = await axios.get('/api/tyres');
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          // Merge API tyres with high-res local images
          const merged = data.data.map((t, idx) => ({
            ...t,
            image: [tyreImg1, tyreImg2, tyreImg3, tyreImg4, tyreImg5, tyreImg6, tyreImg7][idx % 7],
          }));
          setTyres(merged);
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

  // Filter & Sort calculation
  const filtered = useMemo(() => {
    let result = [...tyres];

    // Search query matching brand, model, size, category, badge
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(t =>
        `${t.brand} ${t.model} ${t.size} ${t.category} ${t.badge || ''} ${t.description || ''}`
          .toLowerCase()
          .includes(q)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(t => t.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Brand filter
    if (filters.brand) {
      result = result.filter(t => t.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Min price
    if (filters.minPrice !== '' && !isNaN(Number(filters.minPrice))) {
      result = result.filter(t => t.price >= Number(filters.minPrice));
    }

    // Max price
    if (filters.maxPrice !== '' && !isNaN(Number(filters.maxPrice))) {
      result = result.filter(t => t.price <= Number(filters.maxPrice));
    }

    // Sorting
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'popular') {
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (filters.sort === 'name-asc') {
      result.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model));
    } else {
      // Default: featured first, then rating
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [tyres, search, filters]);

  // Handle Add To Cart
  const handleAddToCart = (tyre) => {
    try {
      const saved = localStorage.getItem('tyroola_cart');
      const cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find(item => item._id === tyre._id);

      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({
          _id: tyre._id,
          brand: tyre.brand,
          model: tyre.model,
          size: tyre.size,
          price: tyre.price,
          originalPrice: tyre.originalPrice,
          category: tyre.category,
          image: tyre.image,
          qty: 1,
        });
      }

      localStorage.setItem('tyroola_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('tyroola_cart_change'));

      // Feedback state
      setAddedId(tyre._id);
      setTimeout(() => setAddedId(null), 1800);

      // Toast notification
      setToastMessage({
        text: `${tyre.brand} ${tyre.model} added to cart!`,
        tyre,
      });
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: 'price-asc',
    });
    setSearchParams({});
  };

  // Quick Price Preset helper
  const handlePricePreset = (min, max) => {
    setFilters(prev => ({
      ...prev,
      minPrice: min !== null ? String(min) : '',
      maxPrice: max !== null ? String(max) : '',
    }));
  };

  // Count active filters
  const activeFiltersCount =
    (search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.brand ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <main className="tyres-page">
      {/* Hero Header */}
      <div className="tyres-page-hero">
        <div className="container">
          <h1 className="section-title">All Tyres</h1>
          <p className="section-subtitle">Find the perfect tyres for your vehicle from Australia's best brands.</p>
        </div>
      </div>

      <div className="container">
        {/* Top Controls Bar */}
        <div className="tyres-controls">
          {/* Search Box */}
          <div className="tyres-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by brand, model or size..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tyres"
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-wrapper">
            <select
              className="tyres-sort"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              aria-label="Sort tyres"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
              <option value="name-asc">Brand (A to Z)</option>
              <option value="default">Sort: Default</option>
            </select>
          </div>

          {/* Filter Toggle Button */}
          <button
            type="button"
            className={`btn btn-dark filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <FiFilter />
            <span>FILTERS</span>
            {activeFiltersCount > 0 && <span className="filter-count-pill">{activeFiltersCount}</span>}
          </button>
        </div>

        {/* Active Filter Chips / Pills */}
        {activeFiltersCount > 0 && (
          <div className="active-filters-bar">
            <span className="active-label">Active Filters:</span>
            {search && (
              <button type="button" className="filter-chip" onClick={() => setSearch('')}>
                Search: "{search}" <FiX size={12} />
              </button>
            )}
            {filters.category && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => {
                  setFilters(p => ({ ...p, category: '' }));
                  setSearchParams({});
                }}
              >
                Category: {filters.category} <FiX size={12} />
              </button>
            )}
            {filters.brand && (
              <button type="button" className="filter-chip" onClick={() => setFilters(p => ({ ...p, brand: '' }))}>
                Brand: {filters.brand} <FiX size={12} />
              </button>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <button
                type="button"
                className="filter-chip"
                onClick={() => setFilters(p => ({ ...p, minPrice: '', maxPrice: '' }))}
              >
                Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'} <FiX size={12} />
              </button>
            )}
            <button type="button" className="clear-all-link" onClick={handleResetFilters}>
              Reset All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="tyres-layout">
          {/* Sidebar Filters */}
          <aside className={`tyres-sidebar glass ${showFilters ? 'open' : ''}`}>
            <div className="sidebar-header-row">
              <h3 className="sidebar-title">FILTER TYRES</h3>
              {activeFiltersCount > 0 && (
                <button type="button" className="sidebar-reset-btn" onClick={handleResetFilters} title="Reset filters">
                  <FiRefreshCw size={13} /> Reset
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="filter-group">
              <label className="filter-label">CATEGORY</label>
              <select
                value={filters.category}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilters({ ...filters, category: val });
                  if (val) setSearchParams({ category: val });
                  else setSearchParams({});
                }}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {availableCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="filter-group">
              <label className="filter-label">BRAND</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="filter-select"
              >
                <option value="">All Brands</option>
                {availableBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Price Range Inputs */}
            <div className="filter-group">
              <label className="filter-label">PRICE RANGE</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="price-input"
                  min="0"
                />
                <span className="price-sep">–</span>
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="price-input"
                  min="0"
                />
              </div>

              {/* Quick Price Buttons */}
              <div className="quick-price-chips">
                <button
                  type="button"
                  className={`price-chip-btn ${filters.minPrice === '' && filters.maxPrice === '180' ? 'active' : ''}`}
                  onClick={() => handlePricePreset(null, 180)}
                >
                  Under $180
                </button>
                <button
                  type="button"
                  className={`price-chip-btn ${filters.minPrice === '180' && filters.maxPrice === '260' ? 'active' : ''}`}
                  onClick={() => handlePricePreset(180, 260)}
                >
                  $180 - $260
                </button>
                <button
                  type="button"
                  className={`price-chip-btn ${filters.minPrice === '260' && filters.maxPrice === '' ? 'active' : ''}`}
                  onClick={() => handlePricePreset(260, null)}
                >
                  $260+
                </button>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              type="button"
              className="btn btn-outline reset-filters-btn"
              onClick={handleResetFilters}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Results Area */}
          <div className="tyres-results">
            {/* Found Counter */}
            <div className="results-count">
              <strong>{filtered.length}</strong> {filtered.length === 1 ? 'tyre' : 'tyres'} found
            </div>

            {loading ? (
              <div className="tyres-grid-page">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="skeleton" style={{ height: '390px', borderRadius: '16px' }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="no-results glass">
                <div className="no-results-emoji">🛞</div>
                <h3>No tyres match your criteria</h3>
                <p>Try clearing some filters or searching for another tyre size or brand.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginTop: '1.25rem' }}
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="tyres-grid-page">
                {filtered.map((tyre, i) => {
                  const disc = tyre.originalPrice
                    ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100)
                    : 0;
                  const isAdded = addedId === tyre._id;

                  return (
                    <article
                      key={tyre._id}
                      className="tyre-card-page card-3d"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      {/* Top Badges */}
                      {tyre.badge && <div className="tyre-badge-sm">{tyre.badge}</div>}
                      {disc > 0 && <div className="tyre-disc-sm">-{disc}%</div>}

                      {/* Image Wrap */}
                      <div className="tyre-img-wrap-page">
                        <img
                          src={tyre.image}
                          alt={`${tyre.brand} ${tyre.model} ${tyre.size}`}
                          loading="lazy"
                        />
                        <span className="tyre-cat-sm">{tyre.category}</span>
                      </div>

                      {/* Content Body */}
                      <div className="tyre-body-page">
                        <div className="tyre-brand-sm">{tyre.brand}</div>
                        <h3 className="tyre-model-sm">{tyre.model}</h3>
                        <div className="tyre-size-sm">{tyre.size}</div>

                        {/* Star Rating */}
                        <div className="tyre-rating-row" title={`${tyre.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <FiStar
                              key={j}
                              size={12}
                              fill={j < Math.floor(tyre.rating) ? '#FFD700' : 'none'}
                              color={j < Math.floor(tyre.rating) ? '#FFD700' : '#555'}
                            />
                          ))}
                          <span className="tyre-rating-num">
                            {tyre.rating} ({tyre.reviews})
                          </span>
                        </div>

                        {/* Price Row */}
                        <div className="tyre-price-row">
                          <span className="tyre-p">${tyre.price}</span>
                          {tyre.originalPrice && <span className="tyre-op">${tyre.originalPrice}</span>}
                        </div>

                        {/* Action Buttons */}
                        <div className="tyre-btn-row">
                          <Link
                            to={`/tyres/${tyre._id}`}
                            className="btn btn-outline tyre-details-btn"
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            className={`btn btn-primary tyre-buy-btn ${isAdded ? 'btn-added' : ''}`}
                            onClick={() => handleAddToCart(tyre)}
                            disabled={isAdded}
                          >
                            {isAdded ? (
                              <>
                                <FiCheck size={14} /> Added!
                              </>
                            ) : (
                              <>
                                <FiShoppingCart size={13} /> Buy
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Toast Notification when item added */}
      {toastMessage && (
        <aside className="cart-toast" role="status" aria-live="polite">
          <div className="toast-icon">
            <FiCheck size={18} />
          </div>
          <div className="toast-content">
            <span className="toast-title">Added to Cart</span>
            <span className="toast-name">{toastMessage.text}</span>
          </div>
          <button
            type="button"
            className="toast-action"
            onClick={() => {
              // Open cart modal via custom event or header trigger
              window.dispatchEvent(new CustomEvent('tyroola_open_cart'));
              setToastMessage(null);
            }}
          >
            View Cart
          </button>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Close notification"
          >
            <FiX size={15} />
          </button>
        </aside>
      )}
    </main>
  );
};

export default Tyres;
