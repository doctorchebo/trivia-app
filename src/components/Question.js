import React from "react";
import "./question.css";
const Question = ({
  key,
  id,
  options,
  prompt,
  handleSelection,
  selected,
  selectedOption,
  answer,
  endGame,
}) => {
  const answerOptions = options.map((option, index) => {
    const isSelected = selectedOption === options.indexOf(option) && selected;
    const isCorrectAnswer = answer === options[options.indexOf(option)];
    const correctAnswer = answer;
    const selectedAnswer = options[selectedOption];
    const isSelectedAnswer = options.indexOf(option) === selectedOption;

    const style = () => {
      if (endGame) {
        return {
          backgroundColor: isCorrectAnswer
            ? "#94D7A2"
            : isSelectedAnswer && selectedAnswer !== correctAnswer
            ? "#F8BCBC"
            : "",
        };
      } else {
        return { backgroundColor: isSelected ? "#D6DBF5" : "" };
      }
    };

    return (
      <button
        key={index}
        id={id}
        className="answer-option"
        style={style()}
        onClick={() => handleSelection(id, index)}
      >
        {option}
      </button>
    );
  });
  return (
    <div className="container" key={key}>
      <div className="question-prompt">{prompt}</div>
      <div className="answer-options">{answerOptions}</div>
    </div>
  );
};

export default Question;
