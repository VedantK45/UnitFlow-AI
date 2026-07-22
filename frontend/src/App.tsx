import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Results from "./pages/Results";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/preview" element={<Preview />} />

                <Route path="/results" element={<Results />} />

                <Route path="/history" element={<History />} />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;