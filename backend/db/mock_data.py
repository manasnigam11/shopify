"""
Mock Database for the Shopify Demo.

Simulates a Shopify store's product catalog and regional pricing rules.
In production, this would query Shopify's Admin API for products and
a pricing database for location-based rules.
"""

# ---------------------------------------------------------------------------
# Product Catalog — Simulates Shopify product/variant data
# ---------------------------------------------------------------------------
PRODUCTS = {
    "prod_pos_terminal_pro": {
        "id": "prod_pos_terminal_pro",
        "variant_id": "var_pos_pro_default",
        "title": "Shopify POS Terminal Pro",
        "handle": "pos-terminal-pro",
        "vendor": "Shopify Hardware",
        "product_type": "Point of Sale Hardware",
    },
}

# ---------------------------------------------------------------------------
# ZIP Code → Regional Pricing Map
# ---------------------------------------------------------------------------
# Each entry maps a US ZIP code to a pricing record for a specific product.
# The product_id links back to the PRODUCTS catalog above.
ZIP_PRICE_MAP = {
    "75028": {
        "price": 1499.00,
        "product_id": "prod_pos_terminal_pro",
        "variant_id": "var_pos_pro_default",
        "region": "Dallas–Fort Worth, TX",
    },
    "10001": {
        "price": 1699.00,
        "product_id": "prod_pos_terminal_pro",
        "variant_id": "var_pos_pro_default",
        "region": "Manhattan, NY",
    },
    "90210": {
        "price": 1799.00,
        "product_id": "prod_pos_terminal_pro",
        "variant_id": "var_pos_pro_default",
        "region": "Beverly Hills, CA",
    },
}

# ---------------------------------------------------------------------------
# Admin Settings
# ---------------------------------------------------------------------------
ADMIN_SETTINGS = {
    "global_markup_percentage": 0.0,
    "fallback_price": 1599.00,
    "active_regions_count": len(ZIP_PRICE_MAP),
}

# ---------------------------------------------------------------------------
# Admin Credentials (hardcoded for demo — use env vars in production)
# ---------------------------------------------------------------------------
ADMIN_PASSWORD = "admin@123"
