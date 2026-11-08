import { useState } from 'react';
import { FiPlay, FiClock } from 'react-icons/fi';
import './VideoSection.css';

const videos = [
  {
    id: 1,
    title: 'Online Tyre Shopping Made Easy With Tyroola!',
    duration: '1:25',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    tint: 'rgba(255,215,0,0.15)',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Join the online revolution as seen on TV. Buy Tyres Online',
    duration: '0:30',
    thumbnail: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=500&q=80',
    tint: 'rgba(255,100,0,0.2)',
    youtubeId: 'dQw4w9WgXcQ',
    badge: '500+ installers',
  },
  {
    id: 3,
    title: 'Autoexpert John Cadogan Reveals How To Save Money And Time Buying Tyres At Tyroola.',
    duration: '1:1',
    thumbnail: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&q=80',
    tint: 'rgba(100,0,200,0.15)',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

const VideoSection = () => {
  const [playing, setPlaying] = useState(null);

  return (
    <section className="section video-section">
      <div className="video-section-bg" />
      <div className="container">
        <div className="video-header">
          <h2 className="section-title">Embrace the Future of Tyre Shopping.</h2>
          <p className="section-subtitle">Be Part of the Online Tyre Revolution!</p>
        </div>

        <div className="videos-grid">
          {videos.map((v, i) => (
            <div
              key={v.id}
              className="video-card card-3d"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Thumbnail */}
              <div
                className="video-thumb"
                onClick={() => setPlaying(playing === v.id ? null : v.id)}
              >
                {playing === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                    className="video-iframe"
                  />
                ) : (
                  <>
                    <img src={v.thumbnail} alt={v.title} className="video-img" />
                    <div className="video-overlay" style={{ background: `linear-gradient(135deg, ${v.tint}, rgba(0,0,0,0.6))` }} />
                    {v.badge && <div className="video-badge">{v.badge}</div>}

                    {/* Play Button */}
                    <div className="play-btn-wrap">
                      <div className="play-btn-outer">
                        <div className="play-btn-inner">
                          <FiPlay size={24} fill="white" color="white" />
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="video-duration">
                      <FiClock size={11} />
                      {v.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="video-info">
                <p className="video-title">{v.title}</p>
                <span className="video-time">
                  <FiClock size={12} /> {v.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

