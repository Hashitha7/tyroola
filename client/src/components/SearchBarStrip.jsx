import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './SearchBarStrip.css';

const SearchBarStrip = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('size');
  const [tyreSize, setTyreSize] = useState({ width: '265', aspectRatio: '65', rim: '17' });
  const [rego, setRego] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'size') {
      const { width, aspectRatio, rim } = tyreSize;
      navigate(`/tyres?width=${width}&aspectRatio=${aspectRatio}&rimSize=${rim}`);
    } else {
      navigate('/tyres');
    }
  };

  return (
    <div className="search-strip-container">
      <div className="search-strip-bar">
        <span className="search-strip-label">Search for tyres by</span>

        <button
          type="button"
          className={`search-strip-tab ${activeTab === 'size' ? 'active' : ''}`}
          onClick={() => setActiveTab('size')}
        >
          <div className="strip-wheel-icon">⚙️</div>
          <span className="strip-tab-text">Tyre Size</span>
          <span className="strip-badge-easiest">Easiest</span>
          <FiArrowRight className="strip-arrow" />
        </button>

        <button
          type="button"
          className={`search-strip-tab ${activeTab === 'rego' ? 'active' : ''}`}
          onClick={() => setActiveTab('rego')}
        >
          <span className="rego-plate-badge">AB-123</span>
          <span className="strip-tab-text">Rego</span>
          <FiArrowRight className="strip-arrow" />
        </button>
      </div>

      {/* Quick Search Dropdown / Popout when clicked */}
      <form onSubmit={handleSearch} className="search-strip-dropdown glass">
        {activeTab === 'size' ? (
          <div className="strip-inputs-row">
            <span className="strip-input-label">Select dimensions:</span>
            <input
              type="text"
              className="strip-field"
              value={tyreSize.width}
              onChange={(e) => setTyreSize({ ...tyreSize, width: e.target.value })}
              placeholder="Width"
            />
            <span className="strip-slash">/</span>
            <input
              type="text"
              className="strip-field"
              value={tyreSize.aspectRatio}
              onChange={(e) => setTyreSize({ ...tyreSize, aspectRatio: e.target.value })}
              placeholder="Aspect"
            />
            <span className="strip-slash">R</span>
            <input
              type="text"
              className="strip-field"
              value={tyreSize.rim}
              onChange={(e) => setTyreSize({ ...tyreSize, rim: e.target.value })}
              placeholder="Rim"
            />
            <button type="submit" className="btn btn-primary strip-search-btn">
              Find Tyres <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="strip-inputs-row">
            <span className="strip-input-label">Vehicle Registration:</span>
            <input
              type="text"
              className="strip-field rego-field"
              value={rego}
              onChange={(e) => setRego(e.target.value.toUpperCase())}
              placeholder="e.g. NSW-789"
            />
            <button type="submit" className="btn btn-primary strip-search-btn">
              Search by Rego <FiArrowRight />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBarStrip;

