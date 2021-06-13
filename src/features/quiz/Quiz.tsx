import { selectQuestions, QuizModel } from "./quizSlice";
import Question from "./Question";
import {
  Button,
  Container,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { useRef, useState } from "react";
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

export function Quiz({ quiz }: { quiz: QuizModel }) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  let myRef = useRef<HTMLElement>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    myRef.current?.scrollIntoView();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    myRef.current?.scrollIntoView();
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
      {activeStep !== questionsCount && (
        <Container>
          <Stepper activeStep={activeStep} orientation="vertical">
            {questions
              .select((question) => (
                <Step key={question.number}>
                  <StepLabel>{question.value}</StepLabel>
                  <StepContent
                    ref={activeStep === question.number ? myRef : undefined}
                  >
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
        </Container>
      )}
      {activeStep === questionsCount && <Results quiz={quiz} />}
    </div>
  );
}

export default Quiz;
