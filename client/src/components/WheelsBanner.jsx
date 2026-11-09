import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import b2Bg from '../Images/Background/B2.jpg';
import './WheelsBanner.css';

const WheelsBanner = () => {
  return (
    <section
      className="wheels-banner-section"
      style={{ backgroundImage: `url(${b2Bg})` }}
    >
      <div className="wheels-banner-overlay" />

      <div className="container wheels-banner-container">
        <div className="wheels-content">
          <h2 className="wheels-title">Rims, Mags &amp; Wheels Online</h2>
          <p className="wheels-subtitle">Get the best wheels for your car in just a few clicks.</p>
          <Link to="/tyres" className="btn btn-primary wheels-cta-btn">
            Shop Wheels Now <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WheelsBanner;
