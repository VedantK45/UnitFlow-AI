import os

from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.enums import TA_CENTER


def generate_pdf(results, analysis):

    os.makedirs("reports", exist_ok=True)

    filename = f"reports/unitflow_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    title_style.alignment = TA_CENTER

    story = []

    story.append(Paragraph("UnitFlow AI", title_style))
    story.append(Paragraph("AI Powered API Testing Report", styles["Heading2"]))
    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Generated On:</b> {datetime.now()}",
            styles["BodyText"],
        )
    )

    story.append(Spacer(1, 20))

    summary = analysis["summary"]

    story.append(Paragraph("<b>SUMMARY</b>", styles["Heading2"]))

    story.append(
        Paragraph(
            f"Total Tests : {summary['total_tests']}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"Passed : {summary['passed']}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"Failed : {summary['failed']}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"Average Latency : {summary['average_latency_ms']} ms",
            styles["BodyText"],
        )
    )

    story.append(Spacer(1, 20))

    story.append(Paragraph("<b>AI ANALYSIS</b>", styles["Heading2"]))

    ai_text = analysis["ai_report"].replace("\n", "<br/>")

    story.append(
        Paragraph(ai_text, styles["BodyText"])
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph("<b>TEST RESULTS</b>", styles["Heading2"])
    )

    for test in results:

        status = "PASS ✅" if test["pass"] else "FAIL ❌"

        story.append(
            Paragraph(
                f"""
                <b>{test['test_name']}</b><br/>
                Mutation : {test['mutation']}<br/>
                Status Code : {test['status_code']}<br/>
                Latency : {test['latency_ms']} ms<br/>
                Result : {status}<br/>
                Reason : {test['reason']}
                """,
                styles["BodyText"],
            )
        )

        story.append(Spacer(1, 12))

    doc.build(story)

    print("PDF saved at:", os.path.abspath(filename))

    return os.path.abspath(filename)