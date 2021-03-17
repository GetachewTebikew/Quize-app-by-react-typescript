import {ButtonWrapper,Wrapper} from './QusetionCard.style'
type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  questionNr,
  totalQuestions,
  userAnswer,
}) => {
  return (
    <Wrapper>
      <p>
        Question: {questionNr}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} ></p>      
      <div>
        {answers.map((answer) => (
          <ButtonWrapper key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer===answer}        
          >
                <button disabled={userAnswer} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html:answer}}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
