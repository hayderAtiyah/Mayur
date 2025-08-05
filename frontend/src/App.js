import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookInfo, setBookInfo] = useState([]);
  const values = ["author", "rating", "title", "year"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function getValues(key) {
    return bookInfo.map((book) => book[key]);
  }

  function handleChange(e) {
    console.log(name);
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handleSubmit() {
    fetch("http://127.0.0.1:5050/api/add-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => res.json).catch((e) => console.log(e));
  }

  function handleEmail() {
    if (!email.includes("@")) {
      alert("Invalid Email!");
      return;
    }
    fetch("http://127.0.0.1:5050/api/add-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json).catch((e) => console.log(e));
  }

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/api/user")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/books")
  //     .then((res) => res.json())
  //     .then((data) => setBookInfo(data));
  // }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Enter your name: </p>
        <input type="text" value={name} onChange={handleChange} />

        <br />
        <button type="submit">submit</button>
      </form>

      <form onSubmit={handleEmail}>
        <p>Enter your email: </p>
        <input type="text" value={email} onChange={handleEmailChange} />
        <p>{pval}</p>
        <br/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
