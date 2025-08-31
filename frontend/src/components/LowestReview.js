import { useState, useEffect } from "react";

function LowestReview() {
  const [lowest, setLowest] = useState([]);

  async function fetchMessage() {
    try {
      const res = await fetch("http://localhost:5000/api/get-lowest");
      const json = await res.json();
      setLowest(json.data);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          Lowest Reviews
        </h2>

        <ol className="space-y-4">
          {lowest.map((item) => (
            <li
              key={item.id}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-indigo-400 transition"
            >
              <p className="text-lg font-medium">{item.message}</p>
              <div className="text-sm text-slate-400 mt-2 flex justify-between">
                <span>👎️ {item.thumbsDown}</span>
                <span>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>);
}

export default LowestReview;
