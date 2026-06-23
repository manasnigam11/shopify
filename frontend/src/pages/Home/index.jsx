/**
 * Home Page — Landing page with hero section, ZIP showcase,
 * features grid, and stats bar.
 */
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: '📍',
    title: 'ZIP Code Pricing',
    description: 'Dynamic regional pricing that adjusts product costs based on customer location. Enter any supported ZIP to see real-time results.',
  },
  {
    icon: '⚡',
    title: 'FastAPI Backend',
    description: 'Blazing-fast Python API with automatic Swagger docs, Pydantic validation, and CORS configured for Shopify storefronts.',
  },
  {
    icon: '🎨',
    title: 'React Frontend',
    description: 'Modern component architecture with custom hooks, context state management, and multi-page routing via React Router.',
  },
  {
    icon: '🔒',
    title: 'Production CORS',
    description: 'Cross-origin resource sharing properly configured for Shopify theme integration. Whitelisted origins for storefront security.',
  },
  {
    icon: '📊',
    title: 'Admin Dashboard',
    description: 'Internal settings panel to manage global pricing markup, view active regions, and configure fallback pricing rules.',
  },
  {
    icon: '🏗️',
    title: 'Scalable Architecture',
    description: 'Clean separation of concerns — routes, services, schemas, and data layers. Ready to swap mock data for a real database.',
  },
];

const ZIPS = [
  { code: '75028', price: '$1,499', region: 'Dallas, TX' },
  { code: '10001', price: '$1,699', region: 'Manhattan, NY' },
  { code: '90210', price: '$1,799', region: 'Beverly Hills, CA' },
];

export default function Home() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="home-hero">
        <div className="hero-badge">
          <span>🚀</span>
          Technical Demo — Shopify Integration
        </div>

        <h1>
          Location-Based Pricing
          <br />
          for <span className="gradient-text">Shopify Stores</span>
        </h1>

        <p>
          A full-stack demonstration of dynamic product pricing powered by ZIP code
          geolocation. Built with FastAPI and React for enterprise Shopify deployments.
        </p>

        <div className="hero-cta-group">
          <Link to="/product" className="btn-primary">
            Try the Demo →
          </Link>
          <Link to="/admin" className="btn-secondary">
            Open Admin Panel
          </Link>
        </div>

        {/* ZIP Showcase */}
        <div className="zip-showcase">
          {ZIPS.map(({ code, price, region }) => (
            <Link to="/product" key={code} className="zip-showcase-item" style={{ textDecoration: 'none' }}>
              <span className="zip-code">{code}</span>
              <span className="zip-price">{price}</span>
              <span className="zip-region">{region}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">3</div>
          <div className="stat-label">Regions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">&lt;50ms</div>
          <div className="stat-label">API Latency</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">2</div>
          <div className="stat-label">Microservices</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">100%</div>
          <div className="stat-label">Type-Safe</div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="features-section">
        <div className="features-section-header">
          <p className="section-label">Architecture Highlights</p>
          <h2 className="section-title">Built for Scale</h2>
        </div>

        <div className="features-grid">
          {FEATURES.map(({ icon, title, description }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
