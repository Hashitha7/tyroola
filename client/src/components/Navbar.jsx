import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiPhone } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tyres', path: '/tyres' },
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

