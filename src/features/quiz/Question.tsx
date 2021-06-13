import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
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
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
        <h3>
          {question.number}. {question.value}
        </h3>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue="top"
            value={question.answer ?? -1}
            onChange={(_, val) => handleAnswer(Number(val))}
          >
            {[1, 2, 3, 4, 5, 6].map((ans_val) => (
              <FormControlLabel
                value={ans_val}
                key={ans_val}
                control={<Radio color="primary" />}
                label={ans_val}
                labelPlacement="top"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Question;
