import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiShoppingCart, FiStar } from 'react-icons/fi';
import axios from 'axios';
import './Tyres.css';

const mockTyres = [
  { _id: '1', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17', width: 265, aspectRatio: 65, rimSize: 17, price: 189, originalPrice: 220, category: 'SUV', rating: 4.8, reviews: 234, isFeatured: true, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Enjoy safer stops, longer tread life, better energy consumption, all in a quiet, comfortable ride.' },
  { _id: '2', brand: 'Michelin', model: 'Pilot Sport 5 Energy', size: '235/45R18', width: 235, aspectRatio: 45, rimSize: 18, price: 245, originalPrice: 290, category: 'Sports', rating: 4.9, reviews: 189, isFeatured: true, badge: 'New', image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&q=80', description: 'Enjoy performance driving, save energy.' },
  { _id: '3', brand: 'BFGoodrich', model: 'All-Terrain T/A KO2', size: '265/70R17', width: 265, aspectRatio: 70, rimSize: 17, price: 310, originalPrice: 360, category: '4WD', rating: 4.7, reviews: 456, isFeatured: true, badge: '$150 Cashback', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&q=80', description: 'Built for the toughest off-road conditions.' },
  { _id: '4', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16', width: 205, aspectRatio: 55, rimSize: 16, price: 142, originalPrice: 165, category: 'Sedan', rating: 4.6, reviews: 312, isFeatured: false, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Superior comfort and fuel efficiency for everyday driving.' },
  { _id: '5', brand: 'Goodyear', model: 'Eagle F1 Asymmetric 6', size: '245/40R18', width: 245, aspectRatio: 40, rimSize: 18, price: 278, originalPrice: 320, category: 'Sports', rating: 4.8, reviews: 178, isFeatured: false, image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&q=80', description: 'Ultra high performance tyre for sports cars.' },
  { _id: '6', brand: 'Continental', model: 'PremiumContact 7', size: '225/50R17', width: 225, aspectRatio: 50, rimSize: 17, price: 198, originalPrice: 230, category: 'Sedan', rating: 4.7, reviews: 267, isFeatured: false, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Premium performance with outstanding wet braking.' },
];

const Tyres = () => {
  const [tyres, setTyres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [filters, setFilters] = useState({ category: initialCategory, brand: '', minPrice: '', maxPrice: '', sort: 'default' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const { data } = await axios.get('/api/tyres');
        setTyres(data.data || mockTyres);
      } catch {
        setTyres(mockTyres);
      } finally {
        setLoading(false);
      }
    };
    fetchTyres();
  }, []);

  const getFiltered = () => {
    let result = [...tyres];
    if (search) result = result.filter(t => `${t.brand} ${t.model} ${t.size}`.toLowerCase().includes(search.toLowerCase()));
    if (filters.category) result = result.filter(t => t.category === filters.category);
    if (filters.brand) result = result.filter(t => t.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    if (filters.minPrice) result = result.filter(t => t.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter(t => t.price <= Number(filters.maxPrice));
    if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  };

  const filtered = getFiltered();
  const categories = ['', 'SUV', 'Sedan', 'Sports', '4WD', 'Truck'];
  const brands = ['', 'Michelin', 'Bridgestone', 'Goodyear', 'Continental', 'Pirelli', 'BFGoodrich'];

  return (
    <main className="tyres-page">
      <div className="tyres-page-hero">
        <div className="container">
          <h1 className="section-title">All Tyres</h1>
          <p className="section-subtitle">Find the perfect tyres for your vehicle from Australia's best brands.</p>
        </div>
      </div>

      <div className="container">
        <div className="tyres-controls">
          {/* Search */}
          <div className="tyres-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search by brand, model or size..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort */}
          <select
            className="tyres-sort"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Filter Toggle (Mobile) */}
          <button className="btn btn-dark filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <FiFilter /> Filters
          </button>
        </div>

        <div className="tyres-layout">
          {/* Sidebar Filters */}
          <aside className={`tyres-sidebar glass ${showFilters ? 'open' : ''}`}>
            <h3 className="sidebar-title">Filter Tyres</h3>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="filter-select">
                {categories.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Brand</label>
              <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="filter-select">
                {brands.map(b => <option key={b} value={b}>{b || 'All Brands'}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-inputs">
                <input type="number" placeholder="Min $" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="price-input" />
                <span>–</span>
                <input type="number" placeholder="Max $" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="price-input" />
              </div>
            </div>

            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setFilters({ category: '', brand: '', minPrice: '', maxPrice: '', sort: 'default' })}>
              Clear Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="tyres-results">
            <div className="results-count">{filtered.length} tyres found</div>
            {loading ? (
              <div className="tyres-grid-page">
                {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: '380px', borderRadius: '16px' }} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="no-results">
                <div className="no-results-emoji">🛞</div>
                <h3>No tyres found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="tyres-grid-page">
                {filtered.map((tyre, i) => {
                  const disc = tyre.originalPrice ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100) : 0;
                  return (
                    <div key={tyre._id} className="tyre-card-page card-3d" style={{ animationDelay: `${i * 0.05}s` }}>
                      {tyre.badge && <div className="tyre-badge-sm">{tyre.badge}</div>}
                      {disc > 0 && <div className="tyre-disc-sm">-{disc}%</div>}
                      <div className="tyre-img-wrap-page">
                        <img src={tyre.image} alt={`${tyre.brand} ${tyre.model}`} />
                        <span className="tyre-cat-sm">{tyre.category}</span>
                      </div>
                      <div className="tyre-body-page">
                        <div className="tyre-brand-sm">{tyre.brand}</div>
                        <h3 className="tyre-model-sm">{tyre.model}</h3>
                        <div className="tyre-size-sm">{tyre.size}</div>
                        <div className="tyre-rating-row">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <FiStar key={j} size={11} fill={j < Math.floor(tyre.rating) ? '#FFD700' : 'none'} color={j < Math.floor(tyre.rating) ? '#FFD700' : '#444'} />
                          ))}
                          <span className="tyre-rating-num">{tyre.rating} ({tyre.reviews})</span>
                        </div>
                        <div className="tyre-price-row">
                          <span className="tyre-p">${tyre.price}</span>
                          {tyre.originalPrice && <span className="tyre-op">${tyre.originalPrice}</span>}
                        </div>
                        <div className="tyre-btn-row">
                          <Link to={`/tyres/${tyre._id}`} className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}>Details</Link>
                          <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}>
                            <FiShoppingCart size={12} /> Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tyres;

