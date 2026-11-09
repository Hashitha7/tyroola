import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import b3Bg from '../Images/Background/B3.jpg';
import './GetTyresNowBanner.css';

const GetTyresNowBanner = () => {
  return (
    <section
      className="get-tyres-banner"
      style={{ backgroundImage: `url(${b3Bg})` }}
    >
      <div className="warehouse-overlay" />

      <div className="container get-tyres-container">
        <div className="get-tyres-content">
          <h2 className="get-tyres-title">Get tyres now</h2>
          <p className="get-tyres-subtitle">
            Start by entering your tyres size. Compare tyres and read reviews. Get fast delivery and fitting.
          </p>
          <Link to="/tyres" className="btn btn-primary get-tyres-btn">
            Find tyres <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetTyresNowBanner;
