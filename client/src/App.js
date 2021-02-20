import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import Search from "./pages/Search";
import Saved from "./pages/Saved";


function App() {
  const [msg, setMsg] = useState("loading...");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => setMsg(res.data.message));
  }, []);
  return (
    <Router className="App">   
<Switch>
  <Route exact path='/'>
  <Search/>
  </Route>
  <Route path='/saved'>
  <Saved/>
  </Route>
</Switch>
    </Router>
  );
}

export default App;
