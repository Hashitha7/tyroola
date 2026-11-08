import Tyre from '../models/Tyre.js';

// Mock data fallback
const mockTyres = [
  {
    _id: '1', brand: 'Michelin', model: 'Primacy 5 Energy', size: '265/65R17',
    width: 265, aspectRatio: 65, rimSize: 17, price: 189, originalPrice: 220,
    category: 'SUV', rating: 4.8, reviews: 234,
    features: ['Safer stops', 'Longer tread life', 'Better energy consumption'],
    description: 'Enjoy safer stops, longer tread life, better energy consumption, all in a quiet, comfortable ride.',
    isFeatured: true, badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    _id: '2', brand: 'Michelin', model: 'Pilot Sport 5 Energy', size: '235/45R18',
    width: 235, aspectRatio: 45, rimSize: 18, price: 245, originalPrice: 290,
    category: 'Sports', rating: 4.9, reviews: 189,
    features: ['Performance driving', 'Save energy', 'Excellent grip'],
    description: 'Enjoy performance driving, save energy.',
    isFeatured: true, badge: 'New',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400'
  },
  {
    _id: '3', brand: 'BFGoodrich', model: 'All-Terrain T/A KO2', size: '265/70R17',
    width: 265, aspectRatio: 70, rimSize: 17, price: 310, originalPrice: 360,
    category: '4WD', rating: 4.7, reviews: 456,
    features: ['Extreme terrain', 'Tough sidewalls', 'All-weather'],
    description: 'Built for the toughest off-road conditions.',
    isFeatured: true, badge: '$150 Cashback',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400'
  },
  {
    _id: '4', brand: 'Bridgestone', model: 'Turanza T005', size: '205/55R16',
    width: 205, aspectRatio: 55, rimSize: 16, price: 142, originalPrice: 165,
    category: 'Sedan', rating: 4.6, reviews: 312,
    features: ['Quiet ride', 'Long life', 'Fuel efficient'],
    description: 'Superior comfort and fuel efficiency for everyday driving.',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    _id: '5', brand: 'Goodyear', model: 'Eagle F1 Asymmetric 6', size: '245/40R18',
    width: 245, aspectRatio: 40, rimSize: 18, price: 278, originalPrice: 320,
    category: 'Sports', rating: 4.8, reviews: 178,
    features: ['Ultra-high performance', 'Short braking distances', 'Precise handling'],
    description: 'Ultra high performance tyre for sports cars.',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400'
  },
  {
    _id: '6', brand: 'Continental', model: 'PremiumContact 7', size: '225/50R17',
    width: 225, aspectRatio: 50, rimSize: 17, price: 198, originalPrice: 230,
    category: 'Sedan', rating: 4.7, reviews: 267,
    features: ['Wet braking', 'Fuel saving', 'Long mileage'],
    description: 'Premium performance with outstanding wet braking.',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  }
];

export const getTyres = async (req, res) => {
  try {
    const { brand, category, size, minPrice, maxPrice, featured } = req.query;
    let query = {};
    if (brand) query.brand = new RegExp(brand, 'i');
    if (category) query.category = category;
    if (size) query.size = size;
    if (featured) query.isFeatured = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let tyres;
    try {
      tyres = await Tyre.find(query).sort({ isFeatured: -1, createdAt: -1 });
      if (tyres.length === 0) tyres = mockTyres;
    } catch {
      tyres = mockTyres;
    }

    res.json({ success: true, count: tyres.length, data: tyres });
  } catch (err) {
    res.json({ success: true, count: mockTyres.length, data: mockTyres });
  }
};

export const getTyreById = async (req, res) => {
  try {
    let tyre;
    try {
      tyre = await Tyre.findById(req.params.id);
    } catch {
      tyre = mockTyres.find(t => t._id === req.params.id);
    }
    if (!tyre) return res.status(404).json({ success: false, message: 'Tyre not found' });
    res.json({ success: true, data: tyre });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const searchTyres = async (req, res) => {
  try {
    const { width, aspectRatio, rimSize } = req.query;
    let results;
    try {
      results = await Tyre.find({ width: Number(width), aspectRatio: Number(aspectRatio), rimSize: Number(rimSize) });
      if (results.length === 0) results = mockTyres;
    } catch {
      results = mockTyres;
    }
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.json({ success: true, count: mockTyres.length, data: mockTyres });
  }
};

