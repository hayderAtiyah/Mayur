import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
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

  return (
    <div className="App">
      <form>
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
                {/* <button onClick={() => handleDelete(r.name)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
