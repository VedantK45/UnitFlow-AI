import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function NotFound() {
    return (
        <Layout>

            <div className="flex flex-col items-center justify-center text-center py-24">

                <div className="text-7xl mb-6">
                    🤖
                </div>

                <h1 className="text-6xl font-bold text-cyan-400">
                    404
                </h1>

                <h2 className="text-3xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-slate-400 mt-4 max-w-md">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <Link
                    to="/"
                    className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-lg transition"
                >
                    🏠 Back to Home
                </Link>

            </div>

        </Layout>
    );
}