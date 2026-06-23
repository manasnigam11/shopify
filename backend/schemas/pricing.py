from pydantic import BaseModel, Field

class PriceResponse(BaseModel):
    """Successful pricing lookup response."""
    zip_code: str = Field(..., description="The queried 5-digit US ZIP code", examples=["75028"])
    product_id: str = Field(..., description="Shopify product ID used for the lookup", examples=["prod_pos_terminal_pro"])
    variant_id: str = Field(..., description="Shopify variant ID", examples=["var_pos_pro_default"])
    price: float = Field(..., description="Raw numeric price in USD", examples=[1499.00])
    formatted_price: str = Field(..., description="Human-readable formatted price string", examples=["$1,499.00"])
    product_name: str = Field(..., description="Name of the product this price applies to")
    currency: str = Field(default="USD", description="ISO 4217 currency code")
    region: str = Field(..., description="Human-readable region label for the ZIP code")

class ErrorResponse(BaseModel):
    """Standardized error response."""
    detail: str = Field(..., description="Human-readable error message")
    code: str = Field(..., description="Machine-readable error code")
