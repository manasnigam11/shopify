from fastapi import FastAPI
from core.config import settings
from core.security import setup_cors
from api.router import api_router

def create_app() -> FastAPI:
    """Application factory for FastAPI."""
    app = FastAPI(
        title=settings.APP_TITLE,
        description=settings.APP_DESCRIPTION,
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Initialize Security / CORS
    setup_cors(app)

    # Include all API routes
    app.include_router(api_router, prefix="/api")

    @app.get("/", tags=["Health"])
    async def health_check():
        return {
            "status": "healthy",
            "service": settings.APP_TITLE,
            "version": settings.APP_VERSION
        }

    return app

app = create_app()
