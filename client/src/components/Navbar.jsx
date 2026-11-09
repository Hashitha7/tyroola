import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiPhone, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import './Navbar.css';

/* ── Tyre category items ── */
const tyreCategories = [
  {
    id: 'car',
    label: 'Car Tyres',
    desc: 'Bridgestone, Pirelli, Michelin, Dunlop & more',
    category: 'Sedan',
    icon: (
      <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L47 10 C50 10 53 11 54 14 L60 26 Z" />
        <path d="M2 26 L62 26 C63 26 64 27 64 28 L64 30 C64 32 62 33 60 33 L48 33 C48 29 45 26 41 26 C37 26 34 29 34 33 L30 33 C30 29 27 26 23 26 C19 26 16 29 16 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="23" cy="33" r="4.5" />
        <circle cx="41" cy="33" r="4.5" />
        <line x1="21" y1="14" x2="43" y2="14" strokeWidth="1.5" />
      </svg>
    ),
    color: '#00d4ff',
  },
  {
    id: '4x4',
    label: '4x4 Tyres',
    desc: 'BFGoodrich, Monsta, General Tires, Toyo & more',
    category: 'SUV',
    icon: (
      <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="12" width="64" height="20" rx="4" />
        <path d="M4 18 L68 18" />
        <path d="M14 12 L10 4 L62 4 L58 12" />
        <circle cx="18" cy="34" r="5.5" />
        <circle cx="54" cy="34" r="5.5" />
        <rect x="1" y="22" width="6" height="8" rx="2" />
        <rect x="65" y="22" width="6" height="8" rx="2" />
      </svg>
    ),
    color: '#ffd700',
  },
  {
    id: 'allterrain',
    label: 'All Terrain Tyres',
    desc: 'Toyo, Nitto, Falken, Goodyear, BFGoodrich & more',
    category: '4WD',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <path d="M4 18 L68 18" />
        <path d="M12 10 L8 2 L64 2 L60 10" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
        <rect x="1" y="20" width="6" height="10" rx="2" />
        <rect x="65" y="20" width="6" height="10" rx="2" />
        <path d="M22 36 L50 36" strokeDasharray="4 2" />
      </svg>
    ),
    color: '#ff6b35',
  },
  {
    id: 'mudterrain',
    label: 'Mud Terrain Tyres',
    desc: 'Goodyear, Hankook, Federal, Monsta & more',
    category: 'MudTerrain',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <path d="M12 10 L8 2 L64 2 L60 10" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
        <rect x="1" y="20" width="6" height="10" rx="2" />
        <rect x="65" y="20" width="6" height="10" rx="2" />
        <path d="M18 42 L14 44 M18 42 L22 44 M54 42 L50 44 M54 42 L58 44" strokeWidth="1.5" />
      </svg>
    ),
    color: '#a3722a',
  },
  {
    id: 'highway',
    label: 'Highway Tyres',
    desc: 'Continental, Pirelli, Michelin, Dunlop & more',
    category: 'Highway',
    icon: (
      <svg viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L55 10 C58 10 61 11 62 14 L68 26 Z" />
        <path d="M2 26 L70 26 C71 26 72 27 72 28 L72 30 C72 32 70 33 68 33 L54 33 C54 29 51 26 47 26 C43 26 40 29 40 33 L32 33 C32 29 29 26 25 26 C21 26 18 29 18 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="25" cy="33" r="4.5" />
        <circle cx="47" cy="33" r="4.5" />
        <line x1="10" y1="0" x2="10" y2="8" strokeDasharray="2 2" />
        <line x1="36" y1="0" x2="36" y2="8" strokeDasharray="2 2" />
        <line x1="62" y1="0" x2="62" y2="8" strokeDasharray="2 2" />
      </svg>
    ),
    color: '#00e676',
  },
  {
    id: 'lighttruck',
    label: 'Light Truck Tyres',
    desc: 'Michelin, Accelera, Hankook, Goodride & more',
    category: 'LightTruck',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="10" width="52" height="20" rx="3" />
        <path d="M54 14 L66 14 L74 20 L74 30 L54 30 Z" />
        <rect x="56" y="14" width="10" height="8" rx="1" fill="none" />
        <circle cx="16" cy="34" r="5" />
        <circle cx="46" cy="34" r="5" />
        <circle cx="68" cy="34" r="5" />
      </svg>
    ),
    color: '#ba68c8',
  },
  {
    id: 'truck',
    label: 'Truck Tyres',
    desc: 'Bridgestone, Michelin, Hankook, Goodride & more',
    category: 'Truck',
    icon: (
      <svg viewBox="0 0 88 42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="8" width="56" height="24" rx="3" />
        <path d="M58 14 L72 14 L80 22 L80 32 L58 32 Z" />
        <rect x="60" y="14" width="12" height="10" rx="1" fill="none" />
        <circle cx="14" cy="36" r="5.5" />
        <circle cx="36" cy="36" r="5.5" />
        <circle cx="58" cy="36" r="5.5" />
        <circle cx="74" cy="36" r="5.5" />
        <rect x="0" y="20" width="4" height="8" rx="1" />
      </svg>
    ),
    color: '#ef5350',
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle Tyres',
    desc: 'Pirelli, Bridgestone, Metzeler, Dunlop & more',
    category: 'Motorcycle',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="16" cy="30" r="11" />
        <circle cx="56" cy="30" r="11" />
        <path d="M27 30 L45 30" />
        <path d="M34 10 C34 10 28 14 24 20 L40 20 L46 10 Z" />
        <path d="M46 10 L52 14 L56 19" />
        <path d="M34 10 L38 6 L50 6 L54 12" strokeWidth="1.5" />
        <path d="M28 20 L28 24" />
      </svg>
    ),
    color: '#ff4081',
  },
  {
    id: 'agriculture',
    label: 'Agriculture Tyres',
    desc: 'Bridgestone, Michelin and many more',
    category: 'Agriculture',
    icon: (
      <svg viewBox="0 0 72 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="52" cy="32" r="14" />
        <circle cx="20" cy="38" r="8" />
        <path d="M20 30 L20 10 C20 10 28 8 36 12 L44 18 L52 18" />
        <path d="M28 10 L32 20" strokeWidth="1.5" />
        <path d="M52 18 C52 18 60 22 62 32" strokeWidth="1.5" />
      </svg>
    ),
    color: '#8bc34a',
  },
  {
    id: 'guides',
    label: 'Tyre Guides',
    desc: 'Find the right tyre size for your vehicle',
    category: 'RunFlat',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="24" />
        <circle cx="32" cy="32" r="14" />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
        <text x="26" y="12" fontSize="8" fill="currentColor" stroke="none" fontFamily="monospace" fontWeight="bold">265</text>
        <line x1="32" y1="8" x2="32" y2="18" />
        <line x1="32" y1="46" x2="32" y2="56" />
        <line x1="8" y1="32" x2="18" y2="32" />
        <line x1="46" y1="32" x2="56" y2="32" />
      </svg>
    ),
    color: '#ffd700',
  },
  {
    id: 'vehicle',
    label: 'Vehicle',
    desc: 'Find the right tyres for your specific vehicle',
    category: 'Sedan',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 30 L14 18 C15 15 18 14 21 14 L43 14 C46 14 49 15 50 18 L56 30 Z" />
        <path d="M6 30 L58 30 C59 30 60 31 60 32 L60 36 C60 38 58 40 56 40 L46 40 C46 36 43 33 39 33 C35 33 32 36 32 40 L32 40 L32 40 C32 36 29 33 25 33 C21 33 18 36 18 40 L8 40 C6 40 4 38 4 36 L4 32 C4 31 5 30 6 30 Z" />
        <circle cx="25" cy="40" r="5" />
        <circle cx="39" cy="40" r="5" />
        <path d="M20 20 L44 20" strokeWidth="1.5" />
        <path d="M12 30 L52 30" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    ),
    color: '#00d4ff',
  },
  {
    id: 'protect',
    label: 'Tyre Protect',
    desc: 'Get Tyre Coverage For Your Vehicle',
    category: 'RunFlat',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="14" />
        <circle cx="32" cy="32" r="5" />
        <path d="M32 10 L32 18 M32 46 L32 54 M10 32 L18 32 M46 32 L54 32" />
        <path d="M20 20 L26 26 M38 38 L44 44 M44 20 L38 26 M26 38 L20 44" strokeWidth="1.5" />
        <path d="M22 8 L32 4 L42 8 L42 24 C42 32 32 38 32 38 C32 38 22 32 22 24 Z" strokeWidth="2" />
      </svg>
    ),
    color: '#00e676',
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tyresOpen, setTyresOpen] = useState(false);
  const tyresRef = useRef(null);
  const timeoutRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tyresRef.current && !tyresRef.current.contains(e.target)) {
        setTyresOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setTyresOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const handleTyresEnter = () => {
    clearTimeout(timeoutRef.current);
    setTyresOpen(true);
  };
  const handleTyresLeave = () => {
    timeoutRef.current = setTimeout(() => setTyresOpen(false), 180);
  };

  const navLinks = [
    { label: 'Deals', path: '/deals' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="nav-banner">
        <span>🎁 Up to <strong>$700 Gift Card</strong> on 4 selected Michelin tyres</span>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-text">TYROOLA</span>
            <div className="logo-dot" />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {/* ── Tyres Dropdown ── */}
            <li
              className="nav-item-tyres"
              ref={tyresRef}
              onMouseEnter={handleTyresEnter}
              onMouseLeave={handleTyresLeave}
            >
              <button
                className={`nav-link tyres-trigger ${pathname === '/tyres' ? 'active' : ''} ${tyresOpen ? 'dropdown-active' : ''}`}
                onClick={() => navigate('/tyres')}
                aria-expanded={tyresOpen}
              >
                Tyres
                <FiChevronDown className={`tyres-chevron ${tyresOpen ? 'rotated' : ''}`} />
                <span className="nav-link-line" />
              </button>

              {/* Mega Dropdown */}
              <div className={`tyres-mega-dropdown ${tyresOpen ? 'open' : ''}`} onMouseEnter={handleTyresEnter} onMouseLeave={handleTyresLeave}>
                <div className="mega-dropdown-inner">
                  {/* Header */}
                  <div className="mega-header">
                    <span className="mega-header-title">Shop Tyres by Type</span>
                    <Link to="/tyres" className="mega-header-cta" onClick={() => setTyresOpen(false)}>
                      View All Tyres <FiArrowRight />
                    </Link>
                  </div>

                  {/* Grid of categories */}
                  <div className="mega-grid">
                    {tyreCategories.map((cat, i) => (
                      <Link
                        key={cat.id}
                        to={`/tyres?category=${cat.category}`}
                        className="mega-item"
                        style={{ '--item-color': cat.color, animationDelay: `${i * 0.03}s` }}
                        onClick={() => setTyresOpen(false)}
                      >
                        <div className="mega-item-icon" style={{ color: cat.color }}>
                          {cat.icon}
                        </div>
                        <div className="mega-item-info">
                          <span className="mega-item-label">{cat.label}</span>
                          <span className="mega-item-desc">{cat.desc}</span>
                        </div>
                        <div className="mega-item-arrow">
                          <FiArrowRight size={14} />
                        </div>
                        <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${cat.color}22, transparent 70%)` }} />
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Bar */}
                  <div className="mega-footer">
                    <span className="mega-footer-text">🏆 Australia's #1 Online Tyre Store · 800+ Fitting Locations</span>
                  </div>
                </div>
              </div>
            </li>

            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                  <span className="nav-link-line" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            <a href="tel:1800000000" className="nav-phone">
              <FiPhone size={16} />
              <span>1800 000 000</span>
            </a>
            <Link to="/tyres" className="btn btn-primary nav-cta">
              Shop Tyres
            </Link>
            <Link to="/cart" className="nav-cart">
              <FiShoppingCart size={20} />
              <span className="cart-badge">0</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/tyres" className="mobile-link" onClick={() => setMenuOpen(false)}>Tyres</Link>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/tyres"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => setMenuOpen(false)}
          >
            Shop Tyres
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
