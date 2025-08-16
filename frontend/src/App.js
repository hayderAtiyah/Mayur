import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [sendResult, setSendResult] = useState("");
  const [randomMessage, setRandomMessage] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function fetchMessages() {
    const res = await fetch("http://localhost:5000/api/get-random-message");
    const json = await res.json();
    if (json.success) {
      setRandomMessage(json.randomMessage);
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
        body: JSON.stringify({message: input})
      });
      if (!res.ok) {
        throw new Error("Server error "+res.status);
      }
      setInput("");
      const json = await res.json();
      if (json.success) {
        setSendResult("Data saved!")
      } else {
        setSendResult(json.message)
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your message</h1>
        <textarea placeholder="Enter your message" onChange={handleChange} value={input}></textarea>
        <button type="submit">Send</button>
        {sendResult !== "" && <p>{sendResult}</p>}
      </form>
      <div>
        <p>{randomMessage}</p>
      </div>
    </div>
  );
}

export default App;
