import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState("loading...");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => setMsg(res.data.message));
  }, []);
  return (
    <div className="App">
     
<h2>Message from backend{msg}</h2>
    </div>
  );
}

export default App;
