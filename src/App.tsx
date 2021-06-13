import {
  Button,
  CssBaseline,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import "./App.css";
import Quiz from "./features/quiz/Quiz";
import {
  selectCurrentQuizOrUndef,
  selectQuiz,
  useQuizSelector,
} from "./features/quiz/quizSlice";

function App() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (quizCode: string) => {
    dispatch(selectQuiz(quizCode));
    setAnchorEl(null);
  };

  const quiz = useQuizSelector(selectCurrentQuizOrUndef);

  return (
    <div className="App">
      <CssBaseline />
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>{`Анкета ${quiz?.title ?? ""}`}</title>
      </Helmet>
      {!quiz && (
        <Grid container style={{minHeight:'600px'}} direction="row" justify="center" alignItems="center">
          <Button
            size="large"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Оберіть тест
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose("smi_1")}>SMI-1</MenuItem>
            <MenuItem onClick={() => handleClose("ysq_s3")}>YSQ-S3</MenuItem>
            {/* <MenuItem onClick={() => handleClose("test")}>test</MenuItem> */}
          </Menu>
        </Grid>
      )}
      {!!quiz && <Quiz quiz={quiz} />}
    </div>
  );
}

export default App;
