import copy


def generate_test_cases(body: dict):
    """
    Generate rule-based test cases from a JSON body.
    Currently supports string and integer fields.
    """

    test_cases = []

    # Original payload
    test_cases.append({
        "name": "Original Payload",
        "mutation": "NONE",
        "payload": body
    })

    for key, value in body.items():

        # ----------------------------
        # STRING MUTATIONS
        # ----------------------------
        if isinstance(value, str):

            # Empty String
            temp = copy.deepcopy(body)
            temp[key] = ""

            test_cases.append({
                "name": f"Empty {key}",
                "mutation": "EMPTY_STRING",
                "payload": temp
            })

            # Null
            temp = copy.deepcopy(body)
            temp[key] = None

            test_cases.append({
                "name": f"Null {key}",
                "mutation": "NULL",
                "payload": temp
            })

            # Long String
            temp = copy.deepcopy(body)
            temp[key] = "A" * 500

            test_cases.append({
                "name": f"Long {key}",
                "mutation": "LONG_STRING",
                "payload": temp
            })

        # ----------------------------
        # INTEGER MUTATIONS
        # ----------------------------
        elif isinstance(value, int):

            # Negative
            temp = copy.deepcopy(body)
            temp[key] = -1

            test_cases.append({
                "name": f"Negative {key}",
                "mutation": "NEGATIVE_NUMBER",
                "payload": temp
            })

            # Zero
            temp = copy.deepcopy(body)
            temp[key] = 0

            test_cases.append({
                "name": f"Zero {key}",
                "mutation": "ZERO",
                "payload": temp
            })

            # Large Number
            temp = copy.deepcopy(body)
            temp[key] = 999999999

            test_cases.append({
                "name": f"Large {key}",
                "mutation": "LARGE_NUMBER",
                "payload": temp
            })

    return test_cases