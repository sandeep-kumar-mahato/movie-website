import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import ShowDetails from "./components/ShowDetails";
import UserDetailsPage from "./components/UserDetailsPage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shows/:showId" element={<ShowDetails />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
