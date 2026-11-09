import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiPhone, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import './Navbar.css';

/* ── 1. Tyres Categories (12 items) ── */
const tyreCategories = [
  {
    id: 'car',
    label: 'Car Tyres',
    desc: 'Bridgestone, Pirelli, Michelin, Dunlop & more',
    category: 'Sedan',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L47 10 C50 10 53 11 54 14 L60 26 Z" />
        <path d="M2 26 L62 26 C63 26 64 27 64 28 L64 30 C64 32 62 33 60 33 L48 33 C48 29 45 26 41 26 C37 26 34 29 34 33 L30 33 C30 29 27 26 23 26 C19 26 16 29 16 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="23" cy="33" r="4.5" />
        <circle cx="41" cy="33" r="4.5" />
      </svg>
    ),
  },
  {
    id: '4x4',
    label: '4x4 Tyres',
    desc: 'BFGoodrich, Monsta, General Tires, Toyo & more',
    category: 'SUV',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="12" width="64" height="20" rx="4" />
        <path d="M14 12 L10 4 L62 4 L58 12" />
        <circle cx="18" cy="34" r="5.5" />
        <circle cx="54" cy="34" r="5.5" />
      </svg>
    ),
  },
  {
    id: 'allterrain',
    label: 'All Terrain Tyres',
    desc: 'Toyo, Nitto, Falken, Goodyear, BFGoodrich & more',
    category: '4WD',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <path d="M12 10 L8 2 L64 2 L60 10" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
      </svg>
    ),
  },
  {
    id: 'mudterrain',
    label: 'Mud Terrain Tyres',
    desc: 'Goodyear, Hankook, Federal, Monsta & more',
    category: 'MudTerrain',
    color: '#a3722a',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
      </svg>
    ),
  },
  {
    id: 'highway',
    label: 'Highway Tyres',
    desc: 'Continental, Pirelli, Michelin, Dunlop & more',
    category: 'Highway',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L55 10 C58 10 61 11 62 14 L68 26 Z" />
        <circle cx="25" cy="33" r="4.5" />
        <circle cx="47" cy="33" r="4.5" />
      </svg>
    ),
  },
  {
    id: 'lighttruck',
    label: 'Light Truck Tyres',
    desc: 'Michelin, Accelera, Hankook, Goodride & more',
    category: 'LightTruck',
    color: '#ba68c8',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="10" width="52" height="20" rx="3" />
        <path d="M54 14 L66 14 L74 20 L74 30 L54 30 Z" />
        <circle cx="16" cy="34" r="5" />
        <circle cx="46" cy="34" r="5" />
        <circle cx="68" cy="34" r="5" />
      </svg>
    ),
  },
  {
    id: 'truck',
    label: 'Truck Tyres',
    desc: 'Bridgestone, Michelin, Hankook, Goodride & more',
    category: 'Truck',
    color: '#ef5350',
    icon: (
      <svg viewBox="0 0 88 42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="8" width="56" height="24" rx="3" />
        <path d="M58 14 L72 14 L80 22 L80 32 L58 32 Z" />
        <circle cx="14" cy="36" r="5.5" />
        <circle cx="36" cy="36" r="5.5" />
        <circle cx="58" cy="36" r="5.5" />
        <circle cx="74" cy="36" r="5.5" />
      </svg>
    ),
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle Tyres',
    desc: 'Pirelli, Bridgestone, Metzeler, Dunlop & more',
    category: 'Motorcycle',
    color: '#ff4081',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="16" cy="30" r="11" />
        <circle cx="56" cy="30" r="11" />
        <path d="M27 30 L45 30" />
        <path d="M34 10 L38 6 L50 6 L54 12" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'agriculture',
    label: 'Agriculture Tyres',
    desc: 'Bridgestone, Michelin and many more',
    category: 'Agriculture',
    color: '#8bc34a',
    icon: (
      <svg viewBox="0 0 72 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="52" cy="32" r="14" />
        <circle cx="20" cy="38" r="8" />
        <path d="M20 30 L20 10 L44 18 L52 18" />
      </svg>
    ),
  },
  {
    id: 'guides',
    label: 'Tyre Guides',
    desc: 'Find the right tyre size for your vehicle',
    category: 'RunFlat',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="24" />
        <circle cx="32" cy="32" r="14" />
        <text x="26" y="12" fontSize="8" fill="currentColor" stroke="none" fontFamily="monospace" fontWeight="bold">265</text>
      </svg>
    ),
  },
  {
    id: 'vehicle',
    label: 'Vehicle',
    desc: 'Find the right tyres for your specific vehicle',
    category: 'Sedan',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 30 L14 18 C15 15 18 14 21 14 L43 14 C46 14 49 15 50 18 L56 30 Z" />
        <circle cx="25" cy="40" r="5" />
        <circle cx="39" cy="40" r="5" />
      </svg>
    ),
  },
  {
    id: 'protect',
    label: 'Tyre Protect',
    desc: 'Get Tyre Coverage For Your Vehicle',
    category: 'RunFlat',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="22" />
        <path d="M22 8 L32 4 L42 8 L42 24 C42 32 32 38 32 38 C32 38 22 32 22 24 Z" strokeWidth="2" />
      </svg>
    ),
  },
];

