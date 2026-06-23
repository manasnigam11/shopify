# Shopify ZIP Code-Based Product Pricing Demo

A full-stack demo showing dynamic, location-based product pricing for a Shopify storefront. Enter a US ZIP code and see the regional price for a product — powered by a FastAPI backend and React frontend.

## Architecture

```
┌──────────────────┐       ┌──────────────────────┐
│   React (Vite)   │──────▸│   FastAPI Backend     │
│   Port: 5173     │ /api  │   Port: 8000          │
│                  │◂──────│                       │
│  • ZipCodeForm   │ JSON  │  • /api/price?zip=... │
│  • PriceDisplay  │       │  • CORS middleware     │
│  • ProductCard   │       │  • Pydantic schemas    │
└──────────────────┘       └──────────────────────┘
```

## Quick Start

### 1. Start the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Open the App

Visit **http://localhost:5173** and try these ZIP codes:

| ZIP Code | Price     | Region               |
|----------|-----------|----------------------|
| 75028    | $1,499.00 | Dallas–Fort Worth, TX |
| 10001    | $1,699.00 | Manhattan, NY         |
| 90210    | $1,799.00 | Beverly Hills, CA     |

## Tech Stack

| Layer    | Technology | Why                                    |
|----------|------------|----------------------------------------|
| Backend  | FastAPI    | Fast, typed, auto-generated API docs   |
| Frontend | React      | Component-based UI for Shopify themes  |
| Bundler  | Vite       | Lightning-fast HMR, dev proxy support  |
| Styling  | Vanilla CSS| No build dependencies, full control    |

## API Documentation

With the backend running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Shopify Integration Notes

In a real Shopify deployment, this frontend would be:
1. **Theme App Extension** — Injected as a block in a Shopify product template
2. **Storefront API** — The product data would come from Shopify's Storefront API
3. **Deployed API** — The FastAPI backend would be deployed to a cloud provider (Railway, Render, AWS Lambda) with the Shopify domain added to CORS origins

## License

Built as a technical demonstration.
