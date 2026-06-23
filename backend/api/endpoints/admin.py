"""
Admin endpoints — password-protected settings management.

All admin routes require the X-Admin-Password header (or login first).
Password for this demo: admin@123
"""
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from schemas.admin import AdminSettingsResponse, AdminSettingsUpdateRequest
from services.pricing_engine import get_admin_settings, update_admin_settings, verify_admin_password

router = APIRouter()


# ── Auth Models ──
class LoginRequest(BaseModel):
    password: str

class LoginResponse(BaseModel):
    authenticated: bool
    message: str


# ── Auth Dependency ──
def require_admin(x_admin_password: str = Header(..., alias="X-Admin-Password")):
    """Validates the admin password sent via request header."""
    if not verify_admin_password(x_admin_password):
        raise HTTPException(status_code=401, detail="Invalid admin password.")


# ── Login Endpoint (no header required) ──
@router.post("/login", response_model=LoginResponse, summary="Authenticate as admin")
async def admin_login(body: LoginRequest):
    """
    Validates the admin password. On success, the frontend stores the
    password and sends it as X-Admin-Password header on subsequent requests.
    """
    if verify_admin_password(body.password):
        return LoginResponse(authenticated=True, message="Login successful.")
    raise HTTPException(status_code=401, detail="Invalid password.")


# ── Protected Settings Endpoints ──
@router.get(
    "/settings",
    response_model=AdminSettingsResponse,
    summary="Get global admin settings",
    dependencies=[],
)
async def get_settings(x_admin_password: str = Header(..., alias="X-Admin-Password")):
    """Retrieves current admin configuration. Requires admin password."""
    require_admin(x_admin_password)
    return get_admin_settings()


@router.patch(
    "/settings",
    response_model=AdminSettingsResponse,
    summary="Update global admin settings",
)
async def update_settings(
    updates: AdminSettingsUpdateRequest,
    x_admin_password: str = Header(..., alias="X-Admin-Password"),
):
    """Updates admin configuration settings. Requires admin password."""
    require_admin(x_admin_password)
    return update_admin_settings(updates.model_dump(exclude_unset=True))
