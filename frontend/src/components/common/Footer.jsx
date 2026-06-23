/**
 * Footer — Site-wide footer with brand, links, and tech stack credits.
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="header-logo" style={{ marginBottom: '0.5rem' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{ color: 'var(--color-primary)' }}>
              <path d="M15.337 3.415a.535.535 0 0 0-.381.056 3.233 3.233 0 0 0-.792.575c-.243.236-.46.507-.643.806-.137-.416-.338-.756-.6-.997a1.89 1.89 0 0 0-.843-.472 2.162 2.162 0 0 0-.955-.06c-.938.14-1.736.81-2.256 1.731-.68 1.204-.953 2.728-.793 4.088l-2.385.74a.734.734 0 0 0-.493.557L3.013 20.97 17.259 23.5l3.728-18.475a.149.149 0 0 0-.171-.182 10.8 10.8 0 0 0-2.152.41c-.19-.752-.514-1.369-.972-1.656a1.282 1.282 0 0 0-.355-.182Z" />
            </svg>
            ShopifyPOS
          </Link>
          <p>Enterprise-grade ZIP code pricing engine for Shopify storefronts. Built as a technical demonstration.</p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Product</h4>
          <Link to="/product">POS Terminal Pro</Link>
          <Link to="/product">Regional Pricing</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </div>

        <div className="footer-col">
          <h4>Tech Stack</h4>
          <a href="https://fastapi.tiangolo.com" target="_blank" rel="noreferrer">FastAPI</a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">React 19</a>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">Vite</a>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">API Docs</a>
          <a href="http://localhost:8000/redoc" target="_blank" rel="noreferrer">ReDoc</a>
          <Link to="/">About</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopifyPOS Demo</p>
        <p>Built with <span>FastAPI</span> + <span>React</span></p>
      </div>
    </footer>
  );
}
