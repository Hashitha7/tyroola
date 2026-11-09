import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import p1 from '../Images/Partner/p1.jpg';
import p2 from '../Images/Partner/p2.jpg';
import p3 from '../Images/Partner/p3.jpg';
import './PartnerSection.css';

const partnerCards = [
  {
    id: 'customers',
    title: 'Gain New Customers',
    desc: 'We make it easy for customers to find you!',
    img: p1,
    icon: <FiUsers />,
    badge: 'More Bookings',
    color: '#00d4ff',
    stat: '10,000+ monthly drivers',
  },
  {
    id: 'grow',
    title: 'Grow Your Business',
    desc: 'Enjoy new business opportunities as a Tyroola Approved Partner Mechanic or Tyre Fitter!',
    img: p2,
    icon: <FiTrendingUp />,
    badge: 'Extra Revenue',
    color: '#ffd700',
    stat: 'No upfront capital',
  },
  {
    id: 'free',
    title: 'Sign Up Is Free!',
    desc: 'All licensed fitting stations, repair workshops & service centres with qualified mechanics are welcome to join!',
    img: p3,
    icon: <FiCheckCircle />,
    badge: '100% Free',
    color: '#00e676',
    stat: 'Fast 24hr onboarding',
  },
];

const PartnerSection = () => {
  return (
    <section className="section partner-section">
      <div className="partner-bg-glow" />

      <div className="container">
        <div className="partner-header">
          <h2 className="section-title">Become an auto service or tyre fitting partner!</h2>
          <p className="section-subtitle">
            Join Our Network Of Expert Mechanics & Tyre Fitters!
          </p>
        </div>

        <div className="partner-grid">
          {partnerCards.map((card, i) => (
            <div
              key={card.id}
              className="partner-card card-3d"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Image Preview with 3D Corner Border */}
              <div className="partner-img-wrap">
                <img src={card.img} alt={card.title} className="partner-img" />
                <div className="partner-overlay" />
                <div
                  className="partner-badge"
                  style={{ color: card.color, borderColor: `${card.color}66` }}
                >
                  <span className="partner-badge-dot" style={{ background: card.color }} />
                  {card.badge}
                </div>
                <div className="partner-icon-tag" style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="partner-body">
                <h3 className="partner-title">{card.title}</h3>
                <p className="partner-desc">{card.desc}</p>
                <div className="partner-stat-pill">
                  <span>⚡</span> {card.stat}
                </div>

                <Link to="/contact" className="btn btn-outline partner-btn">
                  <span>Join Partner Network</span>
                  <FiArrowRight />
                </Link>
              </div>

              {/* 3D Bottom Edge Glow */}
              <div
                className="partner-card-glow"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
