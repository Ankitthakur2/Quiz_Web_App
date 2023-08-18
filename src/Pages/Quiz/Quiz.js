import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Question from "../../Components/Question/Question.js";
import "./Quiz.css";
export default function Quiz({
  Name,
  Questions,
  Score,
  SetQUestions,
  SetScore
}) {
  const [Options, SetOptions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(0);

  useEffect(() => {
    if (Questions && Questions[currQuestion]) {
      SetOptions(
        Shuffle([
          Questions[currQuestion]?.correct_answer,
          ...Questions[currQuestion]?.incorrect_answers
        ])
      );
    }
  }, [Questions, currQuestion]);

  const Shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <div className="welcome">
        <p>Welcome, {Name} </p>
      </div>

      {Questions ? (
        <>
          <div>
            <div className="info">
              <span className="border">{Questions[currQuestion].category}</span>
              {/* <span>{Questions[currQuestion].question}</span> */}
              <span className="border">Score:{Score}</span>
            </div>
          </div>
          <Question
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            Questions={Questions}
            Options={Options}
            Correct={Questions[currQuestion]?.correct_answer}
            Score={Score}
            SetScore={SetScore}
            SetQUestions={SetQUestions}
          />
        </>
      ) : (
        <div className="centered">
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            thickness={1}
            size={150}
          />
        </div>
      )}
    </div>
  );
}
