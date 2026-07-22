"""
Validator for UnitFlow AI

This module compares the expected HTTP status code(s)
with the actual API response and determines whether
the test passed or failed.
"""


EXPECTED_STATUS = {

    "NONE": [200, 201],

    "EMPTY_STRING": [400, 422],

    "NULL": [400, 422],

    "LONG_STRING": [400, 413, 422],

    "NEGATIVE_NUMBER": [400, 422],

    "ZERO": [200, 201, 400, 422],

    "LARGE_NUMBER": [400, 413, 422]
}


def validate_test(mutation, status_code):
    """
    Validate a single test case.

    Parameters
    ----------
    mutation : str
        Mutation type.

    status_code : int
        HTTP status returned by API.

    Returns
    -------
    dict
    """

    expected = EXPECTED_STATUS.get(mutation, [])
    if status_code is None:
        return {
            "pass": False,
            "expected_status": expected,
            "actual_status": None,
            "reason": "Request could not be executed."
        }

    passed = status_code in expected

    reason = ""

    if passed:

        reason = "Response matched expected status."

    else:

        if status_code == 401:

            reason = "Authentication failed before payload validation."

        elif status_code == 403:

            reason = "Access forbidden."

        elif status_code == 404:

            reason = "Endpoint not found."

        elif status_code >= 500:

            reason = "Server error."

        else:

            reason = "Unexpected status code."

    return {

        "pass": passed,

        "expected_status": expected,

        "actual_status": status_code,

        "reason": reason

    }