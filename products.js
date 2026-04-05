/* LENI — Product catalogue
   Replace Unsplash URLs with your own images when ready
   -------------------------------------------------------- */
const LENI_PRODUCTS = [
  {
    id: 'leni-shirt-001',
    name: 'The Linen Shirt',
    price: 95,
    type: 'shirt',
    status: 'in-stock',
    sizes: ['XS','S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'Cut from 100% stonewashed linen, this relaxed-fit shirt is designed to wear season after season. Each piece is hand-cut and sewn in our London studio.',
    material: '100% stonewashed linen',
    care: 'Machine wash cold, hang to dry'
  },
  {
    id: 'leni-shirt-002',
    name: 'The Oversized Tee',
    price: 65,
    type: 'shirt',
    status: 'in-stock',
    sizes: ['XS','S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'Made from 200gsm organic cotton jersey. A generous boxy fit that works as well tucked in as it does loose.',
    material: '100% GOTS certified organic cotton',
    care: 'Machine wash 30°, reshape while damp'
  },
  {
    id: 'leni-shorts-001',
    name: 'The Linen Shorts',
    price: 85,
    type: 'shorts',
    status: 'in-stock',
    sizes: ['XS','S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532453288672-3a17ac36f5ec?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'Wide-leg linen shorts with an elasticated waistband and two side pockets. Relaxed through the leg, hitting just above the knee.',
    material: '100% washed linen',
    care: 'Machine wash cold, hang to dry'
  },
  {
    id: 'leni-shirt-003',
    name: 'The Stripe Shirt',
    price: 110,
    type: 'shirt',
    status: 'preorder',
    sizes: ['S','M','L'],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'A classic striped cotton shirt with a clean boxy cut. Two chest pockets, single button cuff.',
    material: '100% organic cotton poplin',
    care: 'Machine wash 40°, light press'
  },
  {
    id: 'leni-shorts-002',
    name: 'The Cotton Shorts',
    price: 75,
    type: 'shorts',
    status: 'in-stock',
    sizes: ['XS','S','M','L','XL'],
    image: 'https://images.unsplash.com/photo-1532453288672-3a17ac36f5ec?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1532453288672-3a17ac36f5ec?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'Tailored cotton shorts in a mid-weight poplin. Straight leg with a mid-rise waist and flat-front finish.',
    material: '100% organic cotton',
    care: 'Machine wash 30°, hang or press lightly'
  },
  {
    id: 'leni-shirt-004',
    name: 'The Silk Blouse',
    price: 145,
    type: 'shirt',
    status: 'preorder',
    sizes: ['XS','S','M','L'],
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&h=1200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900&h=1200&fit=crop&q=80'
    ],
    description: 'A fluid silk blouse with a relaxed V-neck and dropped shoulders. Slips over anything effortlessly.',
    material: '100% mulberry silk',
    care: 'Hand wash or dry clean recommended'
  }
];
