import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enumerable, IEnumerable } from "linq-javascript";
import { TypedUseSelectorHook } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
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

export const selectQuizState = (root: RootState): QuizState => root.quiz;

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

export const useQuizSelector: TypedUseSelectorHook<QuizState> = <TSelected>(
  selector: (state: QuizState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected =>
  useAppSelector(
    (rootState: RootState) => selector(selectQuizState(rootState)),
    equalityFn
  );

export default quizSlice.reducer;
