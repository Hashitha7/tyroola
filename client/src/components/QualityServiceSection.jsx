import './QualityServiceSection.css';

const qualityFeatures = [
  {
    id: 'best-prices',
    title: 'The Best Prices',
    desc: 'With our Price Match Guarantee',
    badge: 'Price Match',
    color: '#ffc700',
    icon: (
      <svg viewBox="0 0 64 64" className="quality-svg">
        {/* Left tag */}
        <path d="M12 28 L24 16 L36 16 L36 40 L24 52 L12 40 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="28" cy="24" r="3" fill="currentColor" />
        <text x="21" y="38" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle" fontFamily="sans-serif">$</text>
        {/* Equal sign */}
        <line x1="33" y1="31" x2="39" y2="31" stroke="#ffc700" strokeWidth="3" />
        <line x1="33" y1="37" x2="39" y2="37" stroke="#ffc700" strokeWidth="3" />
        {/* Right tag */}
        <path d="M36 28 L48 16 L56 16 L56 40 L44 52 L36 44 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="48" cy="24" r="3" fill="currentColor" />
        <text x="45" y="38" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle" fontFamily="sans-serif">$</text>
      </svg>
    ),
  },
  {
    id: 'safety',
    title: 'Safety',
    desc: 'With our Tyre Protect Plan',
    badge: '100% Covered',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" className="quality-svg">
        <path d="M32 10 L50 18 L50 36 C50 48 32 56 32 56 C32 56 14 48 14 36 L14 18 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="33" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="33" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* Shield checkmark */}
        <circle cx="42" cy="42" r="7" fill="#00e676" />
        <path d="M39 42 L41 44 L45 40" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'convenience',
    title: 'Convenience',
    desc: 'With Fitting Services near you',
    badge: '800+ Locations',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" className="quality-svg">
        {/* Tyre */}
        <circle cx="30" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="30" cy="32" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="30" cy="32" r="4" fill="currentColor" />
        {/* Spoke details */}
        <line x1="30" y1="12" x2="30" y2="21" stroke="currentColor" strokeWidth="2.5" />
        <line x1="30" y1="43" x2="30" y2="52" stroke="currentColor" strokeWidth="2.5" />
        <line x1="10" y1="32" x2="19" y2="32" stroke="currentColor" strokeWidth="2.5" />
        {/* Location / Check badge */}
        <circle cx="45" cy="45" r="9" fill="#ffc700" />
        <path d="M42 45 L44 47 L48 43" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const QualityServiceSection = () => {
  return (
    <section className="section quality-section">
      <div className="container">
        <div className="quality-header">
          <h2 className="section-title">Highest-Quality Service</h2>
          <p className="section-subtitle">Tyroola gives you:</p>
        </div>

        <div className="quality-grid">
          {qualityFeatures.map((item, i) => (
            <div
              key={item.id}
              className="quality-card card-3d"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* 3D Floating Icon Box */}
              <div className="quality-icon-wrap">
                <div
                  className="quality-icon-glow"
                  style={{ background: `radial-gradient(circle, ${item.color}33 0%, transparent 70%)` }}
                />
                <div className="quality-icon-box" style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="quality-badge" style={{ color: item.color, borderColor: `${item.color}44` }}>
                {item.badge}
              </div>
              <h3 className="quality-title">{item.title}</h3>
              <p className="quality-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityServiceSection;

