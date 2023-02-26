import React, { useState, useEffect } from 'react';
import '../assets/css/quizHome.scss';
import QuizScore from '../components/quiz/QuizScore.jsx';

let questionArray = [
  {
    ques: 'What does html stands for?',
    ans: 'C',
    options: [
      {
        optionId: 'A',
        text: 'Hyper textml Language',
      },
      {
        optionId: 'B',
        text: 'Hyper transfer Machine Language',
      },
      {
        optionId: 'C',
        text: 'Hyper Text Markup Language',
      },
      {
        optionId: 'D',
        text: 'Hyper tengible Markup Language',
      },
    ],
    userAnswer: '',
  },
  {
    ques: 'What does CSS stands for?',
    ans: 'D',
    options: [
      {
        optionId: 'A',
        text: 'Counter Strike Source',
      },
      {
        optionId: 'B',
        text: 'Corrective style sheet',
      },
      {
        optionId: 'C',
        text: 'Computer Style Sheet',
      },
      {
        optionId: 'D',
        text: 'Cascading Style Sheet',
      },
    ],
    userAnswer: '',
  },
  {
    ques: 'What does JS stands for?',
    ans: 'A',
    options: [
      {
        optionId: 'A',
        text: 'Java Script',
      },
      {
        optionId: 'B',
        text: 'Java Sheet',
      },
      {
        optionId: 'C',
        text: 'Java Style',
      },
      {
        optionId: 'D',
        text: 'Java Scripted',
      },
    ],
    userAnswer: '',
  },
  {
    ques: 'What does SQL stands for?',
    ans: 'B',
    options: [
      {
        optionId: 'A',
        text: 'Structured Question Language',
      },
      {
        optionId: 'B',
        text: 'Structured Query Language',
      },
      {
        optionId: 'C',
        text: 'Sequential Query Language',
      },
      {
        optionId: 'D',
        text: 'Structured Queries Language',
      },
    ],
    userAnswer: '',
  },
  {
    ques: 'What does php stands for?',
    ans: 'A',
    options: [
      {
        optionId: 'A',
        text: 'Hypertext Preprocessor',
      },
      {
        optionId: 'B',
        text: 'Pre Hypertext processor',
      },
      {
        optionId: 'C',
        text: 'Pre Hyper processor',
      },
      {
        optionId: 'D',
        text: 'Hypertext Preprocessor Language',
      },
    ],
    userAnswer: '',
  },
];

export default function QuizHome() {
  const [questionsList, setQuestionsList] = useState(JSON.parse(JSON.stringify(questionArray)));
  const [count, setCount] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [timer, setTimer] = useState({
    min: 10,
    sec: 50,
  });

  useEffect(() => {
    setQuestionsList(JSON.parse(JSON.stringify(questionArray)));
  }, []);

  useEffect(() => {
    if (timer.min == 0 && timer.sec == 0) {
      subimtAns();
    } else {
      setTimeout(() => {
        setTimer((prevState) => {
          if (prevState.sec > 0) {
            return {
              min: prevState.min,
              sec: prevState.sec - 1,
            };
          } else {
            return {
              min: prevState.min - 1,
              sec: 60,
            };
          }
        });
      }, 1000);
    }
  }, [timer]);

  function nextQues() {
    setCount(count + 1);
  }
  function prevQues() {
    setCount(count - 1);
  }
  function subimtAns() {
    setDisplayScore(true);
  }

  const handleOptionClick = (obj) => {
    let updatedList = JSON.parse(JSON.stringify(questionsList));
    if (updatedList[count].userAnswer == obj.optionId && updatedList[count].userAnswer != '') {
      updatedList[count].userAnswer = '';
    } else {
      updatedList[count].userAnswer = obj.optionId;
    }
    setQuestionsList(updatedList);
  };

  return (
    <div className="quizPageWrapper">
      {displayScore ? (
        <>
          <QuizScore questionsList={questionsList} />
        </>
      ) : (
        <>
          <div className="leftAlign">
            <button onClick={() => subimtAns()} className="endQuizBtn">
              End quiz
            </button>
            <h3 className="quizTimer">
              {timer.min}:{timer.sec}
            </h3>
          </div>
          <h3 className="question">{questionsList[count].ques}</h3>
          <div className="choicesList">
            {questionsList[count].options.map((obj, key) => {
              return (
                <div
                  key={key}
                  className={
                    obj.optionId == questionsList[count].userAnswer
                      ? 'optionsDiv activeDiv'
                      : 'optionsDiv'
                  }
                  onClick={() => handleOptionClick(obj)}
                >
                  <p className="choicePrefix">{obj.optionId}</p>
                  <p className="choiceText">{obj.text}</p>
                </div>
              );
            })}
          </div>
          <div className="buttonDiv">
            <button disabled={count == 0} onClick={() => prevQues()} className="quizBtn">
              Prev
            </button>
            {count + 1 == questionsList.length ? (
              <button onClick={() => subimtAns()} className="quizSubmitBtn">
                Submit
              </button>
            ) : (
              <button onClick={() => nextQues()} className="quizBtn">
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
