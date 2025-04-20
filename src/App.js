import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./components/Home";
import Login from "./components/Login"; 
import Dashboard  from "./components/Dashboard";// Import the Login page
import Stage1 from "./components/stage1";
import Stage2 from "./components/stage2";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Add the login route */}
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path ="/stage1" element={<Stage1 />}/>
        <Route path ="/stage2" element={<Stage2 />}/>
      </Routes>
    </Router>
  );
}

export default App;
