/**
 * Returns a list of sold product IDs so the front end can mark items as sold.
 */
const { getStore } = require('@netlify/blobs');

exports.handler = async () => {
  try {
    const store = getStore('leni-inventory');
    const { blobs } = await store.list();
    const sold = blobs.map(b => b.key);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30', // cache 30s
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ sold }),
    };
  } catch (err) {
    console.error('get-inventory error:', err.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sold: [] }),
    };
  }
};
