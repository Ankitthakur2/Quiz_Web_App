import React, { useState } from "react";
import "./Question.css";
import { useNavigate } from "react-router-dom";

export default function Question({
  currQuestion,
  setCurrQuestion,
  Questions,
  Options,
  Correct,
  Score,
  SetScore,
  SetQuestions
}) {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  function handleQuit() {
    SetScore(0);
    Navigate("/");
  }

  function handleCheck(option) {
    setSelected(option);
    if (option === Correct) {
      SetScore(Score + 1);
      setError(false);
    }
  }

  function handleSelected(option) {
    if (selected === option && selected === Correct) return "select";
    else if (selected === option && selected !== Correct) return "wrong";
    else if (option === Correct) return "select";
  }

  function handleNext() {
    if (currQuestion > 8) Navigate("/result");
    else if (selected) {
      setCurrQuestion(currQuestion + 1);
      setSelected();
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className="fixed-height">
        {error && (
          <div className="warranting">
            <p>Please select a option</p>
          </div>
        )}
      </div>

      <div className="question">
        <h3 style={{ marginBottom: "0.3rem" }}>Question: {currQuestion + 1}</h3>

        <p>{Questions[currQuestion].question}</p>
      </div>

      <div className="options">
        {Options.map((option) => (
          <button
            key={option}
            onClick={() => handleCheck(option)}
            className={` ${selected && handleSelected(option)}`}
            disabled={selected}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="links">
        <div>
          <button className="quit" onClick={handleQuit}>
            Quit
          </button>
        </div>
        <div>
          <button className="next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
