import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <h1>Flask + React</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
