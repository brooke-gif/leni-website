/* LENI — Product catalogue
   Replace stripeUrl values with your real Stripe Payment Links.
   ---------------------------------------------------------------- */
const LENI_PRODUCTS = [
  {
    id: 'leni-shirt-001',
    name: 'The Linen Shirt',
    price: 95,
    type: 'shirt',
    status: 'in-stock',
    stripeUrl: 'https://buy.stripe.com/REPLACE_LINEN_SHIRT',
    image: 'images/look-shirt-shorts-front.jpeg',
    images: [
      'images/look-shirt-shorts-front.jpeg',
      'images/look-shirt-shorts-side.jpeg',
      'images/look-shirt-shorts-alley.jpeg'
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
    stripeUrl: 'https://buy.stripe.com/REPLACE_OVERSIZED_TEE',
    image: 'images/look-shirt-shorts-side.jpeg',
    images: [
      'images/look-shirt-shorts-side.jpeg',
      'images/look-shirt-shorts-alley.jpeg',
      'images/hero-colonnade.jpeg'
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
    stripeUrl: 'https://buy.stripe.com/REPLACE_LINEN_SHORTS',
    image: 'images/look-shirt-shorts-alley.jpeg',
    images: [
      'images/look-shirt-shorts-alley.jpeg',
      'images/look-shirt-shorts-side.jpeg',
      'images/look-shirt-shorts-front.jpeg'
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
    stripeUrl: 'https://buy.stripe.com/REPLACE_STRIPE_SHIRT',
    image: 'images/hero-colonnade.jpeg',
    images: [
      'images/hero-colonnade.jpeg',
      'images/landscape-coastal.jpeg',
      'images/landscape-vineyard-1.jpeg'
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
    stripeUrl: 'https://buy.stripe.com/REPLACE_COTTON_SHORTS',
    image: 'images/look-shirt-shorts-front.jpeg',
    images: [
      'images/look-shirt-shorts-front.jpeg',
      'images/look-shirt-shorts-alley.jpeg',
      'images/look-shirt-shorts-side.jpeg'
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
    stripeUrl: 'https://buy.stripe.com/REPLACE_SILK_BLOUSE',
    image: 'images/landscape-coastal.jpeg',
    images: [
      'images/landscape-coastal.jpeg',
      'images/landscape-vineyard-2.jpeg',
      'images/hero-colonnade.jpeg'
    ],
    description: 'A fluid silk blouse with a relaxed V-neck and dropped shoulders. Slips over anything effortlessly.',
    material: '100% mulberry silk',
    care: 'Hand wash or dry clean recommended'
  }
];
