import Question from "./Question";

const QuestionsList = ({ questions, handleSelection, endGame }) => {

  return (
    <>
      {questions.map((q, index) => {
        return (
          <Question
            key={index}
            id={q.id}
            prompt={q.prompt}
            answer={q.answer}
            options={q.options}
            selected={q.isSelected}
            selectedOption={q.selectedOption}
            handleSelection={handleSelection}
            endGame={endGame}
          />
        );
      })}
    </>
  );
};

export default QuestionsList;
