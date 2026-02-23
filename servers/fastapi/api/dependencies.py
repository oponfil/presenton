"""
Optional API key authentication for the Presenton API.

When PRESENTON_API_KEY is set, all requests to protected routes must include
either the header X-API-Key, Authorization: Bearer <key>, or query param api_key.
When PRESENTON_API_KEY is not set, no authentication is required.

Query param api_key is supported for EventSource/SSE, which cannot send headers.
"""

from fastapi import Header, HTTPException, Request

from utils.get_env import get_presenton_api_key_env


async def verify_api_key(
    request: Request,
    x_api_key: str | None = Header(None, alias="X-API-Key"),
    authorization: str | None = Header(None),
) -> None:
    expected = get_presenton_api_key_env()
    if not expected:
        return

    token = x_api_key
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization[7:].strip()
    if not token:
        token = request.query_params.get("api_key")

    if not token or token != expected:
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing API key. Use X-API-Key header or Authorization: Bearer <key>.",
        )
