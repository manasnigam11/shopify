/**
 * Format a number into a currency string (e.g., $1,499.00)
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount == null || isNaN(amount)) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};
