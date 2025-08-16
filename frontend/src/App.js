import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/add-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input})
      });
      if (!res.ok) {
        throw new Error("Server error "+res.status);
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
      </form>
    </div>
  );
}

export default App;