/* ── 2. Wheels Categories (Screenshot 1) ── */
const wheelsCategories = [
  {
    id: 'car-wheels',
    label: 'Car wheels',
    desc: 'Discover Advanti, Enkei, Konig, Lowenhart, Marriba and many more',
    path: '/tyres',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L47 10 C50 10 53 11 54 14 L60 26 Z" />
        <path d="M2 26 L62 26 C63 26 64 27 64 28 L64 30 C64 32 62 33 60 33 L48 33 C48 29 45 26 41 26 C37 26 34 29 34 33 L30 33 C30 29 27 26 23 26 C19 26 16 29 16 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="23" cy="33" r="5" stroke="#ffd700" strokeWidth="2.5" />
        <circle cx="41" cy="33" r="5" stroke="#ffd700" strokeWidth="2.5" />
        <circle cx="23" cy="33" r="1.5" fill="#ffd700" />
        <circle cx="41" cy="33" r="1.5" fill="#ffd700" />
      </svg>
    ),
  },
  {
    id: '4x4-wheels',
    label: '4x4 & SUV Rims',
    desc: 'Heavy duty off-road rims from Fuel, KMC, Method & King Wheels',
    path: '/tyres',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="12" width="64" height="20" rx="4" />
        <path d="M14 12 L10 4 L62 4 L58 12" />
        <circle cx="18" cy="34" r="6" stroke="#ff6b35" strokeWidth="2.5" />
        <circle cx="54" cy="34" r="6" stroke="#ff6b35" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'alloy-wheels',
    label: 'Alloy Wheels',
    desc: 'Lightweight performance alloys engineered for strength & style',
    path: '/tyres',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="10" />
        <circle cx="32" cy="32" r="4" fill="currentColor" />
        <line x1="32" y1="6" x2="32" y2="22" strokeWidth="2.5" />
        <line x1="32" y1="42" x2="32" y2="58" strokeWidth="2.5" />
        <line x1="6" y1="32" x2="22" y2="32" strokeWidth="2.5" />
        <line x1="42" y1="32" x2="58" y2="32" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'steel-wheels',
    label: 'Steel Wheels',
    desc: 'Rugged & durable steelies built for demanding Australian conditions',
    path: '/tyres',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="15" strokeDasharray="4 3" />
        <circle cx="32" cy="32" r="6" fill="currentColor" />
      </svg>
    ),
  },
];

