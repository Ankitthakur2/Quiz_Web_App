import "./styles.css";
import axios from "axios";
import Quiz from "./Pages/Quiz/Quiz.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useState } from "react";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Result from "./Pages/Result/Result.js";
export default function App() {
  const [Name, SetName] = useState("");
  const [Questions, SetQuestions] = useState();
  const [Score, SetScore] = useState(0);
  const fetchQuestion = async (Category = "", Difficulty = "") => {
    // console.log(Category, Difficulty);
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        Category && `&category=${Category}`
      }${Difficulty && `&difficulty=${Difficulty}`}&type=multiple`
    );

    // console.log(data);

    SetQuestions(data.results);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                Name={Name}
                SetName={SetName}
                fetchQuestion={fetchQuestion}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                Name={Name}
                Questions={Questions}
                Score={Score}
                SetQuestions={SetQuestions}
                SetScore={SetScore}
              />
            }
          />

          <Route
            path="/result"
            element={<Result Name={Name} Score={Score} SetScore={SetScore} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
