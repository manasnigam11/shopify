/**
 * ProductDetail Page — Shopify product page with ZIP code pricing engine.
 *
 * Matches the expected user flow:
 *   1. Customer opens a Shopify product page
 *   2. Customer enters a destination ZIP code
 *   3. Storefront sends ZIP + product/variant info to the backend
 *   4. Backend applies a pricing rule
 *   5. The calculated price is returned and displayed
 *   6. Customer can enter another ZIP code and see the price update
 */
import { Link } from 'react-router-dom';
import ZipCodeForm from '../../components/pricing/ZipCodeForm';
import PriceDisplay from '../../components/pricing/PriceDisplay';
import { usePricing } from '../../hooks/usePricing';

// Simulated Shopify product data — in production this comes from the Storefront API
const PRODUCT = {
  id: 'prod_pos_terminal_pro',
  variantId: 'var_pos_pro_default',
  title: 'Shopify POS Terminal Pro',
  vendor: 'Shopify Hardware',
  type: 'Point of Sale Hardware',
};

export default function ProductDetail() {
  const { priceData, isLoading, error, fetchPrice, reset } = usePricing();

  // Wrap fetchPrice to always send the product context
  const handlePriceLookup = (zipCode) => {
    fetchPrice(zipCode, PRODUCT.id, PRODUCT.variantId);
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{PRODUCT.title}</span>
      </nav>

      {/* Product Grid */}
      <div className="product-grid">
        {/* ── Left Column: Product Info ── */}
        <div>
          {/* Product Image Card */}
          <div className="product-image-card">
            <span className="product-badge">Shopify Plus</span>
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="product-svg">
              <rect x="45" y="30" width="110" height="140" rx="12" fill="url(#tGrad)" stroke="#5a5a6e" strokeWidth="1.5" />
              <rect x="55" y="42" width="90" height="65" rx="6" fill="#1a1a2e" />
              <rect x="65" y="80" width="12" height="20" rx="2" fill="#95BF47" opacity="0.9" />
              <rect x="82" y="70" width="12" height="30" rx="2" fill="#5CBF47" opacity="0.9" />
              <rect x="99" y="60" width="12" height="40" rx="2" fill="#95BF47" opacity="0.9" />
              <rect x="116" y="65" width="12" height="35" rx="2" fill="#5CBF47" opacity="0.9" />
              <circle cx="68" cy="52" r="2.5" fill="#ff6b6b" />
              <circle cx="78" cy="52" r="2.5" fill="#ffd93d" />
              <circle cx="88" cy="52" r="2.5" fill="#6BCB77" />
              <rect x="65" y="118" width="70" height="8" rx="4" fill="#3a3a4e" />
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => (
                  <circle key={`${row}-${col}`} cx={78 + col * 22} cy={138 + row * 14} r="4.5" fill="#4a4a5e" stroke="#5a5a6e" strokeWidth="0.5" />
                ))
              )}
              <defs>
                <linearGradient id="tGrad" x1="45" y1="30" x2="155" y2="170">
                  <stop offset="0%" stopColor="#2d2d3f" />
                  <stop offset="100%" stopColor="#1a1a28" />
                </linearGradient>
              </defs>
            </svg>
            <div className="gallery-dots">
              <span className="gallery-dot active" />
              <span className="gallery-dot" />
              <span className="gallery-dot" />
              <span className="gallery-dot" />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info" style={{ marginTop: 'var(--space-xl)' }}>
            <p className="product-category">{PRODUCT.type}</p>
            <h1 className="product-title" id="product-title">{PRODUCT.title}</h1>

            {/* Star Rating */}
            <div className="product-rating" aria-label="4.8 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`star ${star <= 4 ? 'filled' : 'half'}`} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="rating-text">4.8 (2,847 reviews)</span>
            </div>

            <p className="product-description">
              Enterprise-grade point-of-sale terminal with integrated payment processing,
              inventory management, and real-time analytics. Built for high-volume retail
              environments with <strong>regional pricing</strong> based on your location.
            </p>

            {/* Shopify Product Identifiers */}
            <div style={{
              background: 'var(--surface-overlay)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-md)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Product ID</span>
                <span style={{ color: 'var(--text-secondary)' }}>{PRODUCT.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Variant ID</span>
                <span style={{ color: 'var(--text-secondary)' }}>{PRODUCT.variantId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Vendor</span>
                <span style={{ color: 'var(--text-secondary)' }}>{PRODUCT.vendor}</span>
              </div>
            </div>

            {/* Feature highlights */}
            <ul className="product-features">
              <li className="product-feature-item"><span>⚡</span> Contactless & chip payments</li>
              <li className="product-feature-item"><span>📊</span> Real-time analytics dashboard</li>
              <li className="product-feature-item"><span>🔒</span> PCI DSS Level 1 compliant</li>
              <li className="product-feature-item"><span>🌐</span> Regional pricing by ZIP code</li>
            </ul>
          </div>
        </div>

        {/* ── Right Column: Pricing Engine ── */}
        <div className="pricing-column">
          <ZipCodeForm onSubmit={handlePriceLookup} isLoading={isLoading} onReset={reset} />
          <PriceDisplay priceData={priceData} isLoading={isLoading} error={error} />
        </div>
      </div>
    </>
  );
}
