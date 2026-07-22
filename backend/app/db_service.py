import json
from app.database import get_connection


def save_test_run(api_request, generated_tests):
    """
    Save a newly generated test run to the database.
    Returns the generated run_id.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO test_runs (
            api_url,
            method,
            headers,
            request_body,
            generated_tests,
            total_tests
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        api_request.url,
        api_request.method,
        json.dumps(api_request.headers),
        json.dumps(api_request.body),
        json.dumps(generated_tests),
        len(generated_tests)
    ))

    conn.commit()

    run_id = cursor.lastrowid

    conn.close()

    return run_id

def get_history():
    """
    Returns all previous test runs ordered by newest first.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            run_id,
            created_at,
            api_url,
            method,
            total_tests,
            passed,
            failed,
                   pdf_path      
        FROM test_runs
        ORDER BY run_id DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    history = [dict(row) for row in rows]

    return history

def get_run_by_id(run_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM test_runs
        WHERE run_id = ?
    """, (run_id,))

    row = cursor.fetchone()

    conn.close()

    if row is None:
        return None

    run = dict(row)

    # Convert JSON strings back to Python objects
    run["headers"] = json.loads(run["headers"])
    run["request_body"] = json.loads(run["request_body"])
    run["generated_tests"] = json.loads(run["generated_tests"])

    if run["test_results"]:
        run["test_results"] = json.loads(run["test_results"])

    return run


def update_test_run(
    run_id,
    test_results,
    passed,
    failed,
    average_latency,
    ai_summary,
    pdf_path
):
    """
    Updates a test run after execution.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE test_runs
        SET
            test_results = ?,
            passed = ?,
            failed = ?,
            average_latency = ?,
            ai_summary = ?,
            pdf_path = ?
        WHERE run_id = ?
    """, (
        json.dumps(test_results),
        passed,
        failed,
        average_latency,
        ai_summary,
        pdf_path,
        run_id
    ))

    conn.commit()
    conn.close()

def get_generated_tests(run_id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT generated_tests
        FROM test_runs
        WHERE run_id = ?
    """, (run_id,))

    row = cursor.fetchone()

    conn.close()

    if row is None:
        return None

    return json.loads(row["generated_tests"])    

def get_request_details(run_id):

    import json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT api_url, method, headers
        FROM test_runs
        WHERE run_id = ?
    """, (run_id,))

    row = cursor.fetchone()

    conn.close()

    if row is None:
        return None

    return {
        "url": row["api_url"],
        "method": row["method"],
        "headers": json.loads(row["headers"])
    }