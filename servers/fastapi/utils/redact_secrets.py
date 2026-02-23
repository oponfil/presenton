"""
Never log or print API keys, tokens, or secrets.
Use redact_secret() for any value that might be sensitive.
"""

import re


def redact_secret(value: str | None) -> str:
    """Return a safe string for logging: masks secrets, keeps None/empty as is."""
    if value is None or value == "":
        return "<not set>"
    s = str(value).strip()
    if not s:
        return "<empty>"
    # Keys/tokens often start with sk-, sk-proj-, etc. or are long alphanumeric
    if re.match(r"^sk-[a-zA-Z0-9_-]{20,}", s) or len(s) > 24:
        return f"{s[:8]}...{s[-4:] if len(s) > 12 else '***'}"
    return "***"
