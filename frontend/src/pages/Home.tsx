import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

export default function Home() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");

    const [method, setMethod] = useState("POST");

    const [headers, setHeaders] = useState(
`{
  "Content-Type":"application/json"
}`
    );

const [body, setBody] = useState("{}");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const handleGenerate = async () => {

    setError("");

    let parsedHeaders;

    let parsedBody;

    try {

        parsedHeaders = JSON.parse(headers);

    }

    catch {

        setError("Headers contain invalid JSON.");

        return;

    }

    try {

        parsedBody = JSON.parse(body);

    }

    catch {

        setError("Request body contains invalid JSON.");

        return;

    }

    try {
        setLoading(true);
        const response = await api.post(

            "/generate-tests",

            {

                url,

                method,

                headers: parsedHeaders,

                body: parsedBody

            }

        );

        navigate("/preview", {

    state: response.data

});
        setLoading(false);

    }

    catch (error) {

        console.error(error);
        setLoading(false);

        setError("Unable to connect to backend.");

    }

};
  return (
    <Layout>

      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="mb-8 text-2xl font-bold">
          Generate API Test Cases
        </h2>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              API Endpoint
            </label>

            <input
              type="text"
              placeholder="https://api.example.com/users"
              value={url}

              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              HTTP Method
            </label>

            <select
              value={method}

              onChange={(e) => setMethod(e.target.value)}

              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Headers (JSON)
            </label>

            <textarea
              rows={4}
               value={headers}

              onChange={(e)=>setHeaders(e.target.value)}
              
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Request Body
            </label>

            <textarea
              rows={8}
              value={body}

              onChange={(e)=>setBody(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
            />
          </div>
{
    error && (

        <p className="text-red-400 text-sm">

            {error}

        </p>

    )
}
          <Button 
          text={loading ? "Generating..." : "Generate Test Cases"} 
          onClick={handleGenerate}
          disabled={loading}
          />

        </div>

      </div>

    </Layout>
  );
}