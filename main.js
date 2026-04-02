/**
 * LENI — Main JavaScript
 */

/* ── Navigation ─────────────────────────────────────────────── */
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Toast helper ────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── Product card renderer ───────────────────────────────────── */
function createProductCard(p) {
  const statusMap = { 'in-stock': '', 'low-stock': 'Only a few left', 'sold-out': 'Sold Out' };
  const badgeMap  = { 'new': 'New', 'limited': 'Limited', 'bestseller': 'Best Seller' };

  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="product-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
       </div>`;

  const badgeHtml = p.badge
    ? `<span class="product-card__badge product-card__badge--new">${badgeMap[p.badge] || p.badge}</span>`
    : '';

  const sizesHtml = p.sizes.map(s => `<option value="${s}">${s}</option>`).join('');

  const btnHtml = p.status === 'sold-out'
    ? `<button class="btn btn--outline btn--sm" disabled>Sold Out</button>`
    : `<a href="${p.stripeLink}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">Buy — £${p.price}</a>`;

  const lowStock = p.status === 'low-stock'
    ? `<p class="form-hint" style="color:var(--accent-dark);margin:0 0 8px;">${statusMap['low-stock']}</p>` : '';

  return `
    <article class="product-card" data-category="${p.category}">
      <div class="product-card__img">
        ${imgHtml}
        ${badgeHtml}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.description}</p>
        <div class="form-group" style="margin-bottom:14px;">
          <label for="size-${p.id}">Size</label>
          <select id="size-${p.id}">${sizesHtml}</select>
        </div>
        ${lowStock}
        <div class="product-card__footer">
          <span class="product-card__price">£${p.price}</span>
          ${btnHtml}
        </div>
      </div>
    </article>`;
}

/* ── Render products into a grid ─────────────────────────────── */
function renderProducts(products, containerId, limit) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const items = limit ? products.slice(0, limit) : products;
  grid.innerHTML = items.map(createProductCard).join('');
}

/* ── Filter logic ────────────────────────────────────────────── */
function initFilters(products, gridId) {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
      renderProducts(filtered, gridId);
    });
  });
}

/* ── Pre-order form ──────────────────────────────────────────── */
(function () {
  const form = document.getElementById('preorder-form');
  if (!form) return;

  const itemSelect = document.getElementById('po-item');
  const sizeSelect = document.getElementById('po-size');
  const qtyInput   = document.getElementById('po-qty');
  const summaryEl  = document.getElementById('order-summary-content');

  function getSizeOptions(product) {
    if (!product) return '<option>—</option>';
    return product.sizes.map(s => `<option>${s}</option>`).join('');
  }

  function updateSizes() {
    const pid = parseInt(itemSelect.value);
    const prod = (typeof LENI_PRODUCTS !== 'undefined') ? LENI_PRODUCTS.find(p => p.id === pid) : null;
    if (sizeSelect) sizeSelect.innerHTML = getSizeOptions(prod);
    updateSummary();
  }

  function updateSummary() {
    if (!summaryEl || typeof LENI_PRODUCTS === 'undefined') return;
    const pid  = parseInt(itemSelect?.value);
    const qty  = parseInt(qtyInput?.value) || 1;
    const prod = LENI_PRODUCTS.find(p => p.id === pid);
    if (!prod) return;
    const total = prod.price * qty;
    summaryEl.innerHTML = `
      <div class="order-summary__row"><span>${prod.name}</span><span>£${prod.price}</span></div>
      <div class="order-summary__row"><span>Quantity</span><span>×${qty}</span></div>
      <div class="order-summary__row order-summary__row--total"><span>Total</span><span>£${total}</span></div>`;
  }

  // Populate item dropdown from products list
  if (itemSelect && typeof LENI_PRODUCTS !== 'undefined') {
    itemSelect.innerHTML = LENI_PRODUCTS
      .filter(p => p.status !== 'sold-out')
      .map(p => `<option value="${p.id}">${p.name} — £${p.price}</option>`)
      .join('');
    updateSizes();
  }

  itemSelect?.addEventListener('change', updateSizes);
  qtyInput?.addEventListener('input', updateSummary);

  // Form submit — sends to Formspree, then redirects to Stripe
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Placing order…';
    btn.disabled = true;

    const pid  = parseInt(itemSelect?.value);
    const prod = (typeof LENI_PRODUCTS !== 'undefined') ? LENI_PRODUCTS.find(p => p.id === pid) : null;

    const data = new FormData(form);
    const FORMSPREE_URL = form.dataset.formspree; // set data-formspree="https://formspree.io/f/YOUR_ID"

    try {
      if (FORMSPREE_URL && FORMSPREE_URL.includes('formspree.io')) {
        await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
      }
      // Redirect to Stripe payment link
      if (prod && prod.stripeLink && !prod.stripeLink.includes('REPLACE')) {
        window.location.href = prod.stripeLink;
      } else {
        // Show success if Stripe link not set up yet
        form.style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
      }
    } catch (err) {
      btn.textContent = 'Try Again';
      btn.disabled = false;
      showToast('Something went wrong. Please try again.');
    }
  });
})();
