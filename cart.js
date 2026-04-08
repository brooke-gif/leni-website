/**
 * LENI — Cart
 * Stores items in localStorage, renders a slide-out drawer, and
 * calls the Netlify function to create a Stripe Checkout session.
 */

const LENI_CART = (function () {
  const STORAGE_KEY = 'leni_cart';

  /* ── Storage ─────────────────────────────────────────────────── */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  /* ── Mutations ───────────────────────────────────────────────── */
  function add(product) {
    const items = load();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    save(items);
    updateUI();
    dispatchChange();
    openDrawer();
    showAddedToast(product.name);
  }

  function remove(productId) {
    save(load().filter(i => i.id !== productId));
    updateUI();
    dispatchChange();
  }

  function setQty(productId, qty) {
    const items = load();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    if (qty < 1) { remove(productId); return; }
    item.quantity = qty;
    save(items);
    updateUI();
    dispatchChange();
  }

  function clear() {
    save([]);
    updateUI();
    dispatchChange();
  }

  function isInCart(productId) {
    return load().some(i => i.id === productId);
  }

  /* ── Totals ──────────────────────────────────────────────────── */
  function total() {
    return load().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
  function count() {
    return load().reduce((sum, i) => sum + i.quantity, 0);
  }

  /* ── Cart change event (so product cards can update) ─────────── */
  function dispatchChange() {
    document.dispatchEvent(new CustomEvent('leni:cartchange'));
  }

  /* ── UI Helpers ──────────────────────────────────────────────── */
  function updateUI() {
    renderDrawer();
    updateBadge();
  }

  function updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(el => {
      const n = count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showAddedToast(name) {
    const t = document.getElementById('toast');
    const msg = document.querySelector('.toast-msg');
    if (!t || !msg) return;
    msg.textContent = `"${name}" added to cart`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* ── Render Drawer ───────────────────────────────────────────── */
  function renderDrawer() {
    const body = document.getElementById('cart-drawer-body');
    const footer = document.getElementById('cart-drawer-footer');
    if (!body || !footer) return;

    const items = load();
    if (items.length === 0) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__img">
          ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
        </div>
        <div class="cart-item__info">
          <span class="cart-item__name">${item.name}</span>
          <span class="cart-item__price">£${item.price.toFixed(2)}</span>
          <div class="cart-item__qty">
            <button onclick="LENI_CART.setQty('${item.id}', ${item.quantity - 1})" aria-label="Decrease">−</button>
            <span>${item.quantity}</span>
            <button onclick="LENI_CART.setQty('${item.id}', ${item.quantity + 1})" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="cart-item__remove" onclick="LENI_CART.remove('${item.id}')" aria-label="Remove">×</button>
      </div>
    `).join('');

    footer.innerHTML = `
      <div class="cart-total">
        <span>Total</span>
        <span>£${total().toFixed(2)}</span>
      </div>
      <p class="cart-shipping-note">Shipping calculated at checkout</p>
      <button class="btn btn--primary btn--full cart-checkout-btn" id="cart-checkout-btn">
        Checkout
      </button>
    `;

    document.getElementById('cart-checkout-btn')
      .addEventListener('click', startCheckout);
  }

  /* ── Stripe Checkout ─────────────────────────────────────────── */
  async function startCheckout() {
    const btn = document.getElementById('cart-checkout-btn');
    if (btn) { btn.textContent = 'Redirecting…'; btn.disabled = true; }

    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: load().map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image ? window.location.origin + '/' + i.image : null,
          })),
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      if (btn) { btn.textContent = 'Checkout'; btn.disabled = false; }
      alert('Something went wrong. Please try again.');
    }
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    // Build drawer HTML if not already in the DOM
    if (!document.getElementById('cart-drawer')) {
      const overlay = document.createElement('div');
      overlay.id = 'cart-overlay';
      overlay.className = 'cart-overlay';
      overlay.addEventListener('click', closeDrawer);

      const drawer = document.createElement('div');
      drawer.id = 'cart-drawer';
      drawer.className = 'cart-drawer';
      drawer.innerHTML = `
        <div class="cart-drawer__header">
          <span class="cart-drawer__title">Your Cart</span>
          <button class="cart-drawer__close" id="cart-drawer-close" aria-label="Close cart">×</button>
        </div>
        <div class="cart-drawer__body" id="cart-drawer-body"></div>
        <div class="cart-drawer__footer" id="cart-drawer-footer"></div>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(drawer);
      document.getElementById('cart-drawer-close')
        .addEventListener('click', closeDrawer);
    }

    updateUI();

    // Wire up any cart-toggle buttons already in the DOM
    document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
      btn.addEventListener('click', openDrawer);
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { add, remove, setQty, clear, count, total, isInCart, openDrawer, closeDrawer };
}());
