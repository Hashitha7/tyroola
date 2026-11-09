import { Link } from 'react-router-dom';
import { FiLinkedin, FiFacebook, FiInstagram, FiLock, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import './Footer.css';

// 6 Top Categories Directory
const directoryData = [
  {
    title: 'Top Tyre Brands',
    links: [
      'Winrun', 'Pirelli', 'Kumho', 'Bridgestone', 'Michelin',
      'Hankook', 'BF goodrich', 'Continental', 'Dunlop', 'Goodyear',
    ],
    more: '...more tyre brands',
  },
  {
    title: 'Top Tyre Models',
    links: [
      'Winrun R330', 'Kinforest KF 550', 'Pirelli Scorpion Verde AS',
      'Bridgestone Potenza Adrenalin RE003', 'Michelin Pilot Sport 5',
      'BFGoodrich All Terrain TA KO2 RWL', 'Hankook Ventus S1 EVO3 K127',
      'Continental Contimaxcontact MC6', 'Goodyear Assurance TripleMax 2',
      'Dunlop Sp Sport Fm800',
    ],
    more: null,
  },
  {
    title: 'Top Tyre Sizes',
    links: [
      '205/55R16', '215/60R16', '235/45R17', '245/70R16', '265/65R17',
      '265/70R16', '265/70R17', '265/75R16', '285/70R17', '285/75R16',
    ],
    more: '...more tyre sizes',
  },
  {
    title: 'Top Vehicle Makers',
    links: [
      'BMW', 'Ford', 'Toyota', 'Mercedes Benz', 'Mitsubishi',
      'Hyundai', 'Subaru', 'Audi', 'Holden', 'Kia',
    ],
    more: '...more vehicle makes',
  },
  {
    title: 'Top Vehicle Models',
    links: [
      'Ford Falcon', 'Honda Civic', 'Holden Commodore', 'Hyundai I30',
      'Audi A6', 'Mercedes Benz C200', 'BMW 318I', 'Volkswagen Golf',
      'Mitsubishi Lancer', 'Subaru Forester',
    ],
    more: null,
  },
  {
    title: 'Top fitting locations',
    links: [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
      'NSW', 'VIC', 'QLD', 'ACT', 'SA',
    ],
    more: '...more fitting locations',
  },
];

// Press Coverage Logos
const pressLogos = [
  { name: 'news.com.au', type: 'bold' },
  { name: 'THE AUSTRALIAN', type: 'serif' },
  { name: 'The Daily Telegraph', type: 'oldstyle' },
  { name: 'BUSINESS INSIDER', type: 'sans' },
  { name: 'yahoo! finance', type: 'yahoo' },
  { name: 'FOX', type: 'fox' },
  { name: '■ DIGITAL JOURNAL', type: 'sans' },
  { name: 'MarketWatch', type: 'market' },
  { name: 'AP', type: 'ap' },
  { name: 'N', type: 'box' },
];

const Footer = () => {
  return (
    <footer className="mega-footer">
      <div className="mega-footer-glow" />

      {/* Part 1: Top Tyre & Vehicle SEO Directory (6 Columns) */}
      <div className="footer-directory-section">
        <div className="container">
          <div className="directory-grid">
            {directoryData.map((col, idx) => (
              <div key={idx} className="directory-col">
                <h4 className="directory-title">{col.title}</h4>
                <ul className="directory-list">
                  {col.links.map((item, i) => (
                    <li key={i}>
                      <Link to="/tyres" className="directory-link">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {col.more && (
                    <li>
                      <Link to="/tyres" className="directory-link more-link">
                        {col.more}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-divider-subtle" />

      {/* Part 2: Press Coverage Strip */}
      <div className="footer-press-section">
        <div className="container">
          <div className="press-label">Press coverage</div>
          <div className="press-logos-grid">
            {pressLogos.map((item, i) => (
              <div key={i} className={`press-logo-item press-${item.type}`}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-divider-subtle" />

      {/* Part 4: Main Navigation, Payment Methods & International */}
      <div className="footer-main-links-section">
        <div className="container">
          <div className="footer-main-grid">
            {/* Payment Method Badges */}
            <div className="footer-col payment-col">
              <h4 className="footer-heading">Payment</h4>
              <div className="payment-icons-matrix">
                <div className="pay-badge zip-badge-mini">
                  <span>Z</span><span className="pay-tag">PAY</span><span>P</span>
                </div>
                <div className="pay-badge paypal-badge-mini">
                  <em>Pay</em><strong>Pal</strong>
                </div>
                <div className="pay-badge visa-badge-mini">
                  <strong>VISA</strong>
                </div>
                <div className="pay-badge mc-badge-mini">
                  <span className="mc-c1" /><span className="mc-c2" />
                </div>
                <div className="pay-badge amex-badge-mini">
                  <span>AMEX</span>
                </div>
                <div className="pay-badge apple-badge-mini">
                  <span>Pay</span>
                </div>
                <div className="pay-badge gpay-badge-mini">
                  <span>G Pay</span>
                </div>
                <div className="pay-badge afterpay-badge-mini">
                  <span>afterpay⇆</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-arrow-links">
                <li><Link to="/contact">About us &gt;</Link></li>
                <li><Link to="/contact">Careers &gt;</Link></li>
                <li><Link to="/how-it-works">Tyroola blog &gt;</Link></li>
                <li><Link to="/contact">Terms and conditions &gt;</Link></li>
                <li><Link to="/contact">Privacy policy &gt;</Link></li>
                <li><Link to="/contact">Refer a friend &gt;</Link></li>
              </ul>
            </div>

            {/* Help Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Help</h4>
              <ul className="footer-arrow-links">
                <li><Link to="/contact">Contact us &gt;</Link></li>
                <li><Link to="/contact">Frequently asked questions &gt;</Link></li>
                <li><Link to="/how-it-works">Shipping &gt;</Link></li>
                <li><Link to="/contact">Return &gt;</Link></li>
              </ul>
            </div>

            {/* Fitting Stations */}
            <div className="footer-col">
              <h4 className="footer-heading">Fitting Stations</h4>
              <ul className="footer-arrow-links">
                <li><Link to="/contact">Join as fitting partner &gt;</Link></li>
                <li><Link to="/how-it-works">Tyroola's Fitting Programs &gt;</Link></li>
              </ul>
            </div>

            {/* International */}
            <div className="footer-col">
              <h4 className="footer-heading">International</h4>
              <ul className="footer-arrow-links">
                <li><a href="https://www.tyroola.com.au" target="_blank" rel="noreferrer">Tyroola Australia &gt;</a></li>
                <li><a href="https://www.tyroola.co.nz" target="_blank" rel="noreferrer">Tyroola New Zealand &gt;</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider-subtle" />

      {/* Part 5: Secure Shopping, Support & Socials */}
      <div className="footer-support-section">
        <div className="container">
          <div className="support-grid">
            {/* Security Badge */}
            <div className="support-col">
              <h4 className="footer-heading">Secure shopping</h4>
              <div className="ssl-lock-badge">
                <div className="ssl-icon-box">
                  <FiLock />
                </div>
                <div className="ssl-text-wrap">
                  <span className="ssl-percent">100% PROTECTED</span>
                  <span className="ssl-sub">SSL SECURED</span>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="support-col support-center">
              <h4 className="footer-heading">Customer Support</h4>
              <a href="tel:0282947125" className="support-phone-large">
                <FiPhone /> (02) 8294 7125
              </a>
              <div className="support-hours">
                <FiClock /> Call hours: Monday - Friday: 8:00 - 16:30 (AEDT)
              </div>
              <div className="support-email">
                <FiMail /> Email:{' '}
                <a href="mailto:support@tyroola.com.au">support@tyroola.com.au</a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="support-col support-socials-col">
              <h4 className="footer-heading">Follow us on</h4>
              <div className="social-pills">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill" title="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-pill" title="Facebook">
                  <FiFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill" title="Instagram">
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 6: Legal Bottom Copyright */}
      <div className="footer-bottom-bar">
        <div className="container">
          <p className="copyright-text">
            ABN 81678407120 &nbsp;•&nbsp; ACN 678407120 &nbsp;•&nbsp; © Copyright Tyroola International PTY Ltd 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
