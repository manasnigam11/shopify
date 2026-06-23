from typing import Optional
from db.mock_data import ZIP_PRICE_MAP, ADMIN_SETTINGS, PRODUCTS, ADMIN_PASSWORD


def get_pricing_for_zip(zip_code: str, product_id: str = None, variant_id: str = None) -> Optional[dict]:
    """
    Retrieves pricing data for a given ZIP code and product.

    Flow (mirrors the expected Shopify integration):
      1. Look up the ZIP code in the regional pricing map
      2. Optionally validate that the product_id matches
      3. Apply any global markup from admin settings
      4. Return the final price with product context

    Args:
        zip_code:   5-digit US ZIP code
        product_id: Shopify product ID (optional, for validation)
        variant_id: Shopify variant ID (optional, for validation)
    """
    base_data = ZIP_PRICE_MAP.get(zip_code)

    if not base_data:
        return None

    # Use the product_id from the request or fall back to the one in mock data
    resolved_product_id = product_id or base_data["product_id"]
    resolved_variant_id = variant_id or base_data["variant_id"]

    # Look up product details from catalog
    product = PRODUCTS.get(resolved_product_id, {})

    # Apply global markup from admin settings
    markup = ADMIN_SETTINGS.get("global_markup_percentage", 0.0)
    final_price = base_data["price"] * (1 + (markup / 100))

    return {
        "zip_code": zip_code,
        "product_id": resolved_product_id,
        "variant_id": resolved_variant_id,
        "price": final_price,
        "product_name": product.get("title", base_data.get("product_name", "Unknown Product")),
        "region": base_data["region"],
    }


def get_admin_settings() -> dict:
    """Returns current administrative settings."""
    return ADMIN_SETTINGS


def update_admin_settings(updates: dict) -> dict:
    """Updates administrative settings."""
    for key, value in updates.items():
        if value is not None and key in ADMIN_SETTINGS:
            ADMIN_SETTINGS[key] = value
    return ADMIN_SETTINGS


def verify_admin_password(password: str) -> bool:
    """Validates the admin password. In production, use hashed passwords."""
    return password == ADMIN_PASSWORD
