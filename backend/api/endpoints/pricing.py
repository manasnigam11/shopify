"""
Pricing endpoint — /api/storefront/price

Accepts a ZIP code, product ID, and variant ID from the Shopify storefront.
Returns the regional price for the given product at the customer's location.

Integration note for Shopify storefronts:
    The storefront theme sends:
    GET /api/storefront/price?zip=75028&product_id=prod_pos_terminal_pro&variant_id=var_pos_pro_default
"""
import re

from fastapi import APIRouter, HTTPException, Query
from schemas.pricing import PriceResponse, ErrorResponse
from services.pricing_engine import get_pricing_for_zip

router = APIRouter()

ZIP_CODE_PATTERN = re.compile(r"^\d{5}$")


@router.get(
    "/price",
    response_model=PriceResponse,
    responses={
        404: {"model": ErrorResponse, "description": "ZIP code not found"},
        422: {"model": ErrorResponse, "description": "Invalid ZIP format"},
    },
    summary="Get product price by ZIP code",
    description=(
        "Returns the regional price for a product based on the customer's "
        "US ZIP code. The Shopify storefront sends the product/variant ID "
        "along with the destination ZIP code, and the backend applies "
        "pricing rules and returns the calculated price."
    ),
)
async def get_price(
    zip: str = Query(
        ...,
        description="A 5-digit US ZIP code (destination)",
        examples=["75028", "10001", "90210"],
        min_length=5,
        max_length=5,
    ),
    product_id: str = Query(
        default="prod_pos_terminal_pro",
        description="Shopify product ID",
        examples=["prod_pos_terminal_pro"],
    ),
    variant_id: str = Query(
        default="var_pos_pro_default",
        description="Shopify variant ID",
        examples=["var_pos_pro_default"],
    ),
):
    """
    Pricing lookup flow (matches the expected Shopify user flow):
      1. Customer enters a destination ZIP code on the product page
      2. Storefront sends ZIP + product/variant info to this endpoint
      3. Backend applies regional pricing rules
      4. Calculated price is returned and displayed on the product page
    """

    # Step 1: Validate ZIP format
    if not ZIP_CODE_PATTERN.match(zip):
        raise HTTPException(
            status_code=422,
            detail={
                "detail": f"'{zip}' is not a valid US ZIP code. Please enter exactly 5 digits.",
                "code": "INVALID_ZIP_FORMAT",
            },
        )

    # Step 2: Look up pricing via the pricing engine
    price_data = get_pricing_for_zip(zip, product_id=product_id, variant_id=variant_id)

    if price_data is None:
        raise HTTPException(
            status_code=404,
            detail={
                "detail": (
                    f"Pricing is not yet available for ZIP code {zip}. "
                    "Try one of our supported regions: 75028 (TX), 10001 (NY), or 90210 (CA)."
                ),
                "code": "ZIP_NOT_FOUND",
            },
        )

    # Step 3: Return the calculated price
    return PriceResponse(
        zip_code=zip,
        product_id=price_data["product_id"],
        variant_id=price_data["variant_id"],
        price=price_data["price"],
        formatted_price=f"${price_data['price']:,.2f}",
        product_name=price_data["product_name"],
        currency="USD",
        region=price_data["region"],
    )
