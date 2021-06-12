import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enumerable, IEnumerable } from "linq-javascript";
import { QuizStorrage } from "./quizStorrage";

export class QuizDto {
  title!: string;
  description!: string;
  groups!: GroupDto[];
}
export class GroupDto {
  name!: string;
  questions!: QuestionDto[];
}

export class QuestionDto {
  number!: number;
  value!: string;
  answer?: number;
}

export class AnswerVm {
  questionNumber!: number;
  value!: number;
}

export class QuizCollection {
  test!: QuizDto;
}

export const quizSlice = createSlice({
  name: "quiz",
  initialState: QuizStorrage.collection,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    answer: (state: QuizCollection, action: PayloadAction<AnswerVm>) => {
      const question = selectQuestions(selectTestQuiz(state)) // TODO:
        .first((q) => q.number === action.payload.questionNumber);
      question.answer = action.payload.value;
    },
  },
});

export const { answer } = quizSlice.actions;

export const selectQuestions = (quiz: QuizDto): IEnumerable<QuestionDto> =>
  Enumerable.fromSource(quiz.groups).selectMany((g) => g.questions);

export const selectTestQuiz = (state: QuizCollection): QuizDto => state.test;

export default quizSlice.reducer;
