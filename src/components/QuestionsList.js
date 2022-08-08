import Question from "./Question";

const QuestionsList = ({ questions, handleSelection, endGame }) => {

  return (
    <>
      {questions.map((q) => {
        return (
          <Question
            key={q.id}
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
