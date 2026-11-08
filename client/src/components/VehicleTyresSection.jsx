import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SearchBarStrip from './SearchBarStrip';
import './VehicleTyresSection.css';

const vehicleCategories = [
  {
    id: 'passenger-car',
    title: 'Passenger Car',
    desc: 'Find the tyre for your needs, be it commuting to work or for the occasional road trip.',
    category: 'Sedan',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <path d="M12 40 L16 28 C17 24 21 22 25 22 L39 22 C43 22 47 24 48 28 L52 40 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M8 40 L56 40 C58 40 60 42 60 45 L60 48 C60 50 58 52 56 52 L52 52 C52 48 48 44 44 44 C40 44 36 48 36 52 L28 52 C28 48 24 44 20 44 C16 44 12 48 12 52 L8 52 C6 52 4 50 4 48 L4 45 C4 42 6 40 8 40 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="20" cy="52" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="44" cy="52" r="5" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="20" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'run-flat',
    title: 'Run Flat',
    desc: 'Continue to drive even after a puncture.',
    category: 'RunFlat',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="32" r="5" fill="currentColor" />
        <line x1="32" y1="8" x2="32" y2="18" stroke="currentColor" strokeWidth="3" />
        <line x1="32" y1="46" x2="32" y2="56" stroke="currentColor" strokeWidth="3" />
        <line x1="8" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="3" />
        <line x1="46" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="3" />
        <line x1="15" y1="15" x2="22" y2="22" stroke="currentColor" strokeWidth="3" />
        <line x1="42" y1="42" x2="49" y2="49" stroke="currentColor" strokeWidth="3" />
        <line x1="49" y1="15" x2="42" y2="22" stroke="currentColor" strokeWidth="3" />
        <line x1="22" y1="42" x2="15" y2="49" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: '4x4',
    title: '4x4',
    desc: 'Get the best 4x4 action! Make driving on highways, dirt & mud a fun & safe experience.',
    category: '4WD',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <path d="M10 38 L14 26 C15 22 18 20 22 20 L40 20 L48 28 L56 38 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="6" y="38" width="52" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="18" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="46" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M18 16 L38 16" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'all-terrain',
    title: 'All Terrain Tyres',
    desc: 'Handle all kinds of driving terrains in confidence in your SUV, 4x4 or ute.',
    category: 'SUV',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <path d="M12 36 L16 26 L42 26 L48 34 L54 36 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="8" y="36" width="48" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="18" cy="46" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="44" cy="46" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M4 56 Q12 50 20 56 Q28 62 36 56 Q44 50 52 56 Q58 60 62 56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'mud-terrain',
    title: 'Mud Terrain',
    desc: 'Enjoy the toughest mud trails on your next outdoor adventure.',
    category: '4WD',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <path d="M14 34 L18 24 L44 24 L50 32 L54 34 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="10" y="34" width="46" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="20" cy="44" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="46" cy="44" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M6 54 L14 48 L22 55 L32 47 L42 55 L52 48 L58 54" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="bevel" />
      </svg>
    ),
  },
  {
    id: 'highway-terrain',
    title: 'Highway Terrain',
    desc: 'Quiet, durable and practical tyres for reliable on-road use.',
    category: 'SUV',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <path d="M10 36 L15 25 L41 25 L47 33 L54 36 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="6" y="36" width="52" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="17" cy="47" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="45" cy="47" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="8" y1="56" x2="56" y2="56" stroke="currentColor" strokeWidth="3" />
        <line x1="18" y1="56" x2="26" y2="56" stroke="#ffd700" strokeWidth="3" />
        <line x1="36" y1="56" x2="44" y2="56" stroke="#ffd700" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'light-truck',
    title: 'Light truck',
    desc: 'Strong tyres for light trucks, caravans & tradies, specialised to carry heavier loads.',
    category: 'Truck',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <rect x="8" y="24" width="28" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M36 30 L48 30 L54 38 L54 42 L36 42 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="6" y="42" width="50" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="18" cy="48" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="44" cy="48" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'truck',
    title: 'Truck',
    desc: 'Drive long distances and transport heavy freight throughout Australia safely with our large range of truck radials.',
    category: 'Truck',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <rect x="6" y="18" width="34" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M40 26 L52 26 L58 36 L58 44 L40 44 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="6" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="3" />
        <circle cx="16" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="28" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="48" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'motorcycle',
    title: 'Motorcycle',
    desc: "We've got your motorbikes, cruiser, quad & scooters covered for on & off-road & track drives.",
    category: 'Sports',
    icon: (
      <svg viewBox="0 0 64 64" className="vehicle-svg">
        <circle cx="16" cy="44" r="9" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="48" cy="44" r="9" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M16 44 L26 28 L38 28 L48 44" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M26 28 L38 44" stroke="currentColor" strokeWidth="3" />
        <path d="M38 28 L42 20 L48 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 28 C22 24 28 24 32 24" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
];

const VehicleTyresSection = () => {
  return (
    <section className="section vehicle-section">
      <div className="vehicle-bg-glow" />

      {/* Floating Yellow Search Bar Strip as in screenshot */}
      <SearchBarStrip />

      <div className="container">
        <div className="vehicle-header">
          <h2 className="section-title">Tyres for your vehicle</h2>
          <p className="section-subtitle">
            Whether you are driving a car, 4x4, motorcycle & light truck, we have the perfect tyre for your needs.
          </p>
        </div>

        <div className="vehicle-grid">
          {vehicleCategories.map((v, i) => (
            <Link
              key={v.id}
              to={`/tyres?category=${v.category}`}
              className="vehicle-card card-3d"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* 3D Icon Box */}
              <div className="vehicle-icon-wrap">
                <div className="vehicle-icon-glow" />
                <div className="vehicle-icon-box">
                  {v.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="vehicle-card-title">{v.title}</h3>
              <p className="vehicle-card-desc">{v.desc}</p>

              {/* Hover Explore Indicator */}
              <div className="vehicle-card-action">
                <span>Browse {v.title}</span>
                <FiArrowRight className="vehicle-arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleTyresSection;

