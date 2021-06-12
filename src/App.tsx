import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Quiz from "./features/quiz/Quiz";
import { selectQuiz } from "./features/quiz/quizSlice";

function App() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (quizCode:string) => {
    dispatch(selectQuiz(quizCode));
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
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
          <MenuItem onClick={()=>handleClose('smi_1')}>SMI-1</MenuItem>
          <MenuItem onClick={()=>handleClose('ysq_s3')}>YSQ-S3</MenuItem>
          {/* <MenuItem onClick={()=>handleClose('test')}>test</MenuItem> */}
        </Menu>
        <Quiz />
      </header>
    </div>
  );
}

export default App;
