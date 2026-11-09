import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiX, FiCheck, FiHelpCircle, FiEdit2, FiInfo } from 'react-icons/fi';
import './TyreSizeModal.css';

// Pre-defined values matching Tyroola reference
const popularWidths = ['185', '195', '205', '215', '225', '235', '245', '265'];
const allWidths = ['155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275', '285', '295'];

const popularProfiles = ['None', '35', '40', '45', '50', '55', '60', '65', '70', '75'];
const allProfiles = ['None', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85'];

const rimSizes = ['R13', 'R14', 'R15', 'R16', 'R17', 'R17.5', 'R18', 'R19', 'R20', 'R21', 'R22'];

const loadIndexes = ['Any', '82', '85', '88', '91', '94', '95', '98', '100', '102', '107', '112'];
const speedRatings = ['Any', 'H (210 km/h)', 'V (240 km/h)', 'W (270 km/h)', 'Y (300 km/h)', 'T (190 km/h)', 'S (180 km/h)'];

/**
 * 3D Tyre Top Arc with Sidewall Markings & Checkmark Badges
 */
const TyreSidewallIllustration = ({ step, width, profile, rim }) => {
  const displayWidth = width || '205';
  const displayProfile = profile === 'None' ? '' : (profile ? ` / ${profile}` : ' / 60');
  const displayRim = rim ? ` ${rim}` : ' R16';

  return (
    <div className="tyre-arc-visual-wrapper">
      <svg viewBox="0 0 520 180" className="tyre-arc-svg">
        <defs>
          <linearGradient id="tyre-rubber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#181b22" />
            <stop offset="35%" stop-color="#242933" />
            <stop offset="80%" stop-color="#14171d" />
            <stop offset="100%" stop-color="#0a0c10" />
          </linearGradient>

          <linearGradient id="rim-alloy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="50%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>

          <filter id="badge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#10b981" flood-opacity="0.5" />
          </filter>
        </defs>

        {/* ── Outer Tyre Tread Arc ── */}
        <path
          d="M 60 175 A 200 135 0 0 1 460 175"
          fill="none"
          stroke="url(#tyre-rubber)"
          strokeWidth="38"
          strokeLinecap="round"
        />

        {/* Tread Grooves (sipes) */}
        <path
          d="M 64 175 A 196 131 0 0 1 456 175"
          fill="none"
          stroke="#0f1117"
          strokeWidth="4"
          strokeDasharray="8 6"
        />
        <path
          d="M 72 175 A 188 123 0 0 1 448 175"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />

        {/* ── Sidewall Layer ── */}
        <path
          d="M 95 175 A 165 105 0 0 1 425 175"
          fill="none"
          stroke="#11151c"
          strokeWidth="28"
        />

        {/* Inner Wheel Rim Lip ── */}
        <path
          d="M 115 175 A 145 85 0 0 1 405 175"
          fill="none"
          stroke="url(#rim-alloy)"
          strokeWidth="12"
        />
        <path
          d="M 124 175 A 136 76 0 0 1 396 175"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Wheel Spokes Arches */}
        <path d="M 210 175 L 210 120 A 50 50 0 0 1 310 120 L 310 175" fill="none" stroke="#0f172a" strokeWidth="10" />
        <path d="M 155 175 L 175 135" stroke="#1e293b" strokeWidth="8" />
        <path d="M 365 175 L 345 135" stroke="#1e293b" strokeWidth="8" />

        {/* ── Sidewall Text Details ── */}
        {/* Width Group */}
        <g transform="translate(182, 86)">
          {/* Green Checkmark Badge if Step > 1 */}
          {step > 1 && (
            <g transform="translate(0, -22)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="8" fill="#10b981" />
              <path d="M -3.5 -0.5 L -1 2 L 4 -3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 1 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {displayWidth}
          </text>
        </g>

        {/* Separator / */}
        <text x="212" y="86" textAnchor="middle" fontSize="18" fontWeight="800" fill="#94a3b8">/</text>

        {/* Profile Group */}
        <g transform="translate(242, 86)">
          {/* Green Checkmark Badge if Step > 2 */}
          {step > 2 && (
            <g transform="translate(0, -22)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="8" fill="#10b981" />
              <path d="M -3.5 -0.5 L -1 2 L 4 -3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 2 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {profile === 'None' ? '—' : (profile || '60')}
          </text>
        </g>

        {/* Rim Size Group */}
        <g transform="translate(294, 86)">
          {/* Green Checkmark Badge if Step === 3 and rim selected */}
          {rim && (
            <g transform="translate(0, -22)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="8" fill="#10b981" />
              <path d="M -3.5 -0.5 L -1 2 L 4 -3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 3 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {displayRim.trim()}
          </text>
        </g>

        {/* Extra Sidewall Markings (91V OE) */}
        <text x="352" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#cbd5e1" opacity="0.8">
          91V
        </text>
        <text x="388" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#94a3b8" opacity="0.6">
          OE
        </text>
      </svg>
    </div>
  );
};

const TyreSizeModal = ({ isOpen, onClose, onSwitchToRego }) => {
  const navigate = useNavigate();

  // Multi-step states: 1 = Width, 2 = Profile, 3 = Rim & Refine
  const [step, setStep] = useState(1);
  const [selectedWidth, setSelectedWidth] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedRim, setSelectedRim] = useState('');
  const [loadIndex, setLoadIndex] = useState('Any');
  const [speedRating, setSpeedRating] = useState('Any');

  const [showAllWidths, setShowAllWidths] = useState(false);
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  if (!isOpen) return null;

  // Handle selecting Width (Step 1 -> Step 2)
  const handleSelectWidth = (w) => {
    setSelectedWidth(w);
    setStep(2);
  };

  // Handle selecting Profile (Step 2 -> Step 3)
  const handleSelectProfile = (p) => {
    setSelectedProfile(p);
    setStep(3);
  };

  // Handle selecting Rim
  const handleSelectRim = (r) => {
    setSelectedRim(r);
  };

  // Back button handler
  const handleBack = () => {
    if (step === 3) {
      if (selectedRim) {
        setSelectedRim('');
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(1);
    }
  };

  // Final search submit
  const handleContinue = () => {
    const w = selectedWidth || '205';
    const p = selectedProfile === 'None' ? '' : (selectedProfile || '55');
    const r = selectedRim ? selectedRim.replace('R', '') : '16';

    let query = `/tyres?width=${w}&aspectRatio=${p}&rimSize=${r}`;
    if (loadIndex && loadIndex !== 'Any') query += `&loadIndex=${loadIndex}`;
    if (speedRating && speedRating !== 'Any') query += `&speedRating=${speedRating.charAt(0)}`;

    onClose();
    navigate(query);
  };

  return (
    <div className="tyre-size-modal-backdrop" onClick={onClose}>
      <div className="tyre-size-modal-card 3d-card" onClick={(e) => e.stopPropagation()}>
        {/* ── 1. Black Top Bar Header ── */}
        <div className="size-modal-header">
          {/* Back button on step 2 & 3 */}
          <div className="header-left">
            {step > 1 && (
              <button type="button" className="header-back-btn" onClick={handleBack} title="Back">
                <FiChevronLeft size={22} />
              </button>
            )}
          </div>

          {/* Dynamic Title with yellow active dimensions and pencil icon */}
          <div className="header-title-box">
            {step === 1 && <span className="header-title-text">Search by tyre size</span>}
            {step === 2 && (
              <span className="header-title-text" onClick={() => setStep(1)} title="Click to edit width">
                Search for <strong className="highlight-val">{selectedWidth}</strong> <FiEdit2 className="edit-pencil-icon" />
              </span>
            )}
            {step === 3 && (
              <span className="header-title-text">
                Search for{' '}
                <strong className="highlight-val">
                  {selectedWidth}/{selectedProfile === 'None' ? '' : selectedProfile}
                  {selectedRim ? ` ${selectedRim}` : ''}
                </strong>{' '}
                <FiEdit2 className="edit-pencil-icon" onClick={() => setStep(1)} title="Click to edit" />
              </span>
            )}
          </div>

          {/* Close button */}
          <button type="button" className="header-close-btn" onClick={onClose} title="Close">
            <FiX size={20} />
          </button>

          {/* Top Yellow Progress Bar */}
          <div
            className="header-progress-line"
            style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : selectedRim ? '100%' : '85%' }}
          />
        </div>

        {/* ── 2. Modal Body ── */}
        <div className="size-modal-body">
          {/* Top step counter */}
          <div className="step-counter-row">
            <span className="step-counter-text">Step {step}/4</span>
          </div>

          {/* Tyre Tread & Sidewall Visual */}
          <TyreSidewallIllustration
            step={step}
            width={selectedWidth}
            profile={selectedProfile}
            rim={selectedRim}
          />

          {/* ═════════════════════════════════════════════════════
               STEP 1: SELECT YOUR TYRE WIDTH
             ═════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="step-content-pane">
              <div className="step-title-row">
                <h3 className="step-main-title">Select your tyre width</h3>
                <button
                  type="button"
                  className="btn-size-help"
                  onClick={() => setShowHelpModal(true)}
                >
                  <FiHelpCircle /> Tyre size help
                </button>
              </div>

              <p className="step-subtitle">Popular widths</p>

              <div className="size-boxes-grid">
                {(showAllWidths ? allWidths : popularWidths).map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`size-box-btn ${selectedWidth === w ? 'selected' : ''}`}
                    onClick={() => handleSelectWidth(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>

              <div className="action-row-center">
                <button
                  type="button"
                  className="btn-yellow-show-all"
                  onClick={() => setShowAllWidths(!showAllWidths)}
                >
                  {showAllWidths ? 'Show popular widths' : 'Show all widths'}
                </button>
              </div>

              <div className="rego-switch-link-row">
                <span>Not sure? </span>
                <button
                  type="button"
                  className="link-btn-rego"
                  onClick={() => {
                    onClose();
                    if (onSwitchToRego) onSwitchToRego();
                  }}
                >
                  Search by rego
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════
               STEP 2: SELECT YOUR TYRE PROFILE
             ═════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="step-content-pane">
              <div className="step-title-row">
                <h3 className="step-main-title">Select your tyre profile</h3>
                <button
                  type="button"
                  className="btn-size-help"
                  onClick={() => setShowHelpModal(true)}
                >
                  <FiHelpCircle /> Tyre size help
                </button>
              </div>

              <p className="step-subtitle">Popular Profiles</p>

              <div className="size-boxes-grid profile-grid">
                {(showAllProfiles ? allProfiles : popularProfiles).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`size-box-btn ${selectedProfile === p ? 'selected' : ''}`}
                    onClick={() => handleSelectProfile(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="action-row-center">
                <button
                  type="button"
                  className="btn-yellow-show-all"
                  onClick={() => setShowAllProfiles(!showAllProfiles)}
                >
                  {showAllProfiles ? 'Show popular profiles' : 'Show all profiles'}
                </button>
              </div>

              <div className="rego-switch-link-row">
                <span>Not sure? </span>
                <button
                  type="button"
                  className="link-btn-rego"
                  onClick={() => {
                    onClose();
                    if (onSwitchToRego) onSwitchToRego();
                  }}
                >
                  Search by rego
                </button>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════
               STEP 3: SELECT YOUR TYRE RIM SIZE (+ REFINE IN SCREENSHOT 5)
             ═════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="step-content-pane">
              <div className="step-title-row">
                <h3 className="step-main-title">Select your tyre rim size</h3>
                <button
                  type="button"
                  className="btn-size-help"
                  onClick={() => setShowHelpModal(true)}
                >
                  <FiHelpCircle /> Tyre size help
                </button>
              </div>

              <div className="size-boxes-grid rim-grid">
                {rimSizes.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`size-box-btn ${selectedRim === r ? 'selected' : ''}`}
                    onClick={() => handleSelectRim(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* ── Refine Section (Appears when Rim is selected, exactly as in Screenshot 5) ── */}
              {selectedRim && (
                <div className="refine-ratings-box fade-in-up">
                  <h4 className="refine-heading">Refine your search with Speed and Load ratings (recommended)</h4>
                  <div className="refine-fields-row">
                    <div className="refine-field">
                      <select
                        value={loadIndex}
                        onChange={(e) => setLoadIndex(e.target.value)}
                        className="refine-select"
                      >
                        <option value="Any">Load index</option>
                        {loadIndexes.filter(x => x !== 'Any').map(idx => (
                          <option key={idx} value={idx}>{idx}</option>
                        ))}
                      </select>
                    </div>

                    <div className="refine-field">
                      <select
                        value={speedRating}
                        onChange={(e) => setSpeedRating(e.target.value)}
                        className="refine-select"
                      >
                        <option value="Any">Speed rating</option>
                        {speedRatings.filter(x => x !== 'Any').map(sr => (
                          <option key={sr} value={sr}>{sr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-yellow-continue"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              )}

              <div className="rego-switch-link-row">
                <span>Not sure? </span>
                <button
                  type="button"
                  className="link-btn-rego"
                  onClick={() => {
                    onClose();
                    if (onSwitchToRego) onSwitchToRego();
                  }}
                >
                  Search by rego
                </button>
              </div>
            </div>
          )}

          {/* Bottom Chat / Help Footer Strip */}
          <div className="size-modal-footer">
            <span className="chat-help-pill">
              <span className="smile-emoji">😊</span> Need help? We're here.{' '}
              <a href="#chat" onClick={(e) => { e.preventDefault(); alert("Live Chat is open! Our Australian tyre experts are ready to assist."); }}>
                Chat to us today
              </a>
            </span>
          </div>
        </div>

        {/* ── Help Tooltip Modal / Overlay ── */}
        {showHelpModal && (
          <div className="help-inner-modal" onClick={() => setShowHelpModal(false)}>
            <div className="help-inner-card" onClick={(e) => e.stopPropagation()}>
              <div className="help-card-header">
                <h4><FiInfo /> How to Read Your Tyre Size</h4>
                <button type="button" onClick={() => setShowHelpModal(false)} className="help-close-btn">
                  <FiX />
                </button>
              </div>
              <div className="help-card-body">
                <p>You can find your tyre size written directly on the outer sidewall of your current tyres (e.g. <strong>205/55 R16 91V</strong>):</p>
                <ul>
                  <li><strong>Width (205):</strong> Width of the tyre in millimetres from sidewall to sidewall.</li>
                  <li><strong>Profile / Aspect Ratio (55):</strong> Height of the sidewall as a percentage of the width.</li>
                  <li><strong>Rim (R16):</strong> Diameter of the wheel rim in inches.</li>
                  <li><strong>91V:</strong> Load index and speed rating suitable for your car.</li>
                </ul>
                <button type="button" className="btn-yellow-gotit" onClick={() => setShowHelpModal(false)}>
                  Got It!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TyreSizeModal;
