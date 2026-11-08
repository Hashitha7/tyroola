import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <main className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">We're here to help you find the perfect tyres for your vehicle.</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2 className="contact-info-title">Contact Us</h2>
            <div className="contact-cards">
              <div className="contact-card card-3d">
                <div className="contact-card-icon"><FiPhone /></div>
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:1800000000" className="contact-link">1800 000 000</a>
                  <p className="contact-hours">Mon–Fri 8am–6pm AEST</p>
                </div>
              </div>
              <div className="contact-card card-3d">
                <div className="contact-card-icon"><FiMail /></div>
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:help@tyroola.com.au" className="contact-link">help@tyroola.com.au</a>
                  <p className="contact-hours">Reply within 24 hours</p>
                </div>
              </div>
              <div className="contact-card card-3d">
                <div className="contact-card-icon"><FiMapPin /></div>
                <div>
                  <h4>Fitting Locations</h4>
                  <p className="contact-link">800+ locations Australia-wide</p>
                  <p className="contact-hours">Find your nearest fitter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap glass">
            <h2 className="contact-form-title">Send a Message</h2>
            {sent ? (
              <div className="contact-success">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone (optional)</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="04xx xxx xxx" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

