# Leni Website — Setup Guide

## What you've got

A complete 5-page website:

| File | Page |
|---|---|
| `index.html` | Home page |
| `shop.html` | In-stock products |
| `preorder.html` | Pre-order form |
| `about.html` | About Leni |
| `terms.html` | Terms, returns, shipping |
| `style.css` | All styling |
| `main.js` | Navigation + product rendering |
| `products.js` | ✏️ **Your product catalogue — edit this** |

---

## Step 1 — Set up Stripe (free, ~10 minutes)

Stripe handles all payments securely. You pay ~1.5% + 20p per transaction (UK cards).

1. Go to [stripe.com](https://stripe.com) → create a free account
2. Verify your identity and bank account (required to receive payouts)
3. In your Stripe dashboard, go to **Payment Links**
4. Click **+ New** → select a product → set the price
5. Copy the link (it looks like `https://buy.stripe.com/xxxxxxxx`)
6. Open `products.js` and paste your link into the `stripeLink` field for each product

```js
{
  name: "The Foundry Shirt",
  price: 68,
  stripeLink: "https://buy.stripe.com/YOUR_ACTUAL_LINK_HERE",  // ← paste here
  ...
}
```

> **Tip:** Create one Payment Link per product in Stripe. When someone clicks Buy on your site, they go to Stripe's hosted checkout — fully secure, no card data ever touches your site.

---

## Step 2 — Set up Formspree for pre-order notifications (free)

Formspree collects the pre-order form data and emails it to you.

1. Go to [formspree.io](https://formspree.io) → create a free account (50 submissions/month free)
2. Click **+ New Form** → give it a name (e.g. "Leni Pre-orders")
3. Copy your form endpoint URL (looks like `https://formspree.io/f/abcd1234`)
4. Open `preorder.html` and find this line near the top of the form:

```html
<form id="preorder-form" data-formspree="https://formspree.io/f/YOUR_FORMSPREE_ID" ...>
```

Replace `YOUR_FORMSPREE_ID` with your actual ID.

---

## Step 3 — Publish to GitHub Pages (free, ~15 minutes)

1. Go to [github.com](https://github.com) → create a free account if you don't have one
2. Click **+ New repository**
   - Name it: `leni-website` (or anything you like)
   - Set to **Public**
   - Click **Create repository**
3. On your computer, open the `leni-website` folder
4. Drag all the files into the GitHub repository page (it will let you upload)
5. Once uploaded, go to **Settings → Pages**
6. Under "Source", select **Deploy from a branch** → choose `main` → click Save
7. After a minute, your site will be live at:
   `https://YOUR_GITHUB_USERNAME.github.io/leni-website/`

---

## Step 4 — Add a custom domain (optional, ~£10/year)

If you want `www.leni.co.uk` instead of the GitHub URL:

1. Buy a domain from [Namecheap](https://namecheap.com) or [Porkbun](https://porkbun.com)
2. In your domain's DNS settings, add a CNAME record:
   - Name: `www`
   - Value: `YOUR_GITHUB_USERNAME.github.io`
3. In GitHub → Settings → Pages, enter your custom domain
4. Tick **Enforce HTTPS**

---

## Updating your products

All product information lives in `products.js`. Open it in any text editor (Notepad, TextEdit, VS Code) and edit the fields:

```js
{
  id: 1,                          // unique number
  name: "The Foundry Shirt",      // product name
  category: "shirts",             // "shirts" or "shorts"
  price: 68,                      // price in £
  description: "...",             // short description
  status: "in-stock",             // "in-stock", "low-stock", or "sold-out"
  badge: "new",                   // "new", "limited", "bestseller" or null
  sizes: ["XS", "S", "M", "L"],  // available sizes
  stripeLink: "https://buy.stripe.com/...",
  image: null                     // or "images/my-photo.jpg"
}
```

After editing, re-upload the file to GitHub and the site will update automatically.

---

## Adding product photos

1. Create an `images/` folder inside `leni-website/`
2. Add your photos (JPG or WebP, ideally portrait/tall — 600×800px or similar)
3. In `products.js`, change `image: null` to `image: "images/your-photo.jpg"`

---

## Customising the site

- **Colours:** All colours are defined at the top of `style.css` under `:root { }`. Change `--accent` and `--accent-dark` to your preferred tones.
- **Email address:** Search for `hello@leni.co.uk` across all HTML files and replace with your actual email.
- **Instagram link:** Search for `instagram.com/leni` and update to your handle.
- **About text:** Edit `about.html` directly in a text editor.
- **Terms:** Edit `terms.html` — make sure to update the email address and any specific policies.

---

## Costs summary

| Service | Cost |
|---|---|
| GitHub Pages hosting | Free |
| Stripe account | Free (pay per transaction: ~1.5% + 20p) |
| Formspree (pre-order forms) | Free up to 50/month |
| Custom domain (optional) | ~£10–15/year |
| **Total monthly cost** | **£0** (+ Stripe fees per sale) |
