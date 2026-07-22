from app.supabase_client import supabase


def save_test_run(api_request, generated_tests):

    response = (
        supabase
        .table("test_runs")
        .insert({
            "api_url": api_request.url,
            "method": api_request.method,
            "headers": api_request.headers,
            "request_body": api_request.body,
            "generated_tests": generated_tests,
            "total_tests": len(generated_tests)
        })
        .execute()
    )

    return response.data[0]["run_id"]

def get_history():

    response = (
        supabase
        .table("test_runs")
        .select(
            "run_id, created_at, api_url, method, total_tests, passed, failed, pdf_url"
        )
        .order("created_at", desc=True)
        .execute()
    )

    return response.data

def get_request_details(run_id):

    response = (
        supabase
        .table("test_runs")
        .select("api_url, method, headers, request_body")
        .eq("run_id", run_id)
        .single()
        .execute()
    )

    if response.data is None:
        return None

    return {
        "url": response.data["api_url"],
        "method": response.data["method"],
        "headers": response.data["headers"],
        "body": response.data["request_body"]
    }

def get_generated_tests(run_id):

    response = (
        supabase
        .table("test_runs")
        .select("generated_tests")
        .eq("run_id", run_id)
        .single()
        .execute()
    )

    if response.data is None:
        return None

    return response.data["generated_tests"]

def update_test_run(
    run_id,
    test_results,
    passed,
    failed,
    average_latency,
    ai_summary,
    pdf_path
):

    response = (
        supabase
        .table("test_runs")
        .update({
            "test_results": test_results,
            "passed": passed,
            "failed": failed,
            "average_latency": average_latency,
            "ai_summary": ai_summary,
            "pdf_url": pdf_path
        })
        .eq("run_id", run_id)
        .execute()
    )

    return response.data

def get_run_by_id(run_id):

    response = (
        supabase
        .table("test_runs")
        .select("*")
        .eq("run_id", run_id)
        .single()
        .execute()
    )

    return response.data