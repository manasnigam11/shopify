/**
 * Header — Site-wide navigation bar.
 * Uses React Router NavLink for automatic active styling.
 */
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand */}
        <Link to="/" className="header-logo" aria-label="ShopifyPOS Home">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.337 3.415a.535.535 0 0 0-.381.056 3.233 3.233 0 0 0-.792.575c-.243.236-.46.507-.643.806-.137-.416-.338-.756-.6-.997a1.89 1.89 0 0 0-.843-.472 2.162 2.162 0 0 0-.955-.06c-.938.14-1.736.81-2.256 1.731-.68 1.204-.953 2.728-.793 4.088l-2.385.74a.734.734 0 0 0-.493.557L3.013 20.97 17.259 23.5l3.728-18.475a.149.149 0 0 0-.171-.182 10.8 10.8 0 0 0-2.152.41c-.19-.752-.514-1.369-.972-1.656a1.282 1.282 0 0 0-.355-.182Z" />
          </svg>
          ShopifyPOS
        </Link>

        {/* Navigation */}
        <nav className="header-nav" aria-label="Main">
          <NavLink to="/" end className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/product" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            Product
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            Admin
          </NavLink>
        </nav>

        {/* Status Badge */}
        <div className="header-actions">
          <div className="header-badge">
            <span className="header-badge-dot" />
            API Connected
          </div>
        </div>
      </div>
    </header>
  );
}
