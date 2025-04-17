import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./components/Home";
import Login from "./components/Login"; 
import Dashboard  from "./components/Dashboard";// Import the Login page
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Add the login route */}
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
