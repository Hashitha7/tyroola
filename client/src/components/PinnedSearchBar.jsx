import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import TyreSizeModal from './TyreSizeModal';
import RegoSearchModal from './RegoSearchModal';
import './PinnedSearchBar.css';

const PinnedSearchBar = () => {
  const location = useLocation();
  const [pinned, setPinned] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'size' | 'rego' | null

  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      // On home page, pin when scrolled past the hero search bar (380px)
      // On other pages, pin as soon as user scrolls down past the top navbar (70px)
      const threshold = isHome ? 380 : 70;
      setPinned(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  if (!pinned) {
    return null;
  }

  return (
    <>
      {/* ── Fixed Pinned Search Bar (Centered at Top) ── */}
      <div className="pinned-search-bar-wrapper">
        <div className="pinned-exact-search-bar">
          {/* Left Yellow Label */}
          <div className="pinned-label-yellow">
            <span>Search for tyres by</span>
          </div>

          {/* Middle Button: Tyre Size (Easiest) */}
          <button
            type="button"
            className="pinned-tab-pill tab-size"
            onClick={() => setActiveModal('size')}
          >
            <div className="tab-pill-left">
              <div className="wheel-icon-svg">
                <svg viewBox="0 0 36 36" width="24" height="24">
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
          <div className="pinned-tabs-divider" />

          {/* Right Button: Rego */}
          <button
            type="button"
            className="pinned-tab-pill tab-rego"
            onClick={() => setActiveModal('rego')}
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
      </div>

      {/* ── 3D Modals ── */}
      <TyreSizeModal
        isOpen={activeModal === 'size'}
        onClose={() => setActiveModal(null)}
        onSwitchToRego={() => setActiveModal('rego')}
      />

      <RegoSearchModal
        isOpen={activeModal === 'rego'}
        onClose={() => setActiveModal(null)}
        onSwitchToTyreSize={() => setActiveModal('size')}
      />
    </>
  );
};

export default PinnedSearchBar;

