import { selectTestQuiz } from "./quizSlice";
import { useAppSelector } from "../../app/hooks";
import Question from "./Question";
import { Enumerable } from "linq-javascript";

export function Quiz() {
  const quiz = useAppSelector((root) => selectTestQuiz(root.quiz));
  
  const questions = Enumerable.fromSource(quiz.groups)
    .selectMany((g) => g.questions)
    .orderBy((q) => q.number)
    .select(q=><Question question={q}/>)
    .toArray();

  return (
    <div className="App">
      {questions}
    </div>
  );
}

export default Quiz;
