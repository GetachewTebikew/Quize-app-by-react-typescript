import { shuffleArrray } from "./Utils";
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "had",
}

export type Question = {
  category: string;
  correct_answer: string;
  defficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & {
  answers: string[];
};

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const data = await (await fetch(endpoint)).json();

  return data.results.map((question: Question) =>
    // returning implicit object
    ({
      // note how the answer is shuffled
      ...question,
      answers: shuffleArrray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    })
  );
};
