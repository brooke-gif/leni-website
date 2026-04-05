/**
 * LENI — Main JavaScript
 */

/* ── Announcement Bar ────────────────────────────────────────── */
(function () {
  const bar     = document.getElementById('announcement-bar');
  const dismiss = document.getElementById('dismiss-bar');
  const nav     = document.querySelector('.nav');
  const body    = document.body;

  if (!bar) return;

  // If previously dismissed this session, hide immediately
  if (sessionStorage.getItem('bar-dismissed')) {
    bar.classList.add('hidden');
    if (nav)  nav.classList.add('bar-hidden');
    if (body) body.classList.add('bar-hidden');
  }

  if (dismiss) {
    dismiss.addEventListener('click', () => {
      bar.classList.add('hidden');
      if (nav)  nav.classList.add('bar-hidden');
      if (body) body.classList.add('bar-hidden');
      sessionStorage.setItem('bar-dismissed', '1');
    });
  }
})();

/* ── Navigation ─────────────────────────────────────────────── */
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
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

/* ── Product card renderer (editorial Marni style) ───────────── */
function createProductCard(p) {
  const badgeMap = { 'new': 'New', 'limited': 'Limited', 'bestseller': 'Best Seller' };

  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="product-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="0"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
       </div>`;

  const badgeHtml = p.badge
    ? `<span class="product-card__badge product-card__badge--${p.badge}">${badgeMap[p.badge] || p.badge}</span>`
    : '';

  const statusHtml = p.status === 'low-stock'
    ? `<div class="product-card__status">Only a few left</div>`
    : p.status === 'sold-out'
    ? `<div class="product-card__status" style="color:var(--text-light)">Sold Out</div>`
    : '';

  const cardUrl = `product.html?id=${p.id}`;

  return `
    <article class="product-card" data-category="${p.category}" onclick="location.href='${cardUrl}'" role="link" tabindex="0" style="cursor:pointer">
      <div class="product-card__img">
        ${imgHtml}
        ${badgeHtml}
      </div>
      <div class="product-card__body">
        <div class="product-card__cat">${p.category}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__price">£${p.price}</div>
        ${statusHtml}
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

/* ── Product Detail Page ─────────────────────────────────────── */
(function () {
  // Only run on product.html
  if (!document.getElementById('pdp-name')) return;

  const params = new URLSearchParams(location.search);
  const id     = parseInt(params.get('id'));

  if (typeof LENI_PRODUCTS === 'undefined' || !id) {
    location.href = 'shop.html';
    return;
  }

  const p = LENI_PRODUCTS.find(x => x.id === id);
  if (!p) {
    location.href = 'shop.html';
    return;
  }

  // Populate page title and breadcrumb
  document.title = `${p.name} — Leni`;
  const crumbName = document.getElementById('pdp-breadcrumb-name');
  if (crumbName) crumbName.textContent = p.name;

  // Category and name
  document.getElementById('pdp-category').textContent = p.category;
  document.getElementById('pdp-name').textContent     = p.name;
  document.getElementById('pdp-price').textContent    = `£${p.price}`;
  document.getElementById('pdp-description').textContent = p.description;

  // Status badge
  const statusEl = document.getElementById('pdp-status');
  if (statusEl) {
    if (p.status === 'in-stock') {
      statusEl.textContent = 'In Stock';
      statusEl.className   = 'pdp__status';
    } else if (p.status === 'low-stock') {
      statusEl.textContent = 'Only a few left';
      statusEl.className   = 'pdp__status pdp__status--low';
    } else {
      statusEl.textContent = 'Sold Out';
      statusEl.className   = 'pdp__status pdp__status--sold';
    }
  }

  // Main image + thumbnails (placeholders if no image)
  const mainImg  = document.getElementById('pdp-main-img');
  const thumbs   = document.getElementById('pdp-thumbs');
  const imgCount = 3; // show 3 placeholder tiles

  if (mainImg) {
    if (p.image) {
      mainImg.innerHTML = `<img src="${p.image}" alt="${p.name}" id="pdp-main-src">`;
    } else {
      mainImg.innerHTML = buildPlaceholder('large');
    }
  }

  if (thumbs) {
    let thumbHtml = '';
    for (let i = 0; i < imgCount; i++) {
      const activeClass = i === 0 ? 'active' : '';
      thumbHtml += `<div class="pdp__thumb ${activeClass}" data-index="${i}" onclick="swapThumb(this,${i})">
        ${p.image ? `<img src="${p.image}" alt="${p.name} view ${i+1}">` : buildPlaceholder('thumb', i)}
      </div>`;
    }
    thumbs.innerHTML = thumbHtml;
  }

  // Buy button
  const buyBtn = document.getElementById('pdp-buy');
  if (buyBtn) {
    if (p.status === 'sold-out') {
      buyBtn.textContent = 'Sold Out';
      buyBtn.classList.add('sold-out');
      buyBtn.disabled = true;
    } else {
      buyBtn.textContent = `Buy Now — £${p.price}`;
      buyBtn.addEventListener('click', () => {
        if (p.stripeLink && !p.stripeLink.includes('test')) {
          window.open(p.stripeLink, '_blank');
        } else {
          // For test links, still navigate
          window.open(p.stripeLink, '_blank');
        }
      });
    }
  }

  // Accordions
  document.querySelectorAll('.pdp__accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const acc = btn.closest('.pdp__accordion');
      acc.classList.toggle('open');
    });
  });

  // Open first accordion by default
  const firstAcc = document.querySelector('.pdp__accordion');
  if (firstAcc) firstAcc.classList.add('open');

})();

/* ── Thumbnail swap ──────────────────────────────────────────── */
function swapThumb(el, index) {
  document.querySelectorAll('.pdp__thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  // If real images, swap main src
  const mainEl = document.getElementById('pdp-main-img');
  const img    = el.querySelector('img');
  if (img && mainEl) {
    const mainImg = mainEl.querySelector('img');
    if (mainImg) mainImg.src = img.src;
  }
}

/* ── Placeholder builder ─────────────────────────────────────── */
function buildPlaceholder(size, index) {
  const shades = ['#F5EAE7', '#EDE0DC', '#F9F2F0'];
  const shade  = shades[(index || 0) % shades.length];
  const bg     = size === 'large' ? '#F5EAE7' : shade;
  return `<div style="width:100%;height:100%;background:${bg};display:flex;align-items:center;justify-content:center;">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="0.8" style="width:${size==='large'?'48':'24'}px;opacity:0.2">
      <rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 21V9"/>
    </svg>
  </div>`;
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
    const pid  = parseInt(itemSelect.value);
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

  if (itemSelect && typeof LENI_PRODUCTS !== 'undefined') {
    itemSelect.innerHTML = LENI_PRODUCTS
      .filter(p => p.status !== 'sold-out')
      .map(p => `<option value="${p.id}">${p.name} — £${p.price}</option>`)
      .join('');
    updateSizes();
  }

  itemSelect?.addEventListener('change', updateSizes);
  qtyInput?.addEventListener('input', updateSummary);

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Placing order…';
    btn.disabled = true;

    const pid  = parseInt(itemSelect?.value);
    const prod = (typeof LENI_PRODUCTS !== 'undefined') ? LENI_PRODUCTS.find(p => p.id === pid) : null;
    const data = new FormData(form);
    const FORMSPREE_URL = form.dataset.formspree;

    try {
      if (FORMSPREE_URL && FORMSPREE_URL.includes('formspree.io')) {
        await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
      }
      if (prod && prod.stripeLink && !prod.stripeLink.includes('REPLACE')) {
        window.location.href = prod.stripeLink;
      } else {
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
