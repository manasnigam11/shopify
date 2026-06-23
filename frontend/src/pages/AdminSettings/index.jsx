/**
 * AdminSettings Page — Password-protected dashboard for pricing configuration.
 *
 * Flow:
 *   1. User sees a login form with password input
 *   2. Password is verified against the backend (/api/admin/login)
 *   3. On success, the dashboard loads with settings and pricing preview
 *   4. Password is stored in sessionStorage for the browser tab lifetime
 *
 * Password: admin@123
 */
import { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api';

const BASE_PRICES = [
  { zip: '75028', region: 'Dallas–Fort Worth, TX', base: 1499.00 },
  { zip: '10001', region: 'Manhattan, NY', base: 1699.00 },
  { zip: '90210', region: 'Beverly Hills, CA', base: 1799.00 },
];

export default function AdminSettings() {
  // ── Auth State ──
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Settings State ──
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [markup, setMarkup] = useState('');
  const [fallback, setFallback] = useState('');

  // Check for existing session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_password');
    if (saved) {
      setStoredPassword(saved);
      setIsAuthenticated(true);
    }
  }, []);

  // Load settings after authentication
  useEffect(() => {
    if (isAuthenticated && storedPassword) {
      setLoading(true);
      api.admin.getSettings(storedPassword)
        .then((data) => {
          setSettings(data);
          setMarkup(String(data.global_markup_percentage));
          setFallback(String(data.fallback_price));
        })
        .catch((err) => {
          // Password expired or invalid — force re-login
          if (err.status === 401) {
            handleLogout();
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, storedPassword]);

  // ── Login Handler ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await api.admin.login(password);
      sessionStorage.setItem('admin_password', password);
      setStoredPassword(password);
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError(err.status === 401 ? 'Invalid password. Please try again.' : err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Logout Handler ──
  const handleLogout = () => {
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setStoredPassword('');
    setPassword('');
    setSettings(null);
  };

  // ── Save Handler ──
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveStatus('');
    try {
      const updated = await api.admin.updateSettings(
        { global_markup_percentage: parseFloat(markup), fallback_price: parseFloat(fallback) },
        storedPassword
      );
      setSettings(updated);
      setSaveStatus('✓ Settings saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (e) {
      if (e.status === 401) {
        handleLogout();
        return;
      }
      setSaveStatus('✕ Failed to save: ' + e.message);
    } finally {
      setSaving(false);
    }
  }, [markup, fallback, storedPassword]);

  const currentMarkup = parseFloat(markup) || 0;

  // ══════════════════════════════════════════════════════
  // LOGIN GATE
  // ══════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-2xl)',
          width: '100%',
          maxWidth: '420px',
        }}>
          {/* Lock Icon */}
          <div style={{
            width: '56px',
            height: '56px',
            background: 'rgba(var(--color-primary-rgb), 0.08)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-lg)',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 style={{ textAlign: 'center', fontSize: '1.35rem', fontWeight: 800, marginBottom: 'var(--space-xs)' }}>
            Admin Access
          </h2>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-xl)' }}>
            Enter the admin password to access pricing configuration.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label htmlFor="admin-password" style={{
                display: 'block', fontSize: '0.82rem', fontWeight: 600,
                color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)',
              }}>
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                placeholder="Enter admin password"
                disabled={loginLoading}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '0.92rem',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--text-primary)',
                  background: 'var(--surface-overlay)',
                  border: `1.5px solid ${loginError ? 'var(--color-error)' : 'var(--border-default)'}`,
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                }}
              />
            </div>

            {loginError && (
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--color-error)',
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
              }}>
                ⚠ {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading || !password}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.92rem',
                fontWeight: 700,
                color: 'var(--text-inverse)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: loginLoading || !password ? 'not-allowed' : 'pointer',
                opacity: loginLoading || !password ? 0.55 : 1,
              }}
            >
              {loginLoading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: 'var(--space-lg)',
            opacity: 0.7,
          }}>
            Demo password: admin@123
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // AUTHENTICATED DASHBOARD
  // ══════════════════════════════════════════════════════
  if (loading && !settings) {
    return (
      <div>
        <div className="admin-header">
          <p className="section-label">Admin Dashboard</p>
          <h1>Pricing Configuration</h1>
        </div>
        <div style={{ color: 'var(--text-tertiary)', padding: 'var(--space-xl)' }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="section-label">Admin Dashboard</p>
          <h1>Pricing Configuration</h1>
          <p>Manage global pricing rules and regional markup for the Shopify storefront.</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            background: 'var(--surface-overlay)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          🔒 Sign Out
        </button>
      </div>

      {/* Stats Overview */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-label">Active Regions</div>
          <div className="stat-value">{settings?.active_regions_count ?? '—'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-label">Global Markup</div>
          <div className="stat-value" style={{ color: currentMarkup > 0 ? 'var(--color-warning)' : 'var(--text-primary)' }}>
            {currentMarkup}%
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-label">Fallback Price</div>
          <div className="stat-value">${parseFloat(fallback || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>⚙️ Global Settings</h2>
        </div>
        <div className="admin-card-body">
          <div className="admin-field">
            <label htmlFor="markup-input">Global Markup Percentage (%)</label>
            <input id="markup-input" type="number" value={markup} onChange={(e) => setMarkup(e.target.value)} min="0" max="100" step="0.5" disabled={saving} />
            <p className="field-hint">Applied on top of all base regional prices. Set to 0 for no markup.</p>
          </div>
          <div className="admin-field">
            <label htmlFor="fallback-input">Fallback Price (USD)</label>
            <input id="fallback-input" type="number" value={fallback} onChange={(e) => setFallback(e.target.value)} min="0" step="1" disabled={saving} />
            <p className="field-hint">Price shown when a customer's ZIP code is not in our database.</p>
          </div>
        </div>
        <div className="admin-card-footer">
          {saveStatus ? (
            <span className="admin-status" style={{ color: saveStatus.startsWith('✓') ? 'var(--color-success)' : 'var(--color-error)' }}>
              {saveStatus}
            </span>
          ) : <span />}
          <button className="admin-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Live Pricing Preview */}
      <div className="admin-card" style={{ marginTop: 'var(--space-lg)' }}>
        <div className="admin-card-header">
          <h2>📊 Live Pricing Preview</h2>
          {currentMarkup > 0 && (
            <span className="header-badge" style={{ fontSize: '0.72rem' }}>
              +{currentMarkup}% markup active
            </span>
          )}
        </div>
        <div className="admin-card-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ZIP Code</th>
                <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Region</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Base Price</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {BASE_PRICES.map(({ zip, region, base }) => {
                const final_ = base * (1 + currentMarkup / 100);
                return (
                  <tr key={zip} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.04em' }}>{zip}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>{region}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right', color: 'var(--text-tertiary)' }}>${base.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: currentMarkup > 0 ? 'var(--color-warning)' : 'var(--color-primary)' }}>
                      ${final_.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
