import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Quiz App</h1>
      <Link to="/quiz" className="play-button">Play</Link>
    </div>
  );
}

export default Home;
