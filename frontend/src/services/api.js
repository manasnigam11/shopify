/**
 * Centralized API client service.
 *
 * Pricing endpoints:   Public — no auth required
 * Admin endpoints:     Protected — require admin password via X-Admin-Password header
 */

const API_BASE_URL = ''; // Proxied via Vite in dev

async function fetchJson(url, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (networkError) {
    throw new Error('Unable to connect to the pricing service. Is the backend running on port 8000?');
  }

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = typeof data?.detail === 'object'
      ? data.detail.detail
      : data?.detail || 'An error occurred';
    const error = new Error(errorMsg);
    error.status = response.status;
    error.code = typeof data?.detail === 'object' ? data.detail.code : 'UNKNOWN';
    throw error;
  }
  return data;
}

/**
 * Creates an auth headers object for admin-protected endpoints.
 * @param {string} password - The admin password
 */
function adminHeaders(password) {
  return { 'X-Admin-Password': password };
}

export const api = {
  // ── Storefront (public) ──
  pricing: {
    /**
     * Fetch product price by ZIP code.
     * Sends product_id and variant_id alongside the ZIP — matching the
     * expected Shopify storefront → backend integration flow.
     *
     * @param {string} zipCode   - 5-digit US ZIP code
     * @param {string} productId - Shopify product ID
     * @param {string} variantId - Shopify variant ID
     */
    getByZip: (zipCode, productId = 'prod_pos_terminal_pro', variantId = 'var_pos_pro_default') =>
      fetchJson(
        `/api/storefront/price?zip=${encodeURIComponent(zipCode)}&product_id=${encodeURIComponent(productId)}&variant_id=${encodeURIComponent(variantId)}`
      ),
  },

  // ── Admin (password-protected) ──
  admin: {
    /**
     * Verify admin password. Returns { authenticated: true } on success.
     */
    login: (password) =>
      fetchJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      }),

    /**
     * Fetch admin settings (requires password).
     */
    getSettings: (password) =>
      fetchJson('/api/admin/settings', {
        headers: adminHeaders(password),
      }),

    /**
     * Update admin settings (requires password).
     */
    updateSettings: (updates, password) =>
      fetchJson('/api/admin/settings', {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: adminHeaders(password),
      }),
  },
};
