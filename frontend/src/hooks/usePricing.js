import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

/**
 * usePricing — Custom hook for ZIP code pricing lookup.
 *
 * Now sends product_id and variant_id alongside the ZIP code,
 * matching the expected Shopify integration flow:
 *   Storefront → { zip, product_id, variant_id } → Backend → Price
 */
export function usePricing() {
  const { setActiveZip } = useAppContext();
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrice = useCallback(async (
    zipCode,
    productId = 'prod_pos_terminal_pro',
    variantId = 'var_pos_pro_default'
  ) => {
    setIsLoading(true);
    setError(null);
    setPriceData(null);
    setActiveZip(zipCode);

    try {
      const data = await api.pricing.getByZip(zipCode, productId, variantId);
      setPriceData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setActiveZip]);

  const reset = useCallback(() => {
    setPriceData(null);
    setIsLoading(false);
    setError(null);
    setActiveZip('');
  }, [setActiveZip]);

  return { priceData, isLoading, error, fetchPrice, reset };
}
