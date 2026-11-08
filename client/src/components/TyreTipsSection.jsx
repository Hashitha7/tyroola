import { useState } from 'react';
import { FiBookOpen, FiCheckCircle, FiInfo } from 'react-icons/fi';
import SearchBarStrip from './SearchBarStrip';
import './TyreTipsSection.css';

const tipsData = [
  {
    id: 'tread-legal',
    title: 'Is Your Tyre Tread Legal?',
    desc: 'Stay within the legal limits and check your tread depth once a month.',
    badge: '1.5mm Min Legal Limit',
    badgeColor: '#ff4444',
    img: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&q=80',
    detail: 'Australian law requires a minimum tread depth of 1.5mm across the central three-quarters of the tyre.',
    statLabel: 'Legal Minimum',
    statValue: '1.5 mm',
  },
  {
    id: 'puncture-repair',
    title: 'Puncture Repair Guide',
    desc: 'Learn how to repair your tyre in case of an unexpected puncture.',
    badge: 'DIY & Professional',
    badgeColor: '#00d4ff',
    img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80',
    detail: 'Only punctures in the central tread area can be safely repaired with a plug and patch combination.',
    statLabel: 'Repair Area',
    statValue: 'Central 70%',
  },
  {
    id: 'tyre-pressure',
    title: 'Tyre Pressure Guide',
    desc: 'Keep safe on the road with our guide to correct tyre pressure.',
    badge: '32 - 36 PSI',
    badgeColor: '#ffd700',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    detail: 'Proper inflation ensures even tread wear, maximum fuel efficiency, and optimal braking distance.',
    statLabel: 'Recommended',
    statValue: '32-35 PSI',
  },
];

const TyreTipsSection = () => {
  const [activeTip, setActiveTip] = useState(null);

  return (
    <section className="section tyre-tips-section">
      <div className="tyre-tips-bg" />

      {/* Floating Yellow Search Bar Strip as in screenshot */}
      <SearchBarStrip />

      <div className="container">
        <div className="tyre-tips-header">
          <h2 className="section-title">Tyroola Tyre Tips</h2>
          <p className="section-subtitle">
            Essential knowledge to keep you safe, legal, and fuel-efficient on Australian roads.
          </p>
        </div>

        <div className="tyre-tips-grid">
          {tipsData.map((tip, i) => (
            <div
              key={tip.id}
              className="tip-card card-3d"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Image with 3D Overlay */}
              <div className="tip-img-wrap">
                <img src={tip.img} alt={tip.title} className="tip-img" />
                <div className="tip-overlay" />
                <span
                  className="tip-badge"
                  style={{
                    borderColor: tip.badgeColor,
                    color: tip.badgeColor,
                    background: `${tip.badgeColor}18`,
                  }}
                >
                  {tip.badge}
                </span>

                {/* 3D Gauge Box */}
                <div className="tip-stat-bubble">
                  <span className="stat-bubble-label">{tip.statLabel}</span>
                  <span className="stat-bubble-val">{tip.statValue}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="tip-body">
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>

                {/* Quick Info Drawer / Expand */}
                {activeTip === tip.id && (
                  <div className="tip-expanded-info glass">
                    <FiInfo className="tip-info-icon" />
                    <span>{tip.detail}</span>
                  </div>
                )}

                <button
                  type="button"
                  className="tip-action-btn"
                  onClick={() => setActiveTip(activeTip === tip.id ? null : tip.id)}
                >
                  <FiBookOpen size={16} />
                  <span>{activeTip === tip.id ? 'Close Guide' : 'Read Full Guide'}</span>
                  <FiCheckCircle size={14} className="tip-check" />
                </button>
              </div>

              {/* 3D Bottom Neon Accent */}
              <div
                className="tip-card-glow"
                style={{ background: `linear-gradient(90deg, transparent, ${tip.badgeColor}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TyreTipsSection;

