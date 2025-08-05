import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookInfo, setBookInfo] = useState([]);
  const values = ["author", "rating", "title", "year"];
  const [name, setName] = useState("");

  function getValues(key) {
    return bookInfo.map((book) => book[key]);
  }
  function handleChange(e) {
    console.log(name);
    setName(e.target.value);
  }

  function handleSubmit() {
    console.log("hello there");
    fetch("http://127.0.0.1:5000/api/add-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => res.json);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBookInfo(data));
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Enter your name: </p>
        <input type="text" value={name} onChange={handleChange} />

        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
