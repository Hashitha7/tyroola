import { FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import './QuestionsBanner.css';

const QuestionsBanner = () => {
  return (
    <section className="questions-banner-section">
      <div className="questions-bg" />
      <div className="questions-gradient-overlay" />

      <div className="container questions-container">
        <div className="questions-content">
          <div className="questions-icon-wrap">
            <FiHelpCircle className="questions-floating-icon" />
          </div>
          <h2 className="questions-title">Questions?</h2>
          <p className="questions-subtitle">Get in touch with our friendly support team</p>
          <a href="#faq-section" className="btn btn-primary questions-btn">
            FAQs & Contact <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuestionsBanner;

