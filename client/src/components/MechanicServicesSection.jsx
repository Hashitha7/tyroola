import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './MechanicServicesSection.css';

const services = [
  {
    id: 'car-services',
    title: 'Car Services',
    subtitle: 'Choose from logbook or basic maintenance services',
    badge: 'Logbook & Basic',
    img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&q=80',
    icon: '🔧',
    color: '#ffc700',
    features: ['Logbook Servicing', 'Oil & Filter Change', 'Engine Diagnostics'],
  },
  {
    id: 'auto-repairs',
    title: 'Auto Repairs',
    subtitle: 'Get your car back on the road today!',
    badge: 'Fast Turnaround',
    img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80',
    icon: '⚡',
    color: '#00d4ff',
    features: ['Brakes & Suspension', 'Clutch & Gearbox', 'Battery & Electrical'],
  },
  {
    id: 'vehicle-inspections',
    title: 'Vehicle Inspections',
    subtitle: 'Get your car professionally inspected!',
    badge: 'Certified Check',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    icon: '📋',
    color: '#00e676',
    features: ['Pre-Purchase Check', 'Roadworthy Certificate', 'Safety Audit'],
  },
];

const MechanicServicesSection = () => {
  return (
    <section className="section mechanic-section">
      <div className="mechanic-bg-lights" />

      <div className="container">
        <div className="mechanic-header">
          <h2 className="section-title">Give your car some love!</h2>
          <p className="section-subtitle">Get a quote from an expert mechanic today!</p>
        </div>

        <div className="mechanic-grid">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className="mechanic-card card-3d"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Image Preview with 3D Glass Layer */}
              <div className="mechanic-img-wrap">
                <img src={svc.img} alt={svc.title} className="mechanic-img" />
                <div className="mechanic-img-overlay" />
                <span className="mechanic-badge" style={{ borderColor: svc.color }}>
                  {svc.badge}
                </span>
                <div className="mechanic-icon-bubble">{svc.icon}</div>
              </div>

              {/* Card Body */}
              <div className="mechanic-body">
                <h3 className="mechanic-title">{svc.title}</h3>
                <p className="mechanic-desc">{svc.subtitle}</p>

                {/* Features Mini-list */}
                <ul className="mechanic-features">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="mechanic-feat-item">
                      <span className="feat-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn btn-outline mechanic-cta">
                  <span>Get Quote</span>
                  <FiArrowRight />
                </Link>
              </div>

              {/* 3D Bottom Edge Glow */}
              <div
                className="mechanic-card-glow"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MechanicServicesSection;

