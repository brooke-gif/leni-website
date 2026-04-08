/**
 * LENI — Main JavaScript
 */

/* ── Announcement Bar ────────────────────────────────────────── */
(function () {
  const bar     = document.getElementById('announcement-bar');
  const dismiss = document.getElementById('dismiss-bar');
  const nav     = document.querySelector('.nav');
  const root    = document.documentElement;

  // Always measure the real rendered height and sync the CSS variable.
  // This fixes the nav/content gap that appears when the bar wraps to two
  // lines on mobile (static CSS value ≠ actual height).
  function syncBarHeight() {
    if (!bar) return;
    const h = bar.classList.contains('hidden') ? 0 : bar.getBoundingClientRect().height;
    root.style.setProperty('--announce-h', Math.round(h) + 'px');
  }

  if (!bar) return;

  if (sessionStorage.getItem('bar-dismissed')) {
    bar.classList.add('hidden');
    if (nav) nav.classList.add('bar-hidden');
    document.body.classList.add('bar-hidden');
  }

  // Sync on load and whenever the viewport resizes (orientation change etc.)
  syncBarHeight();
  window.addEventListener('resize', syncBarHeight);

  if (dismiss) {
    dismiss.addEventListener('click', () => {
      bar.classList.add('hidden');
      if (nav) nav.classList.add('bar-hidden');
      document.body.classList.add('bar-hidden');
      sessionStorage.setItem('bar-dismissed', '1');
      syncBarHeight(); // update to 0 so nav slides to top instantly
    });
  }
})();

/* ── Navigation / Mobile Menu ────────────────────────────────── */
(function () {
  const toggle     = document.querySelector('.nav__toggle');
  const menu       = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-menu-close');

  function openMenu() {
    if (!menu) return;
    menu.classList.remove('closing');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!menu || !menu.classList.contains('open')) return;
    menu.classList.add('closing');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      menu.classList.remove('open', 'closing');
    }, 420);
  }

  if (toggle) toggle.addEventListener('click', () => {
    menu && menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when a menu link is tapped
  if (menu) {
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // Close on Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Safety net: if page is unloaded while menu is open, ensure overflow is never stuck
  window.addEventListener('pagehide', () => { document.body.style.overflow = ''; });

  // Active link highlight on desktop nav (if visible)
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ── Toast ───────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── Product card renderer ───────────────────────────────────── */
function createProductCard(p) {
  const cardUrl   = `product.html?id=${p.id}`;
  const stripeUrl = p.stripeUrl || cardUrl;
  const badge     = p.status === 'preorder'
    ? `<span class="product-card__badge product-card__badge--preorder">Pre-order</span>`
    : '';
  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="product-card__placeholder"><svg viewBox="0 0 24 24" fill="none" stroke-width="1"><rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;

  return `<article class="product-card" onclick="location.href='${cardUrl}'" role="link" tabindex="0">
    <div class="product-card__img">
      ${imgHtml}
      ${badge}
      <a class="product-card__quick-add" href="${stripeUrl}" onclick="event.stopPropagation()" target="_blank" rel="noopener">Buy Now</a>
    </div>
    <div class="product-card__info">
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__meta">
        <span class="product-card__price">£${p.price}</span>
      </div>
    </div>
  </article>`;
}

/* ── Render products ─────────────────────────────────────────── */
function renderProducts(products, containerId, limit) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const items = limit ? products.slice(0, limit) : products;
  grid.innerHTML = items.map(createProductCard).join('');
}

/* ── Product Detail Page ─────────────────────────────────────── */
(function () {
  if (!document.getElementById('pdp-name')) return;

  const params = new URLSearchParams(location.search);
  const id     = params.get('id');

  if (typeof LENI_PRODUCTS === 'undefined' || !id) { location.href = 'shop.html'; return; }
  const p = LENI_PRODUCTS.find(x => x.id === id);
  if (!p) { location.href = 'shop.html'; return; }

  document.title = `${p.name} — Leni`;

  // Fill info panel
  document.getElementById('pdp-name').textContent  = p.name;
  document.getElementById('pdp-price').textContent = `£${p.price}`;
  const descEl = document.getElementById('pdp-desc');
  if (descEl) descEl.textContent = p.description || '';
  const matEl = document.getElementById('pdp-material');
  if (matEl) matEl.textContent = p.material ? `Material: ${p.material}` : '';
  const careEl = document.getElementById('pdp-care');
  if (careEl) careEl.textContent = p.care ? `Care: ${p.care}` : '';

  // Gallery — use images array if available, else single image
  const imgs = p.images || (p.image ? [p.image] : []);
  const mainEl = document.getElementById('pdp-main-img');
  const thumbsEl = document.getElementById('pdp-thumbs');

  if (mainEl && imgs.length > 0) {
    const mainImg = mainEl.querySelector('img') || document.createElement('img');
    mainImg.src = imgs[0];
    mainImg.alt = p.name;
    mainImg.id  = 'pdp-main-src';
    if (!mainImg.parentNode) mainEl.appendChild(mainImg);
  }

  if (thumbsEl && imgs.length > 1) {
    thumbsEl.innerHTML = imgs.map((src, i) =>
      `<div class="pdp__gallery-thumb${i === 0 ? ' active' : ''}" onclick="swapImg('${src}',this)">
        <img src="${src}" alt="${p.name} view ${i+1}" loading="lazy">
      </div>`
    ).join('');
  }

  // Buy button — links directly to Stripe payment URL
  const buyBtn = document.getElementById('pdp-buy');
  if (buyBtn) {
    const label = p.status === 'preorder' ? 'Reserve This Piece' : 'Buy Now';
    buyBtn.textContent = label;
    const url = p.stripeUrl || '#';
    buyBtn.setAttribute('href', url);
    if (url !== '#') {
      buyBtn.setAttribute('target', '_blank');
      buyBtn.setAttribute('rel', 'noopener');
    }
  }

  // Accordions
  document.querySelectorAll('.pdp__accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.pdp__accordion-item');
      const body = item.querySelector('.pdp__accordion-body');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.pdp__accordion-item').forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.pdp__accordion-body');
        if (b) b.classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        if (body) body.classList.add('open');
      }
    });
  });

  // Open first accordion by default
  const firstItem = document.querySelector('.pdp__accordion-item');
  if (firstItem) {
    firstItem.classList.add('open');
    const firstBody = firstItem.querySelector('.pdp__accordion-body');
    if (firstBody) firstBody.classList.add('open');
  }
})();

/* ── Gallery thumb swap ──────────────────────────────────────── */
function swapImg(src, thumbEl) {
  const mainImg = document.getElementById('pdp-main-src');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.pdp__gallery-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

/* ── Pre-order form ──────────────────────────────────────────── */
function handlePreorder(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    btn.textContent = orig;
    btn.disabled = false;
    showToast('Pre-order request sent!');
  }, 1400);
}

/* ── Feature Carousel (Swiper) ───────────────────────────────── */
(function () {
  if (typeof Swiper === 'undefined') return;
  new Swiper('#featureCarousel', {
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: true,
    spaceBetween: 8,
    navigation: {
      prevEl: '#featureCarousel .swiper-button-prev',
      nextEl: '#featureCarousel .swiper-button-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 8,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 1.4,
        spaceBetween: 8,
        centeredSlides: true,
      }
    }
  });
}());
