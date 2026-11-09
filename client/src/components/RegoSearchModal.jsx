import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiX, FiArrowRight, FiEdit2 } from 'react-icons/fi';
import './RegoSearchModal.css';

// 8 Australian States & Territories exactly as in user screenshot
const states = [
  'ACT', 'NT', 'SA', 'WA',
  'NSW', 'QLD', 'VIC', 'TAS'
];

const RegoSearchModal = ({ isOpen, onClose, onSwitchToTyreSize }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [regoPlate, setRegoPlate] = useState('');

  if (!isOpen) return null;

  // Handle selecting a state (Step 1 -> Step 2)
  const handleSelectState = (state) => {
    setSelectedState(state);
    setStep(2);
  };

  // Back button handler
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!regoPlate.trim()) return;
    onClose();
    navigate(`/tyres?state=${selectedState}&rego=${encodeURIComponent(regoPlate.trim())}`);
  };

  return (
    <div className="rego-modal-backdrop" onClick={onClose}>
      <div className="rego-modal-card 3d-card" onClick={(e) => e.stopPropagation()}>
        {/* ── 1. Top Black Header Bar ── */}
        <div className="rego-modal-header">
          {/* Back button on step 2 */}
          <div className="header-left">
            {step > 1 && (
              <button type="button" className="header-back-btn" onClick={handleBack} title="Back">
                <FiChevronLeft size={20} />
              </button>
            )}
          </div>

          {/* Dynamic Title */}
          <div className="header-title-box">
            {step === 1 ? (
              <span className="header-title-text">Search by rego</span>
            ) : (
              <span className="header-title-text" onClick={() => setStep(1)} title="Click to change state">
                Search in <strong className="highlight-val">{selectedState}</strong> <FiEdit2 className="edit-pencil-icon" />
              </span>
            )}
          </div>

          {/* Close button */}
          <button type="button" className="header-close-btn" onClick={onClose} title="Close">
            <FiX size={18} />
          </button>

          {/* Top Yellow Progress Bar */}
          <div
            className="header-progress-line"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>

        {/* ── 2. Modal Body (Compact & Fitted, No Scrollbar) ── */}
        <div className="rego-modal-body">
          {/* Top step counter */}
          <div className="step-counter-row">
            <span className="step-counter-text">Step {step}/4</span>
          </div>

          {/* ═════════════════════════════════════════════════════
               STEP 1: SELECT YOUR STATE (Matching Screenshot 2)
             ═════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="step-content-pane">
              <h3 className="step-main-title">Select your <strong>state</strong></h3>

              {/* 8 State Boxes: 4 Columns x 2 Rows */}
              <div className="rego-states-grid">
                {states.map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`rego-state-btn ${selectedState === st ? 'selected' : ''}`}
                    onClick={() => handleSelectState(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Switch to Tyre Size Search link */}
              <div className="switch-search-link-row">
                <span>Looking by tyre dimensions? </span>
                <button
                  type="button"
                  className="link-btn-switch"
                  onClick={() => {
                    onClose();
                    if (onSwitchToTyreSize) onSwitchToTyreSize();
                  }}
                >
                  Search by tyre size
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════
               STEP 2: ENTER REGO NUMBER
             ═════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="step-content-pane">
              <h3 className="step-main-title">Enter your <strong>{selectedState} registration</strong></h3>
              <p className="step-subtitle">We'll find the exact tyres fitted to your vehicle.</p>

              <form onSubmit={handleSearchSubmit} className="rego-form-pane">
                {/* Australian License Plate Container */}
                <div className="aus-rego-plate-wrap">
                  <div className="plate-state-tag">{selectedState}</div>
                  <input
                    type="text"
                    value={regoPlate}
                    onChange={(e) => setRegoPlate(e.target.value.toUpperCase())}
                    placeholder="e.g. ABC 123"
                    className="aus-plate-input"
                    maxLength={10}
                    autoFocus
                    required
                  />
                  <div className="plate-aus-flag">🇦🇺</div>
                </div>

                <button type="submit" className="btn-yellow-submit-rego">
                  <span>Find My Tyres</span>
                  <FiArrowRight />
                </button>
              </form>

              <div className="switch-search-link-row">
                <button
                  type="button"
                  className="link-btn-switch"
                  onClick={() => setStep(1)}
                >
                  ← Choose a different state
                </button>
              </div>
            </div>
          )}

          {/* Bottom Chat / Help Footer Strip */}
          <div className="rego-modal-footer">
            <span className="chat-help-pill">
              <span className="smile-emoji">😊</span> Need help? We're here.{' '}
              <a href="#chat" onClick={(e) => { e.preventDefault(); alert("Live Chat is open! Our Australian tyre experts are ready to assist."); }}>
                Chat to us today
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegoSearchModal;

