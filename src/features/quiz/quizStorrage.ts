import { QuizCollection, QuizDto } from "./quizSlice";

export class QuizStorrage {

  static get collection(): QuizCollection {
    return {
      test: this.test,
    };
  }

  static get test(): QuizDto {
    return {
      title: "test title",
      description: "test descr",
      groups: [
        {
          name: "group 1",
          questions: [
            {
              number: 1,
              value: "first q",
            },
            {
              number: 2,
              value: "second q",
            },
          ],
        },
        {
          name: "group 2",
          questions: [
            {
              number: 3,
              value: "third q",
            },
            {
              number: 4,
              value: "fourth q",
            },
          ],
        }],
    };
  }
}
