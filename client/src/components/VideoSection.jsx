import { useState } from 'react';
import { FiPlay, FiClock, FiX } from 'react-icons/fi';
import './VideoSection.css';

const videos = [
  {
    id: 1,
    title: 'Online Tyre Shopping Made Easy With Tyroola!',
    duration: '1:25',
    thumbnail: 'https://i.ytimg.com/vi/ZL7CtXkQdp8/hqdefault.jpg',
    tint: 'rgba(255,215,0,0.15)',
    youtubeId: 'ZL7CtXkQdp8',
  },
  {
    id: 2,
    title: 'Join the online revolution as seen on TV. Buy Tyres Online',
    duration: '0:30',
    thumbnail: 'https://i.ytimg.com/vi/Uy5A6Tp5oVw/hqdefault.jpg',
    tint: 'rgba(255,100,0,0.2)',
    youtubeId: 'Uy5A6Tp5oVw',
    badge: '500+ installers',
  },
  {
    id: 3,
    title: 'Autoexpert John Cadogan Reveals How To Save Money And Time Buying Tyres At Tyroola.',
    duration: '1:1',
    thumbnail: 'https://i.ytimg.com/vi/nFwm8gCAtF0/hqdefault.jpg',
    tint: 'rgba(100,0,200,0.15)',
    youtubeId: 'nFwm8gCAtF0',
  },
];

const VideoSection = () => {
  const [lightbox, setLightbox] = useState(null); // stores the video object being played

  const openVideo = (v) => setLightbox(v);
  const closeVideo = () => setLightbox(null);

  return (
    <>
      {/* ===== LIGHTBOX MODAL ===== */}
      {lightbox && (
        <div className="video-lightbox" onClick={closeVideo}>
          <div className="video-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="video-lightbox-close" onClick={closeVideo} aria-label="Close">
              <FiX size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${lightbox.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={lightbox.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-lightbox-iframe"
            />
          </div>
        </div>
      )}

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
                onClick={() => openVideo(v)}
              >
                {/* Thumbnail */}
                <div className="video-thumb">
                  <img src={v.thumbnail} alt={v.title} className="video-img" />
                  <div className="video-overlay" style={{ background: `linear-gradient(135deg, ${v.tint}, rgba(0,0,0,0.6))` }} />
                  {v.badge && <div className="video-badge">{v.badge}</div>}

                  {/* YouTube-style Play Button */}
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
    </>
  );
};

export default VideoSection;

