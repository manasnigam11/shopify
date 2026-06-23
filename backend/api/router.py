from fastapi import APIRouter
from api.endpoints import pricing, admin

api_router = APIRouter()
api_router.include_router(pricing.router, prefix="/storefront", tags=["Pricing"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Settings"])
