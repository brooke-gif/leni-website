const LENI_PRODUCTS = [
  {
    id: 1,
    name: "The Foundry Shirt",
    category: "shirts",
    price: 68,
    stripeLink: "https://buy.stripe.com/test_3cI28r3QI3JJbLm8uvfjG00",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=800&q=80"
    ],
    description: "A considered shirt cut from deadstock linen, with a relaxed silhouette and dropped shoulder. Slightly oversized with a single chest pocket and pearlescent shell buttons. Hand-finished at our London studio. Each piece is entirely one of a kind.",
    sourcing: {
      material: "100% deadstock linen",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    care: [
      "Hand wash in cold water",
      "Lay flat to dry away from direct sunlight",
      "Cool iron on reverse if needed",
      "Do not bleach or tumble dry"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  },
  {
    id: 2,
    name: "The Linen Tee",
    category: "shirts",
    price: 54,
    stripeLink: "https://buy.stripe.com/test_14AdR99b2eon6r23abfjG01",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80"
    ],
    description: "A lightweight linen tee with a boxy, relaxed cut. The fabric is pre-washed for a lived-in softness from the first wear. Raw-edge hem and ribbed collar. Minimal and honest — made to be worn every day.",
    sourcing: {
      material: "100% pre-washed linen",
      city: "Lisbon",
      country: "Portugal",
      flag: "🇵🇹"
    },
    care: [
      "Machine wash at 30°C",
      "Tumble dry low or lay flat",
      "Warm iron",
      "Do not bleach"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  },
  {
    id: 3,
    name: "The Studio Shirt",
    category: "shirts",
    price: 78,
    stripeLink: "https://buy.stripe.com/test_6oUfZhaf67ZZg1C4effjG02",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
    ],
    description: "An artist's shirt reimagined as everyday wear. Cut from a medium-weight cotton-linen blend with a generous fit, long tails, and a single button-through placket. The collar sits softly — structured without stiffness.",
    sourcing: {
      material: "Cotton-linen blend (55% cotton, 45% linen)",
      city: "Milan",
      country: "Italy",
      flag: "🇮🇹"
    },
    care: [
      "Hand wash or delicate machine cycle",
      "Lay flat to dry",
      "Cool iron while slightly damp",
      "Do not bleach or dry clean"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  },
  {
    id: 4,
    name: "The Drawstring Short",
    category: "shorts",
    price: 62,
    stripeLink: "https://buy.stripe.com/test_6oUfZhaf67ZZg1C4effjG02",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80"
    ],
    description: "Easy, unstructured shorts with a wide drawstring waistband. The silhouette falls just above the knee with a slight flare. Two side-seam pockets. Made to be dressed up or down.",
    sourcing: {
      material: "100% deadstock linen",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    care: [
      "Hand wash in cold water",
      "Lay flat to dry",
      "Cool iron on reverse",
      "Do not bleach or tumble dry"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  },
  {
    id: 5,
    name: "The Linen Short",
    category: "shorts",
    price: 58,
    stripeLink: "https://buy.stripe.com/test_6oUfZhaf67ZZg1C4effjG02",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
    ],
    description: "A wardrobe essential in the softest washed linen. A straight, tailored leg cut slightly shorter. Finished with a concealed side zip and a flat front. Minimal, precise, wearable.",
    sourcing: {
      material: "100% washed linen",
      city: "Lisbon",
      country: "Portugal",
      flag: "🇵🇹"
    },
    care: [
      "Machine wash at 30°C",
      "Tumble dry low or hang dry",
      "Warm iron",
      "Do not bleach"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  },
  {
    id: 6,
    name: "The Cargo Short",
    category: "shorts",
    price: 72,
    stripeLink: "https://buy.stripe.com/test_6oUfZhaf67ZZg1C4effjG02",
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
    ],
    description: "A utility-inspired short with patch pockets at the hip and a relaxed, workwear silhouette. Cut from a sturdy cotton canvas in a natural ecru. Designed to age well — to gain character with every wear.",
    sourcing: {
      material: "100% organic cotton canvas",
      city: "Barcelona",
      country: "Spain",
      flag: "🇪🇸"
    },
    care: [
      "Machine wash at 40°C",
      "Tumble dry medium",
      "Iron at medium heat",
      "Do not bleach"
    ],
    postage: "Free tracked delivery within the UK. Dispatched within 3–5 working days. International shipping available at checkout.",
    oneOff: true
  }
];
