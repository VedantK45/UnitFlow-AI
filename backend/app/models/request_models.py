from typing import Any

from pydantic import BaseModel


class APIRequest(BaseModel):
    url: str
    method: str
    headers: dict[str, str] = {}
    body: dict[str, Any] = {}

    