import { selectQuestions, selectCurrentQuizOrUndef } from "./quizSlice";
import { useAppSelector } from "../../app/hooks";
import Question from "./Question";
import {
  Button,
  Container,
  makeStyles,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { useState } from "react";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export function Quiz() {
  const quiz = useAppSelector((root) => selectCurrentQuizOrUndef(root.quiz));

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  if (!quiz) return null;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const questions = selectQuestions(quiz).orderBy((q) => q.number);

  const questionsCount = selectQuestions(quiz).count();

  return (
    <div>
      <Container maxWidth={"md"}>
        <h3>{quiz.title}</h3>
        <div
          style={{ textAlign: "start", textIndent: "2em" }}
          dangerouslySetInnerHTML={{ __html: quiz.description }}
        ></div>
      </Container>
      <Stepper activeStep={activeStep} orientation="vertical">
        {questions
          .select((question) => (
            <Step key={question.number}>
              <StepLabel>{question.value}</StepLabel>
              <StepContent>
                <Question question={question} onAnswer={handleNext} />
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!question.answer}
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Вперед
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))
          .toArray()}
      </Stepper>
      {activeStep === questionsCount && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Results quiz={quiz} />
        </Paper>
      )}
    </div>
  );
}

export default Quiz;
