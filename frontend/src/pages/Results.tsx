import Layout from "../components/layout/Layout";
import { useLocation } from "react-router-dom";
import type { RunTestsResponse } from "../types/api";

export default function Results() {
    const location = useLocation();
    const data = location.state as RunTestsResponse | undefined;
    const currentTime = new Date().toLocaleString();

    if (!data) {
        return (
            <Layout>
                <h2>No Results Found</h2>
            </Layout>
        );
    }

    const passRate = Math.round(
        (data.passed / data.total_tests) * 100
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">

                    <h1 className="text-3xl font-bold">
                        Test Results
                    </h1>

                    <div className="text-right text-sm text-slate-400">
                        <p>Executed</p>
                        <p>{currentTime}</p>
                    </div>

                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    <div className="bg-slate-900 rounded-xl p-5 shadow">
                        <h3 className="text-slate-400 text-sm mb-2">
                            📊 Total Tests
                        </h3>

                        <p className="text-3xl font-bold">
                            {data.total_tests}
                        </p>
                    </div>

                    <div className="bg-green-900 rounded-xl p-5 shadow">
                        <h3 className="text-green-100 text-sm mb-2">
                            ✅ Passed
                        </h3>

                        <p className="text-3xl font-bold">
                            {data.passed}
                        </p>

                        <p className="text-sm mt-2 text-green-200">
                            {passRate}% Success Rate
                        </p>
                    </div>

                    <div className="bg-red-900 rounded-xl p-5 shadow">
                        <h3 className="text-red-100 text-sm mb-2">
                            ❌ Failed
                        </h3>

                        <p className="text-3xl font-bold">
                            {data.failed}
                        </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-5 shadow">
                        <h3 className="text-slate-300 text-sm mb-2">
                            ⚡ Avg Latency
                        </h3>

                        <p className="text-3xl font-bold">
                            {Math.round(data.average_latency)} ms
                        </p>
                    </div>

                </div>

                {/* Test Results */}
                <h2 className="text-2xl font-bold mb-6">
                    Test Execution Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {data.results.map((test, index) => (

                        <div
                            key={index}
                            className={`rounded-xl p-5 shadow-lg border border-slate-700 ${
                                test.pass
                                    ? "border-l-4 border-l-green-500"
                                    : "border-l-4 border-l-red-500"
                            }`}
                        >

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="text-lg font-semibold">
                                    {test.pass ? "✅" : "❌"} {test.test_name}
                                </h3>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        test.pass
                                            ? "bg-green-900 text-green-300"
                                            : "bg-red-900 text-red-300"
                                    }`}
                                >
                                    {test.pass ? "PASS" : "FAIL"}
                                </span>

                            </div>

                            <div className="space-y-3 text-sm text-slate-300">

                                <div className="flex justify-between items-center">

                                    <span className="font-medium text-slate-400">
                                        Status Code
                                    </span>

                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-bold ${
                                            test.status_code >= 500
                                                ? "bg-red-900 text-red-300"
                                                : test.status_code >= 400
                                                ? "bg-yellow-900 text-yellow-300"
                                                : "bg-green-900 text-green-300"
                                        }`}
                                    >
                                        {test.status_code}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="font-medium text-slate-400">
                                        Latency
                                    </span>

                                    <span>
                                        {Math.round(test.latency_ms)} ms
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="font-medium text-slate-400">
                                        Mutation
                                    </span>

                                    <span className="font-semibold">
                                        {test.mutation}
                                    </span>

                                </div>

                                {!test.pass && (

                                    <div className="mt-4 rounded-lg bg-red-950/40 p-3">

                                        <p className="text-xs uppercase tracking-wide text-red-400 mb-1">
                                            Reason
                                        </p>

                                        <p className="text-red-300">
                                            {test.reason}
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

                {/* AI Analysis */}

                <div className="mt-12">

                    <h2 className="text-2xl font-bold mb-6">
                        🤖 AI Analysis
                    </h2>

                    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 shadow-lg">

                        <p className="text-slate-300 whitespace-pre-line leading-7">
                            {data.analysis.ai_report}
                        </p>

                    </div>

                </div>

                {/* Download Report */}

<div className="mt-10 flex justify-end">

    <a
        href={`http://127.0.0.1:8000/${data.pdf_report}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
    >
        📄 Download PDF Report
    </a>

</div>

            </div>
        </Layout>
    );
}