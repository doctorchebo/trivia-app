import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import AxiosService from "./services/AxiosService";
import shuffle from "./utils/shuffle";
import QuestionsList from "./components/QuestionsList";
import "./app.css";

export default function App() {
  const [questions, setQuestions] = useState(null);
  const [newGame, setNewGame] = useState(true);
  const [endGame, setEndGame] = useState(false);
  const [count, setCount] = useState(0);
  const [startScreen, setStartScreen] = useState(true);

  useEffect(() => {
    AxiosService.get()
      .then((res) => {
        const data = res.data.results;
        setQuestions(
          JSON.parse(
            JSON.stringify(data)
              .replaceAll(/&quot;/g, "''")
              .replaceAll(/&amp;/g, `&`)
              .replaceAll(/&#039;/g, "'")
              .replaceAll(/&ouml;/g, "ö")
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newGame]);

  function handleStart() {
    setStartScreen(false);
    setEndGame(false);
    setQuestions(organizedData(questions));
  }

  const organizedData = (questions) => {
    return questions.map((question) => {
      return {
        id: nanoid(),
        prompt: question.question,
        answer: question.correct_answer,
        options: shuffle([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
        isSelected: false,
        selectedOption: null,
      };
    });
  };

  function handleNewGame() {
    setStartScreen(true);
    setNewGame((prev) => !prev);
    setCount(0);
  }

  function handleSelection(id, index) {
    console.log("id, index => " + id, index);
    setQuestions((oldQuestions) => {
      return oldQuestions.map((question) => {
        return question.id === id
          ? {
              ...question,
              isSelected: question.selectedOption !== null ? question.isSelected : !question.isSelected,
              selectedOption: index,
            }
          : { ...question};
      });
    });
  }

  function handleCheckAnswers() {
    setEndGame(true);
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.options[question.selectedOption] === question.answer) {
        setCount((prev) => prev + 1);
      }
    }
  }

  const gameResult = (
    <div className="gameResults">
      <h3>You scored {count}/5 correct answers</h3>
      <button className="playAgainButton" onClick={handleNewGame}>
        Play Again
      </button>
    </div>
  );

  return (
    <div className="app-container">
      {startScreen ? (
        <div className="intro">
          <h1>Quizzical</h1>
          <button className="startButton" onClick={handleStart}>
            Start
          </button>
        </div>
      ) : (
        <div className="questions-container">
          <QuestionsList
            questions={questions}
            handleSelection={handleSelection}
            endGame={endGame}
          />
          {endGame ? (
            gameResult
          ) : (
            <button className="checkAnswers" onClick={handleCheckAnswers}>
              Check Answers
            </button>
          )}
        </div>
      )}
    </div>
  );
}
