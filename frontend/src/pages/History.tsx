import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../services/api";

interface HistoryItem {
    run_id: number;
    created_at: string;
    api_url: string;
    method: string;
    total_tests: number;
    passed: number;
    failed: number;
    pdf_path: string;
}

export default function History() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get("/history");
            setHistory(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-6">

                <h1 className="text-3xl font-bold mb-8">
                    📜 Test History
                </h1>

                {loading ? (

                    <div className="text-center py-20">
                        <p className="text-lg">Loading history...</p>
                    </div>

                ) : history.length === 0 ? (

                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">

                        <h2 className="text-2xl font-semibold mb-2">
                            No Test Runs Yet
                        </h2>

                        <p className="text-slate-400">
                            Execute an API test to create your first report.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {history.map((run) => (

                            <div
                                key={run.run_id}
                                className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-md hover:border-cyan-500 hover:shadow-xl transition-all duration-300"
                            >

                                {/* Header */}

                                <div className="flex justify-between items-center">

                                    <h2 className="text-xl font-bold">
                                        Run #{run.run_id}
                                    </h2>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                                        run.method === "GET"
                                            ? "bg-green-600"
                                            : run.method === "POST"
                                            ? "bg-blue-600"
                                            : run.method === "PUT"
                                            ? "bg-yellow-600"
                                            : run.method === "DELETE"
                                            ? "bg-red-600"
                                            : "bg-slate-600"
                                    }`}
                                    >
                                        {run.method}
                                    </span>

                                </div>

                                {/* API URL */}

                                <div className="mt-5">

                                    <p className="text-sm text-slate-400">
                                        🌐 API URL
                                    </p>

                                    <p className="break-all text-slate-200">
                                        {run.api_url}
                                    </p>

                                </div>

                                {/* Created At */}

                                <div className="mt-4">

                                    <p className="text-sm text-slate-400">
                                        🕒 Created At
                                    </p>

                                    <p className="text-slate-200">
                                        {run.created_at}
                                    </p>

                                </div>

                                {/* Summary */}

                                <div className="grid grid-cols-3 gap-6 mt-6">

                                    <div>

                                        <p className="text-slate-400 text-sm">
                                            Total Tests
                                        </p>

                                        <p className="text-2xl font-bold">
                                            {run.total_tests}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-green-400 text-sm">
                                            Passed
                                        </p>

                                        <p className="text-2xl font-bold">
                                            {run.passed}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-red-400 text-sm">
                                            Failed
                                        </p>

                                        <p className="text-2xl font-bold">
                                            {run.failed}
                                        </p>

                                    </div>

                                </div>

                                {/* View Report */}

                                <div className="flex justify-end mt-8">

                                    <a
                                        href={`http://127.0.0.1:8000/${run.pdf_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-medium"
                                    >
                                        📄 View Report
                                    </a>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </Layout>
    );
}