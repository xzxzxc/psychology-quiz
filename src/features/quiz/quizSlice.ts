import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enumerable, IEnumerable } from "linq-javascript";
import { QuizStorrage } from "./quizStorrage";

export class QuizModel {
  title!: string;
  description!: string;
  groups!: GroupModel[];
  groupsName?: string;
}
export class GroupModel {
  name!: string;
  questions!: QuestionModel[];
}

export class QuestionModel {
  number!: number;
  value!: string;
  answer?: number;
}

export class AnswerModel {
  questionNumber!: number;
  value!: number;
}

export type QuizCollection = { [name: string]: QuizModel };

export class QuizState {
  currentQuiz?: QuizModel;
  collection!: QuizCollection;
}

const initialState: QuizState = {
  collection: QuizStorrage.collection,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectQuiz: (state: QuizState, action: PayloadAction<string>) => {
      state.currentQuiz = state.collection[action.payload];
    },
    answer: (state: QuizState, action: PayloadAction<AnswerModel>) => {
      const question = selectQuestions(selectCurrentQuiz(state)).first(
        (q) => q.number === action.payload.questionNumber
      );
      question.answer = action.payload.value;
    },
  },
});

export const { answer, selectQuiz } = quizSlice.actions;

export const selectQuestions = (quiz: QuizModel): IEnumerable<QuestionModel> =>
  Enumerable.fromSource(quiz.groups).selectMany((g) => g.questions);

export const selectCurrentQuizOrUndef = (
  state: QuizState
): QuizModel | undefined => state.currentQuiz;

export const selectCurrentQuiz = (state: QuizState): QuizModel => {
  const quiz = selectCurrentQuizOrUndef(state);
  if (!quiz) throw new Error("No quiz was selected!");
  return quiz;
};

export default quizSlice.reducer;