/* ── 3. Services / Repairs (Screenshot 2) ── */
const servicesCategories = [
  {
    id: 'car-services',
    label: 'Car services',
    desc: 'Logbook services & Basic general services',
    path: '/contact',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 28 L12 16 C13 13 16 12 19 12 L45 12 C48 12 51 13 52 16 L58 28 Z" />
        <path d="M4 28 L60 28 C61 28 62 29 62 30 L62 32 C62 34 60 35 58 35 L48 35 C48 31 45 28 41 28 C37 28 34 31 34 35 L30 35 C30 31 27 28 23 28 C19 28 16 31 16 35 L6 35 C4 35 2 34 2 32 L2 30 C2 29 3 28 4 28 Z" />
        <circle cx="23" cy="35" r="4.5" />
        <circle cx="41" cy="35" r="4.5" />
        <path d="M30 4 L34 8 L32 10 L28 6 Z M33 7 L36 10" stroke="#ffd700" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'repairs',
    label: 'Repairs',
    desc: 'Battery replacement, Alternator repair, spark plug replacement & more',
    path: '/contact',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="18" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="8" />
        <path d="M22 14 L14 6 M42 14 L50 6 M22 50 L14 58 M42 50 L50 58" strokeWidth="2.5" />
        <path d="M24 40 L40 24 M38 22 L42 26" stroke="#00d4ff" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'inspections',
    label: 'Inspections',
    desc: 'Pre-purchase, Insurance coverage, Emission, Road Trip inspections & more',
    path: '/contact',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 32 L14 20 C15 17 18 16 21 16 L43 16 C46 16 49 17 50 20 L56 32 Z" />
        <circle cx="25" cy="40" r="5" />
        <circle cx="41" cy="40" r="5" />
        <circle cx="46" cy="18" r="8" stroke="#00e676" strokeWidth="2.5" />
        <line x1="52" y1="24" x2="60" y2="32" stroke="#00e676" strokeWidth="3" />
      </svg>
    ),
  },
];

