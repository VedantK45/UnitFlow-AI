import os
import json

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_results(results):
    """
    Uses Groq LLM to analyze API test execution results.
    """

    total_tests = len(results)

    passed = sum(1 for r in results if r["pass"])
    failed = total_tests - passed

    average_latency = round(
        sum(r["latency_ms"] for r in results) / total_tests,
        2
    ) if total_tests else 0

    status_distribution = {}

    for r in results:

        code = str(r["status_code"])

        status_distribution[code] = (
            status_distribution.get(code, 0) + 1
        )

    failure_reasons = {}

    for r in results:

        if not r["pass"]:

            reason = r["reason"]

            failure_reasons[reason] = (
                failure_reasons.get(reason, 0) + 1
            )

    summary = {

        "total_tests": total_tests,

        "passed": passed,

        "failed": failed,

        "average_latency_ms": average_latency,

        "status_distribution": status_distribution,

        "failure_reasons": failure_reasons

    }

    prompt = f"""
You are a Senior API Testing Engineer.

Analyze the following API testing report.

{json.dumps(summary, indent=2)}

Generate a professional report with exactly these sections:

1. Executive Summary

2. Root Cause Analysis

3. API Health Assessment

4. Recommendations

Keep the response under 250 words.
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content": "You are an expert API testing assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,

            max_tokens=400

        )

        ai_report = response.choices[0].message.content

    except Exception as e:

        ai_report = f"AI Analysis Failed: {str(e)}"

    return {

        "summary": summary,

        "ai_report": ai_report

    }