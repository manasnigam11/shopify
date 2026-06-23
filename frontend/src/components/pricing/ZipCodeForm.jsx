/**
 * ZipCodeForm — ZIP code input with validation and quick-fill demo buttons.
 *
 * Features:
 *   - Client-side 5-digit validation
 *   - Numeric-only filtering
 *   - Quick-fill buttons for instant demo testing
 *   - Disabled state during loading
 *   - Proper ARIA attributes for accessibility
 */
import { useState } from 'react';

const SAMPLE_ZIPS = [
  { code: '75028', label: 'TX', region: 'Dallas' },
  { code: '10001', label: 'NY', region: 'Manhattan' },
  { code: '90210', label: 'CA', region: 'Beverly Hills' },
];

export default function ZipCodeForm({ onSubmit, isLoading, onReset }) {
  const [zipCode, setZipCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!/^\d{5}$/.test(zipCode)) {
      setValidationError('Please enter a valid 5-digit US ZIP code.');
      return;
    }
    onSubmit(zipCode);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
    if (validationError) setValidationError('');
  };

  const handleQuickFill = (code) => {
    setZipCode(code);
    setValidationError('');
    onSubmit(code);
  };

  const handleClear = () => {
    setZipCode('');
    setValidationError('');
    onReset();
  };

  return (
    <div className="zip-form-container" id="zip-form-container">
      <h2 className="zip-form-title">
        <span>📍</span>
        Check Your Regional Price
      </h2>
      <p className="zip-form-subtitle">
        Enter your ZIP code to see location-based pricing for your area.
      </p>

      <form onSubmit={handleSubmit} id="zip-code-form">
        <div className="zip-input-group">
          <input
            type="text"
            id="zip-code-input"
            className={`zip-input ${validationError ? 'input-error' : ''}`}
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={5}
            inputMode="numeric"
            autoComplete="postal-code"
            aria-label="ZIP code"
            aria-describedby="zip-validation-error"
          />
          <button
            type="submit"
            className="zip-submit-btn"
            disabled={isLoading || zipCode.length === 0}
            id="check-price-button"
          >
            {isLoading ? (
              <span className="btn-loading-inner">
                <span className="spinner-inline" />
                Checking...
              </span>
            ) : (
              'Check Price'
            )}
          </button>
        </div>

        {validationError && (
          <p className="validation-error" id="zip-validation-error" role="alert">
            {validationError}
          </p>
        )}
      </form>

      {/* Quick-fill buttons */}
      <div className="quick-fill">
        <span className="quick-fill-label">Try a sample:</span>
        <div className="quick-fill-buttons">
          {SAMPLE_ZIPS.map(({ code, label, region }) => (
            <button
              key={code}
              type="button"
              className="quick-fill-btn"
              onClick={() => handleQuickFill(code)}
              disabled={isLoading}
              title={`${region}, ${label}`}
            >
              {code}
              <span className="quick-fill-state">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {zipCode && (
        <button type="button" className="clear-btn" onClick={handleClear} disabled={isLoading}>
          ✕ Clear & Reset
        </button>
      )}
    </div>
  );
}
