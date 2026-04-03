/* ─── Leni Studio · main.js ─────────────────────────────────────────────── */

/* ── Announcement bar dismiss ─────────────────────────────────────────── */
(function () {
  const bar = document.getElementById('announcement-bar');
  const dismiss = document.getElementById('dismiss-announcement');
  if (dismiss && bar) {
    dismiss.addEventListener('click', () => {
      bar.style.display = 'none';
    });
  }
})();

/* ── Mobile nav toggle ────────────────────────────────────────────────── */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');
  const close = document.getElementById('nav-close');

  function openNav() {
    drawer && drawer.classList.add('open');
    overlay && overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    drawer && drawer.classList.remove('open');
    overlay && overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  toggle && toggle.addEventListener('click', openNav);
  close && close.addEventListener('click', closeNav);
  overlay && overlay.addEventListener('click', closeNav);
})();

/* ── Header scroll behaviour ──────────────────────────────────────────── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();

/* ── Product card renderer ────────────────────────────────────────────── */
function renderProductCard(product) {
  const img = product.images && product.images[0]
    ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy">`
    : `<div class="product-card__placeholder"></div>`;

  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-card__image-wrap">
        ${img}
        <div class="product-card__badge">One of a kind</div>
      </div>
      <div class="product-card__info">
        <p class="product-card__name">${product.name}</p>
        <p class="product-card__price">£${product.price}</p>
      </div>
    </a>`;
}

/* ── Shop page: grid + filters ────────────────────────────────────────── */
(function () {
  const grid = document.getElementById('shop-grid');
  const filterBtns = document.querySelectorAll('[data-filter]');
  const countEl = document.getElementById('product-count');
  if (!grid || typeof LENI_PRODUCTS === 'undefined') return;

  let currentFilter = 'all';

  function renderGrid(filter) {
    const items = filter === 'all'
      ? LENI_PRODUCTS
      : LENI_PRODUCTS.filter(p => p.category === filter);

    grid.innerHTML = items.map(renderProductCard).join('');
    if (countEl) countEl.textContent = `${items.length} piece${items.length !== 1 ? 's' : ''}`;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGrid(currentFilter);
    });
  });

  renderGrid(currentFilter);
})();

/* ── Homepage: featured products ─────────────────────────────────────── */
(function () {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid || typeof LENI_PRODUCTS === 'undefined') return;

  // Show first 4 products as featured
  const featured = LENI_PRODUCTS.slice(0, 4);
  featuredGrid.innerHTML = featured.map(renderProductCard).join('');
})();
