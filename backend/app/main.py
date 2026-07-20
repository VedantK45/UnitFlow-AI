import os

print("Current Working Directory:", os.getcwd())

from fastapi import FastAPI, HTTPException
from app.models.request_models import APIRequest
from app.services.test_generator import generate_test_cases
from app.services.api_executor import execute_test_case
from app.services.validator import validate_test
from app.services.ai_analyzer import analyze_results
from app.services.pdf_generator import generate_pdf
from app.db_service import save_test_run, get_history,get_run_by_id,get_generated_tests,get_request_details,update_test_run
# Create the FastAPI application
app = FastAPI(
    title="UnitFlow AI",
    description="AI-Powered API Testing Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to UnitFlow AI 🚀",
        "status": "Backend is running successfully"
    }

@app.post("/generate-tests")
def generate_tests(api_request: APIRequest):

    generated_tests = generate_test_cases(api_request.body)

    run_id = save_test_run(api_request, generated_tests)

    return {
        "run_id": run_id,
        "generated_tests": generated_tests
    }

@app.post("/run-tests/{run_id}")
def run_tests(run_id: int):

    request = get_request_details(run_id)
    test_cases = get_generated_tests(run_id)
    if request is None or test_cases is None:
        raise HTTPException(
            status_code=404,
            detail="Test run not found"
    )

    results = []

    for test in test_cases:

        result = execute_test_case(

            url=request["url"],
            method=request["method"],
            headers=request["headers"],
            payload=test["payload"]
        )

        validation = validate_test(
        test["mutation"],
        result["status_code"]
        )

        results.append({
            "test_name": test["name"],
            "mutation": test["mutation"],
            **result,
            **validation
        })

    passed = sum(1 for r in results if r["pass"])

    failed = len(results) - passed

    average_latency = (
    sum(r["latency_ms"] for r in results) / len(results)
    if results else 0
    )



    analysis = analyze_results(results)

    pdf_path = generate_pdf(
    results,
    analysis
    )

    update_test_run(
    run_id=run_id,
    test_results=results,
    passed=passed,
    failed=failed,
    average_latency=average_latency,
    ai_summary=analysis["ai_report"],
    pdf_path=pdf_path
    )

    return {
        "total_tests": len(results),
        "results": results,
        "analysis": analysis,
        "pdf_report": pdf_path
    }

@app.get("/history")
def history():

    return get_history()

@app.get("/history/{run_id}")
def history_by_id(run_id: int):

    run = get_run_by_id(run_id)

    if run is None:
        raise HTTPException(
            status_code=404,
            detail="Test run not found"
        )

    return run