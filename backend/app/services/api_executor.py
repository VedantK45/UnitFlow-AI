import time
import httpx


def execute_test_case(url, method, headers, payload):
    """
    Executes a single API request.
    Returns status code, latency and response.
    """

    start = time.perf_counter()

    try:

        response = httpx.request(
            method=method,
            url=url,
            headers=headers,
            json=payload,
            timeout=10
        )

        latency = round((time.perf_counter() - start) * 1000, 2)

        try:
            response_body = response.json()
        except Exception:
            response_body = response.text

        return {
            "status_code": response.status_code,
            "latency_ms": latency,
            "response": response_body,
            "success": True
        }

    except Exception as e:

        latency = round((time.perf_counter() - start) * 1000, 2)

        return {
            "status_code": None,
            "latency_ms": latency,
            "response": str(e),
            "success": False
        }