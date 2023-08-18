import React from "react";
import { Navigate } from "react-router-dom";
import "./Result.css";
import { useNavigate } from "react-router-dom";
export default function Results({ Name, Score, SetScore }) {
  const Navigate = useNavigate();
  return (
    <div className="result">
      {Name ? <div className="final-score">Final Score: {Score}</div> : ""}

      <button
        onClick={() => {
          SetScore(0);
          Navigate("/");
        }}
        className="goto-home"
      >
        Go to Home Page
      </button>
    </div>
  );
}
