import { useState, useEffect } from "react";

function Home() {
    const [input, setInput] = useState("");
      const [sendResult, setSendResult] = useState("");
      const [randomMessage, setRandomMessage] = useState("");
      const [thumbsUp, setThumbsUp] = useState(0);
      const [thumbsDown, setThumbsDown] = useState(0);
      const [messageId, setMessageId] = useState(0);
      const [rated, setRated] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const [isDisabled, setIsDisabled] = useState(false);
    
      function handleChange(e) {
        setInput(e.target.value);
      }
    
      async function handleRate(value) {
        try {
          const res = await fetch("http://localhost:5000/api/rate-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
             body: JSON.stringify({ message: randomMessage, rating: value}),
          });
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`)
          }
          const json = await res.json();
          setRated(true);
          setThumbsUp(json.thumbsUp ?? thumbsUp+(value==="up" ? 1 : 0)) 
          setThumbsDown(json.thumbsDown ?? thumbsDown+(value==="down" ? 1 : 0))
        } catch (e) {
          console.error(`Error: ${e}`)
        }
      }
    
      async function fetchMessages() {
        const res = await fetch("http://localhost:5000/api/get-random-message");
        const json = await res.json();
        if (json.success) {
          setRandomMessage(json.randomMessage);
          setThumbsUp(json.thumbsUp);
          setThumbsDown(json.thumbsDown);
          setMessageId(json.messageId);
          console.log(thumbsUp, thumbsDown, messageId)
        } else {
          setRandomMessage(json.message);
        }
      }
    
    
      useEffect(() => {
        fetchMessages();
      }, []);
    
      async function handleSubmit(e) {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:5000/api/add-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: input }),
          });
          if (!res.ok) {
            throw new Error("Server error " + res.status);
          }
          setInput("");
          const json = await res.json();
          if (json.success) {
            setSubmitted(true);
            setIsDisabled(true);
            setSendResult("Data saved!");
            // fetchMessages();
          } else {
            setSendResult(json.message);
          }
        } catch (e) {
          console.log(`Error: ${e}`);
        }
      }
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center p-6">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Enter your message
                </span>
              </h1>
    
              <textarea
                className="w-full h-32 resize-y rounded-xl border border-white/10 bg-slate-900/60 p-4 text-slate-100 placeholder:text-slate-400 outline-none ring-0 focus:border-indigo-400 focus:bg-slate-900/80 transition"
                placeholder="Type something thoughtful..."
                onChange={handleChange}
                value={input}
              />
    
              <div className="flex items-center justify-between">
                {isDisabled ? <p>Thanks for submitting!</p> :  
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition"
                >
                  Send
                </button>}
               
    
                {sendResult !== "" && (
                  <p className="text-sm text-emerald-300">{sendResult}</p>
                )}
              </div>
            </form>
    
            <div className="border-t border-white/10 px-6 py-5">
              <p className="text-sm text-slate-300 mb-3">
                {randomMessage || "Waiting for a random message..."}
              </p>
    
              {randomMessage && (
                
                <div className="flex gap-3">
    
                  {rated ? <p>Thanks for rating the message</p> : 
                  <div>
                    <button
                      onClick={() => handleRate("up")}
                      className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow"
                    >
                      👍 Thumbs Up
                    </button>
                    
                    <button
                      onClick={() => handleRate("down")}
                      className="ml-5 px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow"
                    >
                      👎 Thumbs Down
                    </button>
                  </div>
                  }
                  <p>👍{thumbsUp}  👎{thumbsDown}</p>
    
                  
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default Home;