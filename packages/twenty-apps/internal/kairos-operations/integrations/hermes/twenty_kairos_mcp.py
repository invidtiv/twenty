"""Hermes MCP adapter for the Kairos Operations Twenty application."""

from __future__ import annotations

import json
import os
from typing import Any, Literal
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from mcp.server.fastmcp import FastMCP


mcp = FastMCP("twenty-kairos")

MutationOperation = Literal[
    "upsertPerson",
    "upsertProperty",
    "upsertBooking",
    "upsertBookingContactMethod",
    "setPreferredContact",
    "upsertServiceEvent",
    "upsertSourceRecord",
    "createCommunication",
]


def _required_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"{name} is not configured")
    return value


def _request(path: str, payload: dict[str, Any]) -> dict[str, Any]:
    base_url = _required_env("TWENTY_BASE_URL").rstrip("/")
    api_key = _required_env("TWENTY_API_KEY")
    request = Request(
        f"{base_url}{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=35) as response:
            result = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        detail = error.read(1000).decode("utf-8", errors="replace")
        raise RuntimeError(f"Twenty returned HTTP {error.code}: {detail}") from error
    except URLError as error:
        raise RuntimeError(f"Twenty is unavailable: {error.reason}") from error

    if not isinstance(result, dict):
        raise RuntimeError("Twenty returned an invalid response")
    if result.get("ok") is False or result.get("error"):
        raise RuntimeError(f"Twenty rejected the request: {result.get('error')}")
    return result


def _query(operation: str, **arguments: Any) -> dict[str, Any]:
    return _request(
        "/s/kairos/query",
        {"operation": operation, **arguments},
    )


def _mutate(operation: MutationOperation, input_data: dict[str, Any]) -> dict[str, Any]:
    return _request(
        "/s/kairos/records",
        {"operation": operation, "input": input_data},
    )


@mcp.tool()
def get_tomorrow_checkins(time_zone: str = "Europe/Lisbon") -> dict[str, Any]:
    """Return tomorrow's active check-ins with readiness and contact context."""
    return _query("getTomorrowCheckins", timeZone=time_zone)


@mcp.tool()
def get_incomplete_bookings() -> dict[str, Any]:
    """Return active bookings that need information or human review."""
    return _query("getIncompleteBookings")


@mcp.tool()
def get_preferred_contact(booking_id: str) -> dict[str, Any]:
    """Resolve the provenance-preserving preferred contact for a booking."""
    return _query("getPreferredContact", bookingId=booking_id)


@mcp.tool()
def get_upcoming_events(hours: int = 24) -> dict[str, Any]:
    """Return canonical Service Events occurring in the next number of hours."""
    return _query("getUpcomingEvents", hours=hours)


@mcp.tool()
def get_calendar_events(starts_at: str, ends_at: str) -> dict[str, Any]:
    """Return canonical Service Events in an ISO-8601 time range."""
    return _query("getServiceEvents", startsAt=starts_at, endsAt=ends_at)


@mcp.tool()
def get_recent_emails(limit: int = 25) -> dict[str, Any]:
    """Read recent synced emails with participants and direction metadata."""
    return _query("getRecentEmails", limit=limit)


@mcp.tool()
def get_email_thread(thread_id: str) -> dict[str, Any]:
    """Read all synced messages and participants in one email thread."""
    return _query("getEmailThread", threadId=thread_id)


@mcp.tool()
def upsert_booking(input_data: dict[str, Any]) -> dict[str, Any]:
    """Create or update a booking using source and externalBookingId identity."""
    return _mutate("upsertBooking", input_data)


@mcp.tool()
def upsert_service_event(input_data: dict[str, Any]) -> dict[str, Any]:
    """Create or update a canonical calendar event with a stable source slot."""
    return _mutate("upsertServiceEvent", input_data)


@mcp.tool()
def mutate_record(
    operation: MutationOperation,
    input_data: dict[str, Any],
) -> dict[str, Any]:
    """Run one allow-listed Kairos record mutation."""
    if operation == "createCommunication" and not input_data.get("externalId"):
        raise ValueError("createCommunication requires externalId for idempotency")
    return _mutate(operation, input_data)


if __name__ == "__main__":
    mcp.run(transport="stdio")
