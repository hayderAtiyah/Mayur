import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [result, setResult] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  async function fetchNames() {
    const res = await fetch("http://127.0.0.1:5000/api/names");
    const json = await res.json();
    setRows(json.data || []);
  }

  useEffect(() => {
    fetchNames();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/add-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name})
      });
      if (!res.ok) {
        throw new Error("Server error "+res.status)
      }
      fetchNames();
      setName("");
    } catch(err) {
      console.log(`The error: ${err.message}`)
    }
  }

  async function handleDelete(deletedName) {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/delete-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: deletedName})
      });
      if (!res.ok) {
        throw new Error("Server error "+res.status)
      }
      fetchNames();
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  async function handleSearch(e, nameToSearch) {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/search-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: nameToSearch})
      })
      if (!res.ok) {
        throw new Error("Server error "+res.status)
      }
      const json = await res.json();
      if (json.success && json.data) {
        setResult("Name found");

      } else {
        setResult("Name not found");
      }
      setSearchName("");
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Enter your name: </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit">submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <div className="search">
        <input type="text" placeholder="Enter name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <button onClick={(e) => handleSearch(e, searchName)}>Search</button>
      </div>
      {result !== "" && <p>{result}</p>}
      
      <table border="1" cellPadding="6" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{r.name}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>
                {/* Button to delete this name */}
                <button onClick={() => handleDelete(r.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
