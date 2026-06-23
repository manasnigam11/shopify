# Shopify ZIP Code Pricing API — Backend

A FastAPI-powered microservice that returns location-based product pricing for Shopify storefronts.

## Quick Start

```bash
# 1. Create a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the development server
uvicorn app.main:app --reload --port 8000
```

## API Documentation

Once running, visit:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Endpoints

### `GET /api/price?zip={zip_code}`

Returns regional pricing for a US ZIP code.

| ZIP Code | Price     | Region               |
|----------|-----------|----------------------|
| `75028`  | $1,499.00 | Dallas–Fort Worth, TX |
| `10001`  | $1,699.00 | Manhattan, NY         |
| `90210`  | $1,799.00 | Beverly Hills, CA     |

**Success Response (200):**
```json
{
  "zip_code": "75028",
  "price": 1499.0,
  "formatted_price": "$1,499.00",
  "product_name": "Shopify POS Terminal Pro",
  "currency": "USD",
  "region": "Dallas–Fort Worth, TX"
}
```

**Error Responses:**
- `404` — ZIP code not found in pricing database
- `422` — Invalid ZIP code format (must be 5 digits)

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, router mounting
│   ├── config.py        # CORS origins, app metadata
│   ├── routes/
│   │   └── pricing.py   # /api/price endpoint
│   ├── data/
│   │   └── mock_prices.py  # ZIP → price mapping
│   └── schemas/
│       └── pricing.py   # Pydantic response models
└── requirements.txt
```

## CORS Configuration

CORS is configured in `app/config.py`. For production Shopify integration, add your store domain:

```python
ALLOWED_ORIGINS = [
    "https://your-store.myshopify.com",
]
```
