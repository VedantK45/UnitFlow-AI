import { Link, useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">

        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">

          {/* Left Section */}

          <div>
            <h1 className="text-3xl font-bold text-cyan-400">
              UnitFlow AI
            </h1>

            <p className="mt-1 text-slate-400">
              AI-Powered API Testing Platform
            </p>
          </div>

          {/* Right Section */}

          <nav className="flex gap-4">

            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === "/"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              🏠 Home
            </Link>

            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg transition ${
                location.pathname === "/history"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              📜 History
            </Link>

          </nav>

        </div>

      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}