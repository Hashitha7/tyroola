import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import b4Bg from '../Images/Background/B4.jpg';
import './TyreTipsBanner.css';

const guideTopics = [
  { label: 'Tyre Pressure', icon: '💨' },
  { label: 'Tread Depth', icon: '📏' },
  { label: 'Wheel Alignment', icon: '📐' },
  { label: 'Tyre Rotation', icon: '🔄' },
];

const TyreTipsBanner = () => {
  return (
    <section
      className="tips-banner-section"
      style={{ backgroundImage: `url(${b4Bg})` }}
    >
      <div className="tips-banner-overlay" />

      <div className="container tips-banner-container">
        {/* Left space preserves visibility of tyre stack in B4.jpg background */}
        <div className="tips-banner-spacer" />

        {/* Center Content */}
        <div className="tips-banner-content">
          <h2 className="tips-banner-title">TYROOLA TYRE TIPS</h2>
          <p className="tips-banner-desc">
            Learn all about tyres, including how to replace, choose and maintain the perfect set with our helpful guides.
          </p>

          <Link to="/how-it-works" className="btn btn-primary tips-banner-btn">
            Take me to the tyre tips! <FiArrowRight />
          </Link>
        </div>

        {/* Right Workshop Signboard */}
        <div className="tips-banner-signboard glass">
          <div className="signboard-header">
            <span className="signboard-icon">🛠️</span>
            <span className="signboard-title">TYRE TIPS</span>
          </div>
          <ul className="signboard-list">
            {guideTopics.map((topic, i) => (
              <li key={i} className="signboard-item">
                <span className="signboard-item-icon">{topic.icon}</span>
                <span className="signboard-item-text">{topic.label}</span>
                <FiCheck className="signboard-check" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TyreTipsBanner;
