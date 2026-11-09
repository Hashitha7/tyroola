import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiX, FiHelpCircle, FiEdit2, FiInfo } from 'react-icons/fi';
import './TyreSizeModal.css';

// Pre-defined values matching Tyroola reference
const popularWidths = ['185', '195', '205', '215', '225', '235', '245', '265'];
const allWidths = ['155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275', '285'];

const popularProfiles = ['None', '35', '40', '45', '50', '55', '60', '65'];
const allProfiles = ['None', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80'];

const popularRims = ['R13', 'R14', 'R15', 'R16', 'R17', 'R17.5', 'R18', 'R19'];
const allRims = ['R13', 'R14', 'R15', 'R16', 'R17', 'R17.5', 'R18', 'R19', 'R20', 'R21', 'R22'];

const loadIndexes = ['Any', '82', '85', '88', '91', '94', '95', '98', '100', '102'];
const speedRatings = ['Any', 'H (210 km/h)', 'V (240 km/h)', 'W (270 km/h)', 'Y (300 km/h)'];

/**
 * Compact 3D Tyre Top Arc with Sidewall Markings & Checkmark Badges
 */
const TyreSidewallIllustration = ({ step, width, profile, rim }) => {
  const displayWidth = width || '205';
  const displayProfile = profile === 'None' ? '' : (profile ? ` / ${profile}` : ' / 60');
  const displayRim = rim ? ` ${rim}` : ' R16';

  return (
    <div className="tyre-arc-visual-wrapper">
      <svg viewBox="0 0 520 145" className="tyre-arc-svg">
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
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" flood-color="#10b981" flood-opacity="0.5" />
          </filter>
        </defs>

        {/* ── Outer Tyre Tread Arc ── */}
        <path
          d="M 65 140 A 195 110 0 0 1 455 140"
          fill="none"
          stroke="url(#tyre-rubber)"
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Tread Grooves (sipes) */}
        <path
          d="M 68 140 A 191 106 0 0 1 452 140"
          fill="none"
          stroke="#0f1117"
          strokeWidth="3.5"
          strokeDasharray="8 6"
        />
        <path
          d="M 75 140 A 184 99 0 0 1 445 140"
          fill="none"
          stroke="#334155"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* ── Sidewall Layer ── */}
        <path
          d="M 98 140 A 162 82 0 0 1 422 140"
          fill="none"
          stroke="#11151c"
          strokeWidth="24"
        />

        {/* Inner Wheel Rim Lip ── */}
        <path
          d="M 118 140 A 142 66 0 0 1 402 140"
          fill="none"
          stroke="url(#rim-alloy)"
          strokeWidth="10"
        />
        <path
          d="M 126 140 A 134 58 0 0 1 394 140"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.2"
          opacity="0.6"
        />

        {/* Wheel Spokes Arches */}
        <path d="M 215 140 L 215 95 A 45 45 0 0 1 305 95 L 305 140" fill="none" stroke="#0f172a" strokeWidth="8" />
        <path d="M 160 140 L 180 110" stroke="#1e293b" strokeWidth="6" />
        <path d="M 360 140 L 340 110" stroke="#1e293b" strokeWidth="6" />

        {/* ── Sidewall Text Details ── */}
        {/* Width Group */}
        <g transform="translate(182, 68)">
          {/* Green Checkmark Badge if Step > 1 */}
          {step > 1 && (
            <g transform="translate(0, -18)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="7.5" fill="#10b981" />
              <path d="M -3 -0.5 L -1 1.8 L 3.5 -2.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 1 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {displayWidth}
          </text>
        </g>

        {/* Separator / */}
        <text x="212" y="68" textAnchor="middle" fontSize="16" fontWeight="800" fill="#94a3b8">/</text>

        {/* Profile Group */}
        <g transform="translate(242, 68)">
          {/* Green Checkmark Badge if Step > 2 */}
          {step > 2 && (
            <g transform="translate(0, -18)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="7.5" fill="#10b981" />
              <path d="M -3 -0.5 L -1 1.8 L 3.5 -2.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 2 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {profile === 'None' ? '—' : (profile || '60')}
          </text>
        </g>

        {/* Rim Size Group */}
        <g transform="translate(294, 68)">
          {/* Green Checkmark Badge if Step === 3 and rim selected */}
          {rim && (
            <g transform="translate(0, -18)" filter="url(#badge-glow)">
              <circle cx="0" cy="0" r="7.5" fill="#10b981" />
              <path d="M -3 -0.5 L -1 1.8 L 3.5 -2.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontSize="16"
            fontWeight="900"
            fontFamily="'Inter', sans-serif"
            fill={step === 3 ? '#ffc700' : '#ffffff'}
            letterSpacing="0.5"
          >
            {displayRim.trim()}
          </text>
        </g>

        {/* Extra Sidewall Markings (91V OE) */}
        <text x="350" y="76" textAnchor="middle" fontSize="12" fontWeight="700" fill="#cbd5e1" opacity="0.8">
          91V
        </text>
        <text x="384" y="86" textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8" opacity="0.6">
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
  const [showAllRims, setShowAllRims] = useState(false);
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
                <FiChevronLeft size={20} />
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
            <FiX size={18} />
          </button>

          {/* Top Yellow Progress Bar */}
          <div
            className="header-progress-line"
            style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : selectedRim ? '100%' : '85%' }}
          />
        </div>

        {/* ── 2. Modal Body (Compact & Fitted, No Scrollbar) ── */}
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

              {/* Rims Grid - 2 Neat Rows of 4 */}
              <div className="size-boxes-grid rim-grid">
                {(showAllRims ? allRims : popularRims).map((r) => (
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
