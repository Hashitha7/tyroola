import './PaymentMethodsSection.css';

const paymentOptions = [
  {
    id: 'afterpay',
    name: 'Afterpay',
    color: '#b2fce4',
    textColor: '#000',
    logoType: 'afterpay',
    description:
      'Pay for your tyres over 4 simple installments and pay nothing extra when you pay on time. No new card application - Instant approval online.',
    tag: '4 Interest-free payments',
  },
  {
    id: 'zippay',
    name: 'Zippay',
    color: '#2a1846',
    textColor: '#fff',
    logoType: 'zip',
    description:
      'Zip gives you the freedom to buy now and pay later. Repayments are flexible to suit your lifestyle - weekly, fortnightly or monthly.',
    tag: 'Flexible repayments',
  },
  {
    id: 'paypal',
    name: 'PayPal Pay in 4',
    color: '#003087',
    textColor: '#fff',
    logoType: 'paypal',
    description:
      'Split your new tyre payments in 4 - one every two weeks. It\'s interest free from PayPal.',
    tag: 'Zero interest',
  },
  {
    id: 'digitalwallets',
    name: 'Apple Pay / Google Pay',
    color: '#1a1a24',
    textColor: '#fff',
    logoType: 'wallets',
    description:
      'Make easy and secure digital tyre payments with Apple or Google Pay. Simply tap the button and confirm the payment on your device.',
    tag: '1-Tap Fast Checkout',
  },
];

const PaymentMethodsSection = () => {
  return (
    <section className="section payment-section">
      <div className="payment-bg-lights" />

      <div className="container">
        <div className="payment-header">
          <h2 className="section-title">Buy now, pay later & major payment methods</h2>
          <p className="section-subtitle">
            All major credit cards and Interest-free finance available
          </p>
        </div>

        <div className="payment-grid">
          {paymentOptions.map((item, i) => (
            <div
              key={item.id}
              className="payment-card card-3d"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card Banner / Logo Header */}
              <div
                className="payment-logo-wrap"
                style={{
                  background:
                    item.id === 'afterpay'
                      ? 'linear-gradient(135deg, #b2fce4 0%, #80f0c8 100%)'
                      : item.id === 'zippay'
                      ? 'linear-gradient(135deg, #2b1848 0%, #170d29 100%)'
                      : item.id === 'paypal'
                      ? 'linear-gradient(135deg, #002d72 0%, #00173d 100%)'
                      : 'linear-gradient(135deg, #22222e 0%, #13131c 100%)',
                }}
              >
                {item.logoType === 'afterpay' && (
                  <div className="logo-afterpay">
                    <span className="logo-text-afterpay">afterpay</span>
                    <span className="logo-arrows-afterpay">⇆</span>
                  </div>
                )}

                {item.logoType === 'zip' && (
                  <div className="logo-zip">
                    <span className="zip-z">Z</span>
                    <span className="zip-badge">PAY</span>
                    <span className="zip-p">P</span>
                  </div>
                )}

                {item.logoType === 'paypal' && (
                  <div className="logo-paypal">
                    <span className="paypal-p1">Pay</span>
                    <span className="paypal-p2">Pal</span>
                  </div>
                )}

                {item.logoType === 'wallets' && (
                  <div className="logo-wallets">
                    <div className="wallet-pill">
                      <span> Pay</span>
                    </div>
                    <div className="wallet-pill gpay-pill">
                      <span className="g-blue">G</span>
                      <span className="g-red">o</span>
                      <span className="g-yellow">o</span>
                      <span className="g-blue">g</span>
                      <span className="g-green">l</span>
                      <span className="g-red">e</span>
                      <span className="g-pay"> Pay</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="payment-card-body">
                <span className="payment-tag">{item.tag}</span>
                <h3 className="payment-name">{item.name}</h3>
                <p className="payment-desc">{item.description}</p>
              </div>

              {/* 3D Bottom Accent Glow */}
              <div className="payment-card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;

