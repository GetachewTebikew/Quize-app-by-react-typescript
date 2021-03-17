import React, { useState } from "react";
// components
import QuestionCard from "./components/QuestionCard";
// api
import { fetchQuestions } from "./API";
// types
import { Difficulty, QuestionState } from "./API";

// styles
import {GlobalStyle,Wrapper} from './App.styles';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUSETIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUSETIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = ( e: React.MouseEvent<HTMLButtonElement> ) =>
  {
    if (!gameOver) {
      // get the selected answer
      const answer = e.currentTarget.value;
      // check if the answer is correct
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) {
        setScore( prev=>prev+1);
      }
      const newUserAnswer = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
        
      };
      setUserAnswers((prev)=>[...prev,newUserAnswer]);
    }
  };

  const NextQuestion = () =>
  {
    // go to next question if not currently at the last question
    const nextQuestion = number + 1;
    if (nextQuestion===TOTAL_QUSETIONS) {
      setGameOver( true );

    } else
    {
      setNumber( nextQuestion );
    }
  };

  // console.log(questions);

  return (
    <>
      <GlobalStyle />
      <Wrapper>  <header className="App-header">
        <h1> REACT QUIZE </h1>
      </header>
       {gameOver || userAnswers.length === TOTAL_QUSETIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: { score }</p> : null}
      {loading && (<p>Loading Questions....</p>)}
      {(!loading&&!gameOver)&&(<QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUSETIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers?userAnswers[number]:undefined}
      callback={checkAnswer}
      /> )}
      {!gameOver && !(userAnswers.length === TOTAL_QUSETIONS)? (
        <button className="next" onClick={NextQuestion}>
          Next Question
        </button>
        ) : null}
      </Wrapper>
      </>
  
    
  );
}

export default App;
