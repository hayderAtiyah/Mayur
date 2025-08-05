import { use, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookInfo, setBookInfo] = useState([]);
  const values = ["author", "rating", "title", "year"];

  function getValues(val, index) {
    let arr = [];
    for (let book of bookInfo[index]) {
      arr.push(book[val])
    }

    return arr
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
      <h1>Flask + React</h1>
      <p>hello</p>
      <button onClick={() => console.log(bookInfo)}>click</button>
      <p>{getValues("author", 0).join(", ")}</p>
      <p>{getValues("rating").join(", ")}</p>
      <p>{getValues("title").join(", ")}</p>
      <p>{getValues("year").join(", ")}</p>
    </div>
  );
}

export default App;
