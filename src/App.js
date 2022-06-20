import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import PhotoList from "./components/PhotoList/PhotoList";
import PhotoDetails from "./components/PhotoDetails/PhotoDetails";

import "./index.css";

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <h1>Photo Search Gallery</h1>
          </Link>
        </nav>
        <Routes>
          <Route path="/photos/:id" element={<PhotoDetails/>} />
          <Route path="/" element={<PhotoList/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;