import { FiArrowRight } from 'react-icons/fi';
import TyreCanvas from './TyreCanvas';
import './HowItWorksSection.css';

const steps = [
  {
    num: '01',
    icon: '⚙️',
    title: 'Enter your tyre size',
    desc: 'Find it on the sidewall of your current tyre e.g. 265/65R17.',
    color: '#FFD700',
    canvas: true,
    rimColor: '#c0a020',
  },
  {
    num: '02',
    icon: '💰',
    title: 'Compare & save',
    desc: 'Compare tyres, choose from many brands, and pick the best deal for you.',
    color: '#00d4ff',
    canvas: true,
    rimColor: '#00aacc',
  },
  {
    num: '03',
    icon: '🚚',
    title: 'Fast delivery & fitting',
    desc: 'We promise smooth delivery to one of our fitting partners or to your home.',
    color: '#7c3aed',
    canvas: true,
    rimColor: '#6030cc',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section hiw-section">
      <div className="hiw-bg">
        <div className="hiw-bg-shape" />
      </div>
      <div className="container">
        <div className="hiw-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            It's easy as 1, 2, 3. Just enter your size, choose, & get it delivered.
          </p>
        </div>

        {/* Arrow connector */}
        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div key={i} className="hiw-step card-3d">
              {/* Step Number */}
              <div className="step-num" style={{ color: step.color }}>
                {step.num}
              </div>

              {/* 3D Tyre mini */}
              <div className="step-canvas">
                <TyreCanvas height="180px" rimColor={step.rimColor} rotate={true} showParticles={false} />
              </div>

              {/* Glow circle */}
              <div className="step-glow" style={{ background: `radial-gradient(circle at center, ${step.color}22, transparent 70%)` }} />

              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title" style={{ color: step.color }}>
                {step.title}
              </h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Connector arrows */}
        <div className="hiw-connectors">
          <FiArrowRight size={24} style={{ color: 'rgba(255,215,0,0.4)' }} />
          <FiArrowRight size={24} style={{ color: 'rgba(255,215,0,0.4)' }} />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

