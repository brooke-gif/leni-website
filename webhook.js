/**
 * Stripe webhook — marks purchased items as sold in Netlify Blobs.
 * Set STRIPE_WEBHOOK_SECRET in Netlify env vars (from Stripe dashboard → Webhooks).
 * Listen for the event: checkout.session.completed
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const itemIds = session.metadata?.item_ids;

    if (itemIds) {
      const store = getStore('leni-inventory');
      const ids = itemIds.split(',').map(id => id.trim()).filter(Boolean);
      await Promise.all(ids.map(id => store.setJSON(id, { status: 'sold', soldAt: new Date().toISOString() })));
      console.log('Marked as sold:', ids);
    }
  }

  return { statusCode: 200, body: 'OK' };
};
