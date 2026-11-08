import './BrandsBanner.css';

const brands = [
  { name: 'Michelin', emoji: '🏆' },
  { name: 'Bridgestone', emoji: '⭐' },
  { name: 'Goodyear', emoji: '🔵' },
  { name: 'Continental', emoji: '🌍' },
  { name: 'Pirelli', emoji: '🔴' },
  { name: 'Dunlop', emoji: '🟡' },
  { name: 'BFGoodrich', emoji: '🟢' },
  { name: 'Yokohama', emoji: '🇯🇵' },
  { name: 'Hankook', emoji: '🏎️' },
  { name: 'Toyo', emoji: '⚡' },
];

const BrandsBanner = () => (
  <div className="brands-section">
    <div className="brands-track-wrapper">
      <div className="brands-track">
        {[...brands, ...brands].map((b, i) => (
          <div key={i} className="brand-pill">
            <span className="brand-emoji">{b.emoji}</span>
            <span className="brand-name">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BrandsBanner;