/* ── 4. Deals (Screenshot 3) ── */
const dealsCategories = [
  {
    id: 'promotions',
    label: 'Promotions',
    desc: 'Our latest tyre sales and specials!',
    path: '/deals',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="24" />
        <circle cx="25" cy="25" r="4" fill="currentColor" />
        <circle cx="39" cy="39" r="4" fill="currentColor" />
        <line x1="42" y1="22" x2="22" y2="42" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'gift-cards',
    label: 'Gift Cards',
    desc: 'Give the gift of safety',
    path: '/deals',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="24" width="44" height="30" rx="3" />
        <rect x="6" y="16" width="52" height="8" rx="2" />
        <line x1="32" y1="16" x2="32" y2="54" strokeWidth="2.5" />
        <path d="M32 16 C32 16 26 6 20 10 C14 14 24 16 32 16 Z" />
        <path d="M32 16 C32 16 38 6 44 10 C50 14 40 16 32 16 Z" />
      </svg>
    ),
  },
  {
    id: 'free-shipping',
    label: 'Free Shipping',
    desc: 'Tyroola offers free shipping and delivery to selected metro areas',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 8 L54 20 L32 32 L10 20 Z" />
        <path d="M10 20 L10 44 L32 56 L32 32" />
        <path d="M54 20 L54 44 L32 56" />
        <circle cx="48" cy="14" r="10" fill="#00e676" stroke="none" />
        <text x="48" y="17" fontSize="7" fill="#000" fontWeight="bold" textAnchor="middle">FREE</text>
      </svg>
    ),
  },
  {
    id: 'tyre-deals-39',
    label: 'Tyre deals from $39',
    desc: 'At Tyroola you can fit out your whole car under $160',
    path: '/deals',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 12 L38 12 L54 28 L32 50 L16 34 Z" />
        <circle cx="26" cy="22" r="3.5" fill="currentColor" />
        <text x="36" y="36" fontSize="14" fill="currentColor" fontWeight="bold">$</text>
      </svg>
    ),
  },
  {
    id: 'afterpay',
    label: 'Afterpay',
    desc: 'Buy now. Pay for it later - in four equal instalments. Interest free.',
    path: '/deals',
    color: '#b2fce4',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="18" y="10" width="28" height="44" rx="6" />
        <line x1="28" y1="46" x2="36" y2="46" strokeWidth="2.5" />
        <path d="M26 26 L32 20 L38 26 M38 34 L32 40 L26 34" stroke="#b2fce4" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'zippay',
    label: 'Zippay',
    desc: 'Discover our interest free finance options. Simply pay in instalments.',
    path: '/deals',
    color: '#b388ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="14" width="48" height="36" rx="6" />
        <path d="M22 24 L42 24 L24 40 L42 40" stroke="#b388ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal Pay in 4',
    desc: "Split your new tyre payments in 4! It's interest free from PayPal",
    path: '/deals',
    color: '#2979ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="16" width="48" height="32" rx="5" />
        <path d="M8 26 L56 26" strokeWidth="2" />
        <circle cx="44" cy="36" r="3" fill="#2979ff" />
        <text x="24" y="39" fontSize="13" fill="#2979ff" fontWeight="bold">P</text>
      </svg>
    ),
  },
  {
    id: 'buy-4-pay-3',
    label: 'Buy 4 Pay 3',
    desc: 'Find the latest "Buy 4 and pay 3" deals',
    path: '/deals',
    color: '#ff4081',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 36 C12 26 20 20 32 20 C44 20 52 26 52 36 C52 44 46 48 38 50 L38 54 L32 54 L32 50 C24 50 16 46 12 36 Z" />
        <circle cx="20" cy="30" r="2.5" fill="currentColor" />
        <circle cx="32" cy="14" r="5" stroke="#ff4081" strokeWidth="2" />
        <line x1="32" y1="12" x2="32" y2="16" stroke="#ff4081" strokeWidth="2" />
        <text x="32" y="38" fontSize="10" fill="#ff4081" fontWeight="bold" textAnchor="middle">4 for 3</text>
      </svg>
    ),
  },
  {
    id: 'see-all-deals',
    label: 'See all deals',
    desc: 'Explore all current promotions, seasonal clearances & cashback offers',
    path: '/deals',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 54 L40 54 L36 22 L28 22 Z" />
        <rect x="26" y="14" width="12" height="8" rx="2" />
        <path d="M32 6 L32 14" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="24" y2="18" stroke="#ffd700" strokeWidth="2" />
        <line x1="40" y1="18" x2="48" y2="18" stroke="#ffd700" strokeWidth="2" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'tyres' | 'wheels' | 'services' | 'deals' | null
  const navRef = useRef(null);
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
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setActiveMenu(null);
    setMenuOpen(false);
  }, [pathname]);

  const handleMenuEnter = (menuName) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="nav-banner">
        <span>🎁 Up to <strong>$700 Gift Card</strong> on 4 selected Michelin tyres</span>
      </div>

      {/* Mega Menu Blurred Backdrop */}
      <div
        className={`mega-backdrop ${activeMenu !== null ? 'active' : ''}`}
        onClick={() => setActiveMenu(null)}
      />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-text">TYROOLA</span>
            <div className="logo-dot" />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {/* ── 1. Tyres Dropdown ── */}
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => handleMenuEnter('tyres')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`nav-link mega-trigger ${pathname === '/tyres' ? 'active' : ''} ${activeMenu === 'tyres' ? 'dropdown-active' : ''}`}
                onClick={() => {
                  if (activeMenu === 'tyres') {
                    navigate('/tyres');
                  } else {
                    setActiveMenu('tyres');
                  }
                }}
                aria-expanded={activeMenu === 'tyres'}
              >
                Tyres
                <FiChevronDown className={`mega-chevron ${activeMenu === 'tyres' ? 'rotated' : ''}`} />
                <span className="nav-link-line" />
              </button>

              {/* Tyres Mega Dropdown */}
              <div
                className={`mega-dropdown ${activeMenu === 'tyres' ? 'open' : ''}`}
                onMouseEnter={() => handleMenuEnter('tyres')}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-dropdown-inner">
                  <div className="mega-header">
                    <span className="mega-header-title">Shop Tyres by Type</span>
                    <Link to="/tyres" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                      View All Tyres <FiArrowRight />
                    </Link>
                  </div>

                  <div className="mega-grid mega-grid-4">
                    {tyreCategories.map((cat, i) => (
                      <Link
                        key={cat.id}
                        to={`/tyres?category=${cat.category}`}
                        className="mega-item"
                        style={{ '--item-color': cat.color, animationDelay: `${i * 0.02}s` }}
                        onClick={() => setActiveMenu(null)}
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

                  <div className="mega-footer">
                    <span className="mega-footer-text">🏆 Australia's #1 Online Tyre Store · 800+ Fitting Locations</span>
                  </div>
                </div>
              </div>
            </li>

            {/* ── 2. Wheels Dropdown ── */}
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => handleMenuEnter('wheels')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`nav-link mega-trigger ${activeMenu === 'wheels' ? 'dropdown-active' : ''}`}
                onClick={() => {
                  if (activeMenu === 'wheels') {
                    navigate('/tyres');
                  } else {
                    setActiveMenu('wheels');
                  }
                }}
                aria-expanded={activeMenu === 'wheels'}
              >
                Wheels
                <FiChevronDown className={`mega-chevron ${activeMenu === 'wheels' ? 'rotated' : ''}`} />
                <span className="nav-link-line" />
              </button>

              {/* Wheels Mega Dropdown */}
              <div
                className={`mega-dropdown ${activeMenu === 'wheels' ? 'open' : ''}`}
                onMouseEnter={() => handleMenuEnter('wheels')}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-dropdown-inner">
                  <div className="mega-header">
                    <span className="mega-header-title">Rims, Mags & Wheels Online</span>
                    <Link to="/tyres" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                      Shop All Wheels <FiArrowRight />
                    </Link>
                  </div>

                  <div className="mega-grid mega-grid-4">
                    {wheelsCategories.map((w, i) => (
                      <Link
                        key={w.id}
                        to={w.path}
                        className="mega-item"
                        style={{ '--item-color': w.color, animationDelay: `${i * 0.03}s` }}
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="mega-item-icon" style={{ color: w.color }}>
                          {w.icon}
                        </div>
                        <div className="mega-item-info">
                          <span className="mega-item-label">{w.label}</span>
                          <span className="mega-item-desc">{w.desc}</span>
                        </div>
                        <div className="mega-item-arrow">
                          <FiArrowRight size={14} />
                        </div>
                        <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${w.color}22, transparent 70%)` }} />
                      </Link>
                    ))}
                  </div>

                  <div className="mega-footer">
                    <span className="mega-footer-text">⚙️ Top Wheel Brands: Advanti, Enkei, Konig, KMC, Fuel, King Wheels & Marriba</span>
                  </div>
                </div>
              </div>
            </li>

            {/* ── 3. Services / Repairs Dropdown ── */}
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => handleMenuEnter('services')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`nav-link mega-trigger ${activeMenu === 'services' ? 'dropdown-active' : ''}`}
                onClick={() => {
                  if (activeMenu === 'services') {
                    navigate('/contact');
                  } else {
                    setActiveMenu('services');
                  }
                }}
                aria-expanded={activeMenu === 'services'}
              >
                Services/Repairs
                <FiChevronDown className={`mega-chevron ${activeMenu === 'services' ? 'rotated' : ''}`} />
                <span className="nav-link-line" />
              </button>

              {/* Services Mega Dropdown */}
              <div
                className={`mega-dropdown ${activeMenu === 'services' ? 'open' : ''}`}
                onMouseEnter={() => handleMenuEnter('services')}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-dropdown-inner">
                  <div className="mega-header">
                    <span className="mega-header-title">Mechanic & Auto Services</span>
                    <Link to="/contact" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                      Book Auto Service <FiArrowRight />
                    </Link>
                  </div>

                  <div className="mega-grid mega-grid-3">
                    {servicesCategories.map((svc, i) => (
                      <Link
                        key={svc.id}
                        to={svc.path}
                        className="mega-item"
                        style={{ '--item-color': svc.color, animationDelay: `${i * 0.04}s` }}
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="mega-item-icon" style={{ color: svc.color }}>
                          {svc.icon}
                        </div>
                        <div className="mega-item-info">
                          <span className="mega-item-label">{svc.label}</span>
                          <span className="mega-item-desc">{svc.desc}</span>
                        </div>
                        <div className="mega-item-arrow">
                          <FiArrowRight size={14} />
                        </div>
                        <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${svc.color}22, transparent 70%)` }} />
                      </Link>
                    ))}
                  </div>

                  <div className="mega-footer">
                    <span className="mega-footer-text">🔧 Professional Qualified Mechanics · Nationwide Warranty & Certified Service</span>
                  </div>
                </div>
              </div>
            </li>

            {/* ── 4. Deals Dropdown ── */}
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => handleMenuEnter('deals')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`nav-link mega-trigger ${pathname === '/deals' ? 'active' : ''} ${activeMenu === 'deals' ? 'dropdown-active' : ''}`}
                onClick={() => {
                  if (activeMenu === 'deals') {
                    navigate('/deals');
                  } else {
                    setActiveMenu('deals');
                  }
                }}
                aria-expanded={activeMenu === 'deals'}
              >
                Deals
                <FiChevronDown className={`mega-chevron ${activeMenu === 'deals' ? 'rotated' : ''}`} />
                <span className="nav-link-line" />
              </button>

              {/* Deals Mega Dropdown */}
              <div
                className={`mega-dropdown ${activeMenu === 'deals' ? 'open' : ''}`}
                onMouseEnter={() => handleMenuEnter('deals')}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-dropdown-inner">
                  <div className="mega-header">
                    <span className="mega-header-title">Hot Deals & Special Offers</span>
                    <Link to="/deals" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                      Explore All Deals <FiArrowRight />
                    </Link>
                  </div>

                  <div className="mega-grid mega-grid-deals">
                    {dealsCategories.map((deal, i) => (
                      <Link
                        key={deal.id}
                        to={deal.path}
                        className={`mega-item ${deal.id === 'see-all-deals' ? 'mega-item-highlight' : ''}`}
                        style={{ '--item-color': deal.color, animationDelay: `${i * 0.02}s` }}
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="mega-item-icon" style={{ color: deal.color }}>
                          {deal.icon}
                        </div>
                        <div className="mega-item-info">
                          <span className="mega-item-label">{deal.label}</span>
                          <span className="mega-item-desc">{deal.desc}</span>
                        </div>
                        <div className="mega-item-arrow">
                          <FiArrowRight size={14} />
                        </div>
                        <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${deal.color}22, transparent 70%)` }} />
                      </Link>
                    ))}
                  </div>

                  <div className="mega-footer">
                    <span className="mega-footer-text">⚡ Buy Now Pay Later: Afterpay, Zip, PayPal · 0% Interest Available</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Regular Links */}
            <li>
              <Link
                to="/how-it-works"
                className={`nav-link ${pathname === '/how-it-works' ? 'active' : ''}`}
              >
                How It Works
                <span className="nav-link-line" />
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
                <span className="nav-link-line" />
              </Link>
            </li>
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
          <Link to="/tyres" className="mobile-link" onClick={() => setMenuOpen(false)}>Wheels</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Services/Repairs</Link>
          <Link to="/deals" className="mobile-link" onClick={() => setMenuOpen(false)}>Deals</Link>
          <Link to="/how-it-works" className="mobile-link" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
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
