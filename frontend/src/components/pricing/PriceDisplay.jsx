/**
 * PriceDisplay — Conditionally renders pricing results.
 *
 * Three visual states:
 *   1. Loading  → Spinner + skeleton shimmer
 *   2. Error    → Alert box with error icon and message
 *   3. Success  → Price card with Add to Cart CTA and trust signals
 */

export default function PriceDisplay({ priceData, isLoading, error }) {
  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="price-display loading" id="price-loading">
        <div className="loading-content">
          <div className="loading-spinner" aria-label="Loading price" />
          <p className="loading-text">Fetching regional price...</p>
          <div className="skeleton-group">
            <div className="skeleton skeleton-price" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="price-display error" id="price-error" role="alert">
        <div className="error-content">
          <div className="error-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="error-title">Price Unavailable</p>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Success State ---
  if (priceData) {
    return (
      <div className="price-display success fade-in-up" id="price-result">
        <div className="price-card">
          {/* Header */}
          <div className="price-header">
            <span className="price-label">Your Regional Price</span>
            <span className="price-region-badge">📍 {priceData.region}</span>
          </div>

          {/* Price */}
          <div className="price-amount-group">
            <span className="price-currency">{priceData.currency}</span>
            <span className="price-amount" id="price-value">{priceData.formatted_price}</span>
          </div>

          {/* Details */}
          <div className="price-details">
            <div className="price-detail-row">
              <span className="detail-label">Product</span>
              <span className="detail-value">{priceData.product_name}</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">Product ID</span>
              <span className="detail-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{priceData.product_id}</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">Variant ID</span>
              <span className="detail-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{priceData.variant_id}</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">ZIP Code</span>
              <span className="detail-value">{priceData.zip_code}</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">Availability</span>
              <span className="detail-value in-stock">● In Stock</span>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="add-to-cart-btn" id="add-to-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Add to Cart — {priceData.formatted_price}
          </button>

          {/* Trust Signals */}
          <div className="trust-signals">
            <span>🔒 Secure Checkout</span>
            <span>🚚 Free Shipping</span>
            <span>↩️ 30-Day Returns</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
