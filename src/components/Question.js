import React from "react";

export default function Question(props) {
  const endGame = props.endGame
  
  const options = props.data.options.map((option) => {
    
    const isSelected = props.data.selectedOption == props.data.options.indexOf(option) && props.data.isSelected
    const isCorrectAnswer = props.data.answer == props.data.options[props.data.options.indexOf(option)];
    const correctAnswer = props.data.answer
    const selectedAnswer = props.data.options[props.data.selectedOption]
    const isSelectedAnswer = props.data.options.indexOf(option) == props.data.selectedOption

    const style = () => {
      if (endGame) {
        return { backgroundColor: isCorrectAnswer ? "#94D7A2" : (isSelectedAnswer && selectedAnswer !== correctAnswer ? "#F8BCBC" : "")}
      } else {
        return { backgroundColor: isSelected ? "#D6DBF5" : "" }
      }
    }

    return (
      <h3
        className="answer-option"
        key = {props.data.options.indexOf(option)}
        style={style()}
        onClick={() =>
          props.handleSelection(
            props.data.id,
            props.data.options.indexOf(option)
          )
        }
      >
        {option}
      </h3>
    );
  });
  return (
    <div>
      <h2 className="question">{props.data.prompt}</h2>
      <div className="answers">{options}</div>
    </div>
  );
}
