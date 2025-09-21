import { useEffect, useState } from "react";

function AllMessages() {
    const [messages, setMessages] = useState([])
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 5;

    async function fetchMessages(query=search, current=page) {
        try {
            setLoading(true);
            const skip = (current-1)*limit;
            
            const res = await fetch(`https://mayur-544z.onrender.com/api/all-messages?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
      );
            const json = await res.json();
            setMessages(json.data);
            setTotal(json.total);
        } catch (e) {
            console.error(`Error: ${e}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchMessages(search, page);
    }, [search, page]);

const totalPages = Math.ceil(total / limit);
return (    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6">
      <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          All Messages
        </h2>

        {/* Search bar */}
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setPage(1); // reset to page 1 when searching
            setSearch(e.target.value); // update search text
          }}
          placeholder="Search messages..."
          className="w-full px-3 py-2 mb-6 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none"
        />

        {/* Message list */}
        {loading ? (
          <p className="text-slate-300">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-400">No messages found.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700"
              >
                <p className="text-lg font-medium">{msg.message}</p>
                <div className="text-sm text-slate-400 mt-2">
                  👍 {msg.thumbsUp} · 👎 {msg.thumbsDown} ·{" "}
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination controls */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)} // change page when clicked
              className={`px-3 py-1 rounded ${
                page === num
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

}

export default AllMessages;