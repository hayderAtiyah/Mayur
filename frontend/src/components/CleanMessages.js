import { useState, useEffect } from "react";

function CleanMessages() {
    const [clean, setClean] = useState([]);
    const [error, setError] = useState("");

    async function fetchClean() {
        try {
            const res = await fetch("http://localhost:5000/api/message-difference");
            const json = await res.json();
            if (json.success) {
                setClean(json.data);
            } else {
                setError(json.error || "Failed to load. Please refresh");
            }
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    useEffect(() => {
        fetchClean();
    }, []);

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-center mb-6">
          <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
            🌟 Most Clean Messages
          </span>
        </h1>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <ol className="space-y-4">
          {clean.map((item) => (
            <li
              
              className="p-4 rounded-lg bg-slate-800/70 border border-white/10 shadow"
            >
              <p className="text-lg">{item.message}</p>
              <div className="flex gap-6 text-sm text-slate-400 mt-2">
                <span>👍️ {item.thumbsUp}</span>
                <span>👎️ {item.thumbsDown}</span>
                <span>✴️ Score: {item.score}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CleanMessages;