from pydantic import BaseModel, Field

class AdminSettingsResponse(BaseModel):
    global_markup_percentage: float = Field(..., description="Global percentage increase on all prices")
    fallback_price: float = Field(..., description="Price applied when ZIP is unknown")
    active_regions_count: int = Field(..., description="Total active ZIP regions configured")

class AdminSettingsUpdateRequest(BaseModel):
    global_markup_percentage: float | None = Field(None, ge=0.0, le=100.0)
    fallback_price: float | None = Field(None, ge=0.0)
