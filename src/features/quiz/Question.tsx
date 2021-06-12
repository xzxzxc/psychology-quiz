import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { QuestionDto, answer } from "./quizSlice";

function Question({ question }: { question: QuestionDto }) {
  const dispatch = useDispatch();
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
        onChange={(val) =>
          dispatch(answer({ questionNumber: question.number, value: val }))
        }
      >
        {[1, 2, 3, 4, 5, 6].map((ans_val) => (
          <ToggleButton value={ans_val}>{ans_val}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      <div className="btn-group" role="group"></div>
    </div>
  );
}

export default Question;
