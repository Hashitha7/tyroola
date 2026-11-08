import TyreCanvas from '../components/TyreCanvas';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const steps = [
  { num: '01', title: 'Enter your tyre size', desc: 'Find your tyre size on the sidewall of your current tyre — it looks like 265/65R17. Enter each part into our search box. It\'s the easiest and most accurate way to find compatible tyres.', icon: '🔍', rimColor: '#c0a020', tip: 'Tip: The numbers are moulded into the tyre sidewall' },
  { num: '02', title: 'Compare & save', desc: 'Browse hundreds of tyres from Australia\'s top brands. Filter by price, brand, category and rating. Our price match guarantee means you\'ll always get the best deal.', icon: '💰', rimColor: '#00aacc', tip: 'We price match any Australian retailer!' },
  { num: '03', title: 'Fast delivery & fitting', desc: 'Choose home delivery or drop-in fitting at one of 800+ locations Australia-wide. We\'ll deliver your tyres directly to your chosen fitter, or to your door.', icon: '🚚', rimColor: '#6030cc', tip: '800+ fitting locations nationwide' },
];

const HowItWorks = () => (
  <main className="hiw-page">
    <div className="hiw-page-hero">
      <div className="container">
        <h1 className="section-title">How It Works</h1>
        <p className="section-subtitle">Getting new tyres has never been easier. Three simple steps to safer driving.</p>
      </div>
    </div>

    <div className="container section">
      {steps.map((step, i) => (
        <div key={i} className={`hiw-step-row ${i % 2 === 1 ? 'reverse' : ''}`}>
          <div className="hiw-step-visual">
            <div className="hiw-step-canvas glass">
              <TyreCanvas height="350px" rimColor={step.rimColor} rotate={true} showParticles={true} />
            </div>
          </div>
          <div className="hiw-step-content">
            <div className="hiw-step-num">{step.num}</div>
            <div className="hiw-step-icon">{step.icon}</div>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>{step.title}</h2>
            <p className="section-subtitle" style={{ maxWidth: 'none' }}>{step.desc}</p>
            <div className="hiw-tip">
              <span>💡</span>
              <span>{step.tip}</span>
            </div>
            <Link to="/tyres" className="btn btn-primary">
              Get Started <FiArrowRight />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </main>
);

export default HowItWorks;

