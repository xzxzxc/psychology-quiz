import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { QuestionModel, answer } from "./quizSlice";

function Question({
  question,
  onAnswer,
}: {
  question: QuestionModel;
  onAnswer: (value: number) => void;
}) {
  const dispatch = useDispatch();

  // document.addEventListener("keydown", (event: KeyboardEvent) => {
  //   if (isNaN(event.key as any as number)) return;
  //   const value = Number(event.key);
  //   if (value < 1 || value > 6) return;
  //   handleAnswer(value);
  // }); // TODO:

  const handleAnswer = (value: number) => {
    dispatch(answer({ questionNumber: question.number, value }));
    onAnswer(value);
  };

  return (
    <div
      className="d-flex flex-column
       justify-content-center align-items-center"
    >
      <h3>
        {question.number}. {question.value}
      </h3>

      <ToggleButtonGroup
        type="radio"
        name={`btns_${question.number}`}
        onChange={handleAnswer}
        value={question.answer}
      >
        {[1, 2, 3, 4, 5, 6].map((ans_val) => (
          <ToggleButton key={ans_val} value={ans_val}>
            {ans_val}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <div className="btn-group" role="group"></div>
    </div>
  );
}

export default Question;
