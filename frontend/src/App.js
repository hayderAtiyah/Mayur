import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("hello");
  const [age, setAge] = useState(90);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/age")
      .then((res) => res.json())
      .then((data) => setAge(data.age));
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="App">
      <h1>Flask + React</h1>
      <p>{message}</p>
      <p>{age} years old</p>
      <p>name: {user.name}</p>
      <p>age: {user.age}</p>
      <p>skills: {user.skills.join(", ")}</p>
      <p>profile: {user.skills.join(", ")}</p>
    </div>
  );
}

export default App;
