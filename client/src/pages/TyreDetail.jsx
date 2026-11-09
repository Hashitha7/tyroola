import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar, FiCheck, FiTruck, FiShield } from 'react-icons/fi';
import TyreCanvas from '../components/TyreCanvas';
import axios from 'axios';
import './TyreDetail.css';

const mockTyres = {
  '1': { _id: '1', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16', price: 142, originalPrice: 165, category: 'Sedan', rating: 4.6, reviews: 312, isFeatured: true, badge: 'Eco Friendly', description: 'Superior comfort and fuel efficiency for everyday passenger vehicles with quiet road tread pattern and long lasting life.', features: ['Quiet ride & low vibration', 'Superior fuel economy', 'Enhanced wet braking performance', 'Long lasting tread compound', 'Everyday reliability'] },
  '2': { _id: '2', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17', price: 189, originalPrice: 220, category: 'SUV', rating: 4.8, reviews: 234, isFeatured: true, badge: 'Best Seller', description: 'Enjoy safer stops, longer tread life, better energy consumption, all in a quiet, comfortable ride. Designed for SUV and crossover drivers who demand safety, comfort, and longevity.', features: ['Safer stops on wet roads', 'Up to 20% longer tread life', 'Improved fuel efficiency', 'Ultra-quiet ride', 'All-season SUV performance'] },
  '3': { _id: '3', brand: 'Continental', model: 'PremiumContact 7', size: '225/50R17', price: 198, originalPrice: 230, category: 'Sedan', rating: 4.7, reviews: 267, isFeatured: true, badge: 'Top Rated', description: 'Next level safety and comfort engineered in Germany with outstanding wet braking and adaptive pattern technology.', features: ['Redefining benchmark braking', 'Adaptive pattern for wet & dry roads', 'RedChili compound technology', 'Premium German engineering', 'Quiet cabin comfort'] },
  '4': { _id: '4', brand: 'BFGoodrich', model: 'All-Terrain T/A KO2', size: '265/70R17', price: 310, originalPrice: 360, category: '4WD', rating: 4.9, reviews: 456, isFeatured: true, badge: '$150 Cashback', description: 'Toughest all-terrain tyre ever made, engineered with CoreGard technology for serious off-road adventures and heavy towing.', features: ['20% tougher sidewalls with CoreGard', 'Extended treadlife on gravel', 'Aggressive all-terrain traction', 'Severe snow rated (3PMSF)', 'Stone ejector design'] },
  '5': { _id: '5', brand: 'Michelin', model: 'Pilot Sport 5 Energy', size: '235/45R18', price: 245, originalPrice: 290, category: 'Sports', rating: 4.9, reviews: 189, isFeatured: true, badge: 'New', description: 'Enjoy performance driving, save energy. The Pilot Sport 5 Energy is Michelin\'s latest ultra-high performance tyre, delivering exceptional grip and precise handling at high speeds.', features: ['Exceptional dry & wet grip', 'Short braking distances', 'Dual sport tread design', 'Energy saving technology', 'Premium velvet sidewall touch'] },
  '6': { _id: '6', brand: 'Goodyear', model: 'Eagle F1 Asymmetric 6', size: '245/40R18', price: 278, originalPrice: 320, category: 'Sports', rating: 4.8, reviews: 178, isFeatured: false, badge: 'Precision', description: 'Ready for anything with dry braking performance and wet weather adaptive contact technology for high performance vehicles.', features: ['Dry Contact Plus technology', 'Wet braking resin formulation', 'EV-ready quiet acoustic noise dampening', 'Responsive steering feedback', 'Reinforced bead structure'] },
  '7': { _id: '7', brand: 'Pirelli', model: 'Scorpion All Terrain Plus', size: '265/60R18', price: 285, originalPrice: 330, category: 'SUV', rating: 4.7, reviews: 195, isFeatured: false, badge: '4x4 Offroad', description: 'Rugged aesthetic with aggressive tread block design for on-road comfort and off-road capability in harsh Australian terrain.', features: ['Aggressive symmetric tread pattern', 'Cut and chip resistant compound', 'High resistance to off-road punctures', 'Deep tread grooves for mud evacuation', 'Comfortable highway cruising'] },
  '8': { _id: '8', brand: 'Hankook', model: 'Dynapro ATM RF10', size: '245/70R16', price: 175, originalPrice: 205, category: '4WD', rating: 4.6, reviews: 142, isFeatured: false, badge: 'Best Value', description: 'Rugged all-terrain tyre designed for utes, 4x4s, and heavy-duty towing across highway and dirt tracks.', features: ['Wide footprint for even wear', 'Wraparound tread guard against cuts', 'Zigzag block pattern for mud grip', 'Heavy load capacity', 'Great value for money'] },
  '9': { _id: '9', brand: 'Dunlop', model: 'SP Sport Maxx 050+', size: '225/45R18', price: 215, originalPrice: 250, category: 'Sports', rating: 4.7, reviews: 168, isFeatured: false, badge: 'Maxx Grip', description: 'Flagship ultra-high performance tyre engineered for premium passenger cars and sports sedans.', features: ['High silica content for wet traction', 'Asymmetric tread with large outer blocks', 'High speed stability rib', 'Comfortable sports ride', 'Precision steering response'] },
  '10': { _id: '10', brand: 'Bridgestone', model: 'Dueler A/T 697', size: '265/65R17', price: 260, originalPrice: 300, category: 'SUV', rating: 4.8, reviews: 380, isFeatured: false, badge: 'Popular', description: 'Australia\'s favorite 4WD tyre tested in real outback conditions for puncture resistance and long outback life.', features: ['Tested in harsh Australian outback', 'Reinforced steel belt package', 'Optimized tread block stiffness', 'Quiet on sealed roads', 'Superior puncture resistance'] },
  '11': { _id: '11', brand: 'Continental', model: 'ContiVanContact 200', size: '215/65R16', price: 165, originalPrice: 190, category: 'Light Truck', rating: 4.5, reviews: 115, isFeatured: false, badge: 'Commercial', description: 'Heavy duty transporter tyre offering safety, remarkable high mileage, and lower rolling resistance for fleet and trade vehicles.', features: ['Shorter braking distances with heavy loads', 'Reduced rolling resistance saves fuel', 'Stiff center ribs for stability', 'High mileage tread compound', 'Designed for vans and light commercial vehicles'] },
  '12': { _id: '12', brand: 'Pirelli', model: 'P Zero Run-Flat', size: '245/45R19', price: 340, originalPrice: 395, category: 'RunFlat', rating: 4.9, reviews: 210, isFeatured: false, badge: 'Run-Flat', description: 'Self-supporting run flat mobility combined with peerless racing-grade grip and precision handling developed with prestige automakers.', features: ['Pirelli Self-Supporting Run Flat technology', 'Drive up to 80km at 80km/h after puncture', 'Formulated from Formula 1 motorsport tech', 'Exceptional dry and wet handling', 'Prestige vehicle original equipment'] },
};

const TyreDetail = () => {
  const { id } = useParams();
  const [tyre, setTyre] = useState(null);
  const [qty, setQty] = useState(4);
  const [rimColor, setRimColor] = useState('#c0a020');
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!tyre) return;
    try {
      const saved = localStorage.getItem('tyroola_cart');
      const cart = saved ? JSON.parse(saved) : [];
      const existing = cart.find(item => item._id === tyre._id);
      if (existing) {
        existing.qty = (existing.qty || 1) + qty;
      } else {
        cart.push({
          _id: tyre._id,
          brand: tyre.brand,
          model: tyre.model,
          size: tyre.size,
          price: tyre.price,
          originalPrice: tyre.originalPrice,
          category: tyre.category,
          qty,
        });
      }
      localStorage.setItem('tyroola_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('tyroola_cart_change'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.dispatchEvent(new CustomEvent('tyroola_open_cart'));
  };

  useEffect(() => {
    const fetchTyre = async () => {
      try {
        const { data } = await axios.get(`/api/tyres/${id}`);
        setTyre(data.data);
      } catch {
        setTyre(mockTyres[id] || mockTyres['1']);
      } finally {
        setLoading(false);
      }
    };
    fetchTyre();
  }, [id]);

  if (loading) return <div className="container section"><div className="skeleton" style={{ height: '500px', borderRadius: '20px' }} /></div>;
  if (!tyre) return <div className="container section"><p>Tyre not found.</p></div>;

  const disc = tyre.originalPrice ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100) : 0;
  const totalPrice = (tyre.price * qty).toFixed(2);

  const rimOptions = [
    { label: 'Gold', color: '#c0a020' },
    { label: 'Chrome', color: '#c0c0c0' },
    { label: 'Black', color: '#222' },
    { label: 'Blue', color: '#0088cc' },
  ];

  return (
    <main className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="bc-link">Home</Link>
          <span>/</span>
          <Link to="/tyres" className="bc-link">Tyres</Link>
          <span>/</span>
          <span>{tyre.brand} {tyre.model}</span>
        </div>

        <div className="detail-grid">
          {/* Left - 3D Viewer */}
          <div className="detail-left">
            <div className="detail-canvas-wrap glass">
              <div className="canvas-label">🔄 Drag to rotate</div>
              <TyreCanvas height="450px" rimColor={rimColor} rotate={true} showParticles={true} />
            </div>

            {/* Rim Color Picker */}
            <div className="rim-picker glass">
              <h4 className="rim-title">🎨 Rim Finish</h4>
              <div className="rim-options">
                {rimOptions.map((opt) => (
                  <button
                    key={opt.color}
                    className={`rim-btn ${rimColor === opt.color ? 'active' : ''}`}
                    style={{ background: opt.color }}
                    onClick={() => setRimColor(opt.color)}
                    title={opt.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="detail-right">
            {tyre.badge && <span className="badge badge-yellow">{tyre.badge}</span>}
            <div className="detail-brand">{tyre.brand}</div>
            <h1 className="detail-model">{tyre.model}</h1>

            {/* Rating */}
            <div className="detail-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={16} fill={i < Math.floor(tyre.rating) ? '#FFD700' : 'none'} color={i < Math.floor(tyre.rating) ? '#FFD700' : '#444'} />
              ))}
              <span className="detail-rating-num">{tyre.rating}</span>
              <span className="detail-rating-count">({tyre.reviews} reviews)</span>
            </div>

            {/* Size */}
            <div className="detail-size-row">
              <span className="detail-size-label">Size</span>
              <span className="detail-size">{tyre.size}</span>
              <span className="detail-category">{tyre.category}</span>
            </div>

            <p className="detail-desc">{tyre.description}</p>

            {/* Features */}
            {tyre.features && (
              <div className="detail-features">
                {tyre.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <FiCheck size={14} className="feature-check" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pricing */}
            <div className="detail-pricing">
              <div className="detail-price-main">
                <span className="detail-price">${tyre.price}</span>
                {tyre.originalPrice && <span className="detail-orig">${tyre.originalPrice}</span>}
                {disc > 0 && <span className="detail-disc">Save {disc}%</span>}
              </div>
              <div className="detail-per">per tyre</div>
              <div className="detail-total">
                Total for {qty}: <strong>${totalPrice}</strong>
              </div>
            </div>

            {/* Qty selector */}
            <div className="detail-qty">
              <label>Quantity</label>
              <div className="qty-controls">
                {[1, 2, 4].map(n => (
                  <button key={n} className={`qty-btn ${qty === n ? 'active' : ''}`} onClick={() => setQty(n)}>
                    {n} tyre{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1, background: added ? '#10b981' : undefined }}
                onClick={handleAddToCart}
              >
                {added ? <><FiCheck /> Added {qty} to Cart!</> : <><FiShoppingCart /> Add to Cart</>}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-item">
                <FiTruck />
                <span>Free delivery available</span>
              </div>
              <div className="trust-item">
                <FiShield />
                <span>Price match guarantee</span>
              </div>
              <div className="trust-item">
                <FiCheck />
                <span>800+ fitting locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '3rem' }}>
          <Link to="/tyres" className="btn btn-dark">
            <FiArrowLeft /> Back to Tyres
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TyreDetail;

