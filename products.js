/**
 * LENI — Product Catalogue
 * ─────────────────────────────────────────────────────────────
 * Edit this file to add, remove, or update your products.
 *
 * Fields:
 *   id          — Unique number (increment for each new product)
 *   name        — Product name displayed on the site
 *   category    — "shirts" or "shorts" (used for filtering)
 *   price       — Price in GBP (number, no £ sign)
 *   description — Short description shown on the card
 *   status      — "in-stock" | "low-stock" | "sold-out"
 *   badge       — Optional label: "new", "bestseller", etc. (or null)
 *   sizes       — Array of available sizes
 *   stripeLink  — Your Stripe Payment Link URL for this product
 *                 Get these from: dashboard.stripe.com → Payment Links
 *   image       — Path to product image, e.g. "images/shirt-name.jpg"
 *                 Leave as null to show the placeholder icon
 * ─────────────────────────────────────────────────────────────
 */

const LENI_PRODUCTS = [
  {
    id: 1,
    name: "The Foundry Shirt",
    category: "shirts",
    price: 68,
    description: "Oversized silhouette in 100% organic cotton. Dropped shoulders, relaxed fit. Handmade in small batches.",
    status: "in-stock",
    badge: "new",
    sizes: ["XS", "S", "M", "L", "XL"],
    stripeLink: "https://buy.stripe.com/test_3cI28r3QI3JJbLm8uvfjG00",
    image: null
  },
  {
    id: 2,
    name: "The Linen Tee",
    category: "shirts",
    price: 54,
    description: "Breathable linen-cotton blend. Perfect summer weight. Each piece is individually cut and sewn.",
    status: "in-stock",
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    stripeLink: "https://buy.stripe.com/test_14AdR99b2eon6r23abfjG01",
    image: null
  },
  {
    id: 3,
    name: "The Studio Shirt",
    category: "shirts",
    price: 78,
    description: "Long-sleeve boxy shirt with raw hemline detail. Limited run of 20 pieces.",
    status: "low-stock",
    badge: "limited",
    sizes: ["S", "M", "L"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
    image: null
  },
  {
    id: 4,
    name: "The Drawstring Short",
    category: "shorts",
    price: 62,
    description: "Wide-leg organic cotton shorts with elasticated waist and side pockets. Relaxed everyday wear.",
    status: "in-stock",
    badge: "new",
    sizes: ["XS", "S", "M", "L", "XL"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
    image: null
  },
  {
    id: 5,
    name: "The Linen Short",
    category: "shorts",
    price: 58,
    description: "Mid-length linen shorts with a clean, minimal finish. Handstitched seams throughout.",
    status: "in-stock",
    badge: null,
    sizes: ["S", "M", "L", "XL"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
    image: null
  },
  {
    id: 6,
    name: "The Cargo Short",
    category: "shorts",
    price: 72,
    description: "Utility-inspired shorts in heavy-duty cotton canvas. Four pockets, reinforced seams.",
    status: "in-stock",
    badge: null,
    sizes: ["S", "M", "L"],
    stripeLink: "https://buy.stripe.com/REPLACE_WITH_YOUR_LINK",
    image: null
  }
];
