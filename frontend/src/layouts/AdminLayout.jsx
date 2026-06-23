/**
 * AdminLayout — Dashboard layout with sidebar navigation.
 * Separate from the storefront layout — admin gets a dedicated side-panel UX.
 */
import { Outlet, NavLink, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.337 3.415a.535.535 0 0 0-.381.056 3.233 3.233 0 0 0-.792.575c-.243.236-.46.507-.643.806-.137-.416-.338-.756-.6-.997a1.89 1.89 0 0 0-.843-.472 2.162 2.162 0 0 0-.955-.06c-.938.14-1.736.81-2.256 1.731-.68 1.204-.953 2.728-.793 4.088l-2.385.74a.734.734 0 0 0-.493.557L3.013 20.97 17.259 23.5l3.728-18.475a.149.149 0 0 0-.171-.182 10.8 10.8 0 0 0-2.152.41c-.19-.752-.514-1.369-.972-1.656a1.282 1.282 0 0 0-.355-.182Z" />
          </svg>
          Admin Panel
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            ⚙️ Pricing Config
          </NavLink>
          <a className="admin-nav-link" href="http://localhost:8000/docs" target="_blank" rel="noreferrer">
            📄 API Docs
          </a>
          <div className="admin-nav-divider" />
          <Link to="/" className="admin-nav-link">
            ← Back to Store
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
