import os

class Settings:
    APP_TITLE = "Shopify ZIP Code Pricing API (V2)"
    APP_DESCRIPTION = "Scalable multi-page architecture for location-based pricing."
    APP_VERSION = "2.0.0"

    # Default allowed origins for CORS. In production, this would use env vars.
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]

settings = Settings()
