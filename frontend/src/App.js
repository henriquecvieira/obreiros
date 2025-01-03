// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserRegistration from "./components/UserRegistration";
import FunctionAssignment from "./components/FunctionAssignment";
import PDFGenerator from "./components/PDFGenerator"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/function-assignment" element={<FunctionAssignment />} />
            <Route path="/PDF-Generator" element={<PDFGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
