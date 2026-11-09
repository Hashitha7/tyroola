import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Step3DIconCanvas from './Step3DIconCanvas';
import TyreSizeModal from './TyreSizeModal';
import RegoSearchModal from './RegoSearchModal';
import './HowItWorksSection.css';

const steps = [
  {
    num: '01',
    iconType: 'tyre',
    title: 'Enter your tyre size',
    desc: 'Find it on the sidewall of your current tyre e.g. 265/65R17.',
    color: '#FFD700',
    action: 'tyre-size',   // opens TyreSizeModal
  },
  {
    num: '02',
    iconType: 'wallet',
    title: 'Compare & save',
    desc: 'Compare tyres, choose from many brands, and pick the best deal for you.',
    color: '#00d4ff',
    action: 'tyres',       // navigate to /tyres
  },
  {
    num: '03',
    iconType: 'delivery',
    title: 'Fast delivery & fitting',
    desc: 'We promise smooth delivery to one of our fitting partners or to your home.',
    color: '#7c3aed',
    action: 'tyres',       // navigate to /tyres
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'size' | 'rego' | null

  const handleStepClick = (action) => {
    if (action === 'tyre-size') {
      setActiveModal('size');
    } else if (action === 'tyres') {
      navigate('/tyres');
    }
  };

  return (
    <>
      <section className="section hiw-section">
        <div className="hiw-bg">
          <div className="hiw-bg-shape" />
        </div>
        <div className="container">
          <div className="hiw-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              It's easy as 1, 2, 3. Just enter your size, choose, &amp; get it delivered.
            </p>
          </div>

          <div className="hiw-steps">
            {steps.map((step, i) => (
              <div
                key={i}
                className="hiw-step card-3d hiw-step-clickable"
                style={{ animationDelay: `${i * 0.15}s` }}
                onClick={() => handleStepClick(step.action)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleStepClick(step.action)}
              >
                {/* Step Number background */}
                <div className="step-num" style={{ color: step.color }}>{step.num}</div>

                {/* Accent glow overlay */}
                <div className="step-glow" style={{ background: `radial-gradient(circle at 50% 40%, ${step.color}20, transparent 72%)` }} />

                {/* 3D Icon Canvas */}
                <div className="step-canvas">
                  <Step3DIconCanvas type={step.iconType} color={step.color} height="190px" />
                </div>

                {/* Top neon accent line */}
                <div className="step-accent-line" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

                <h3 className="step-title" style={{ color: step.color }}>{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                {/* Click hint */}
                <div className="step-click-hint" style={{ color: step.color }}>
                  Get started <FiArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>

          {/* Connector arrows between cards */}
          <div className="hiw-connectors">
            <FiArrowRight size={24} style={{ color: 'rgba(255,215,0,0.4)' }} />
            <FiArrowRight size={24} style={{ color: 'rgba(255,215,0,0.4)' }} />
          </div>
        </div>
      </section>

      {/* Modals */}
      <TyreSizeModal
        isOpen={activeModal === 'size'}
        onClose={() => setActiveModal(null)}
        onSwitchToRego={() => setActiveModal('rego')}
      />
      <RegoSearchModal
        isOpen={activeModal === 'rego'}
        onClose={() => setActiveModal(null)}
        onSwitchToTyreSize={() => setActiveModal('size')}
      />
    </>
  );
};

export default HowItWorksSection;
