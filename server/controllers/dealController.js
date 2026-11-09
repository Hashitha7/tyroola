import Deal from '../models/Deal.js';

const mockDeals = [
  {
    _id: '1', title: 'Michelin – Up to $200 Gift Card', brand: 'Michelin',
    description: 'when you buy 4 selected Michelin tyres.', discount: '$200 Gift Card',
    validUntil: new Date('2026-12-31'), badge: 'Gift Card', color: '#FFD700', isActive: true,
  },
  {
    _id: '2', title: 'Michelin – Free Fitting', brand: 'Michelin',
    description: 'when you buy 4 selected Michelin tyres.', discount: 'FREE FITTING',
    validUntil: new Date('2026-11-30'), badge: 'Free Service', color: '#1a1a2e', isActive: true,
  },
  {
    _id: '3', title: 'BFGoodrich – Up to $150 Cashback', brand: 'BFGoodrich',
    description: 'when you buy 4 on-road BFGoodrich tyres. Cashback applied at checkout.', discount: '$150 Cashback',
    validUntil: new Date('2026-11-30'), badge: 'Cashback', color: '#16213e', isActive: true,
  },
];

export const getDeals = async (req, res) => {
  try {
    let deals;
    try {
      deals = await Deal.find({ isActive: true });
      if (deals.length === 0) deals = mockDeals;
    } catch {
      deals = mockDeals;
    }
    res.json({ success: true, data: deals });
  } catch (err) {
    res.json({ success: true, data: mockDeals });
  }
};

