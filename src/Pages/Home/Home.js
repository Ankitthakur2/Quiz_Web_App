import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../Data/Categories.js";

import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  FormHelperText,
  Button
} from "@mui/material";

import "./Home.css";

export default function Home({ Name, SetName, fetchQuestion }) {
  const [Category, setCategory] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Name || !Category || !Difficulty) {
      setError(true);
    } else {
      setError(false);
      fetchQuestion(Category, Difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div className="home">
      {error && (
        <div className="warranting">
          <p>Please Fill the details First</p>{" "}
        </div>
      )}
      <form className="form-class" sx={{ padding: "16px" }}>
        <FormControl className="name">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="name-helper-text"
            variant="outlined"
            value={Name}
            onChange={(e) => SetName(e.target.value)}
          />
        </FormControl>
        <FormControl className="option" sx={{ marginTop: "1rem" }}>
          <InputLabel id="option-label">Category</InputLabel>
          <Select
            labelId="option-label"
            id="option"
            value={Category}
            onChange={handleCategoryChange}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {Categories.map((Cat) => (
              <MenuItem key={Cat.category} value={Cat.value}>
                {Cat.category}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a Category</FormHelperText>
        </FormControl>

        <FormControl className="option">
          <InputLabel id="option-label" variant="filled">
            Difficulty
          </InputLabel>
          <Select
            labelId="option-label"
            id="option"
            value={Difficulty}
            onChange={handleDifficultyChange}
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
          <FormHelperText>Select a Difficulty Level</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="btn"
          onClick={handleSubmit}
        >
          Start Quiz
        </Button>
      </form>
    </div>
  );
}
