import { useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiCheck } from 'react-icons/fi';
import './FaqSection.css';

const faqs = [
  {
    id: 1,
    question: '1. Is it safe to buy tyres online in Australia?',
    answer:
      "Yes, it's just as safe as buying in-store. Your tyres get delivered anywhere in Australia, home or work, and you choose how they're fitted: DIY, a vetted partner station, or a mobile fitter who comes to you. They're mounted and balanced properly no matter which option you pick, so the only real difference is no showroom markup.",
    tag: 'Safety & Trust',
    highlight: 'No showroom markup + 100% fitting guarantee',
  },
  {
    id: 2,
    question: '2. How does buying tyres online actually work?',
    answer:
      "It's straightforward: enter your rego, car details, or tyre size, pick what fits, and choose where they go: your door or straight to a partner fitter. If you're comfortable with a jack, fit them yourself. Otherwise, book a partner station or a mobile fitter. Tyres arrive ahead of the appointment either way, so there's no waiting around on the day.",
    tag: 'Process',
    highlight: 'Step 1: Size/Rego -> Step 2: Delivery/Fitter -> Done',
  },
  {
    id: 3,
    question: '3. Are online tyres cheaper than buying from a local shop?',
    answer:
      "Generally, yes, and it's not a quality difference, it's overhead. No shopfronts means no showroom markup, and that saving gets passed on to you rather than pocketed. It's the same brands and models you'd find in-store. Prices can shift a little by region, since freight and fitting cost more the further out you are.",
    tag: 'Pricing & Savings',
    highlight: 'Lower overheads = Lower tyre prices passed to you',
  },
  {
    id: 4,
    question: '4. Do I need to know my tyre size before ordering?',
    answer:
      "Not really, it's handy to have, but not essential. Your size is on the sidewall of your current tyre (something like 265/65R17), or search by rego or your car's make and model instead. Getting it right matters, since Australian Design Rules require new tyres to match your car's load and speed rating. The rego lookup takes the guesswork out.",
    tag: 'Size Guide',
    highlight: 'Search easily by Rego Plate or Tyre Sidewall',
  },
  {
    id: 5,
    question: '5. Can I choose where my tyres get fitted?',
    answer:
      "Yes, that's the whole point. Fit them yourself if you're handy, take them to one of our vetted partner stations, or book a mobile fitter to come to your home or office. It's worth checking what's available near you before you order, since coverage is better in the cities than out in the regions.",
    tag: 'Fitting Options',
    highlight: '800+ Partner Stations or Mobile Van to your driveway',
  },
];

const FaqSection = () => {
  const [openIds, setOpenIds] = useState([1, 2, 3, 4, 5]); // All open or expandable

  const toggleFaq = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq-section" className="section faq-section">
      <div className="faq-bg-ambient" />

      <div className="container faq-container">
        <div className="faq-header">
          <div className="faq-badge">
            <FiHelpCircle />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about buying tyres online in Australia.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`faq-card card-3d ${isOpen ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="faq-q-left">
                    <span className="faq-tag">{faq.tag}</span>
                    <h3 className="faq-question-text">{faq.question}</h3>
                  </div>
                  <div className={`faq-chevron-wrap ${isOpen ? 'open' : ''}`}>
                    <FiChevronDown />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-wrap">
                    <p className="faq-answer-text">{faq.answer}</p>
                    <div className="faq-highlight-pill">
                      <FiCheck className="highlight-icon" />
                      <span>{faq.highlight}</span>
                    </div>
                  </div>
                )}

                <div className="faq-card-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

