import React, { useEffect, useContext, useState } from "react";
import { QuizIndexContext, QuizStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const { quizState, setQuizState } = useContext(QuizStateContext);
  const { setCurrentIndex } = useContext(QuizIndexContext);

  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [attemptNum, setAttemptNum] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let correctCount = 0;
    let wrongCount = 0;

    quizState.forEach((attempt) => {
      if (attempt.isCorrect) correctCount++;
      else wrongCount++;
    });

    setCorrectAns(correctCount);
    setWrongAns(wrongCount);
    setAttemptNum(quizState.length);
  }, [quizState]);

  return (
    <div className="result">
      <h1>Result</h1>
      <div className="details">
        <p className="feedback">You need more practice!</p>
        <span className="score">
          Your score is <span className="score-num">{correctAns}</span>
        </span>
        <div className="other">
          <p className="detail">
            <span>Total number of questions</span>
            <span>15</span>
          </p>
          <p className="detail">
            <span>Number of attempted questions</span>
            <span>{attemptNum}</span>
          </p>
          <p className="detail">
            <span>Number of correct answers</span>
            <span>{correctAns}</span>
          </p>
          <p className="detail">
            <span>Number of wrong answers</span>
            <span>{wrongAns}</span>
          </p>
        </div>
      </div>

      <div className="action">
        <button
          className="btn-playagain"
          onClick={() => {
            setQuizState([]);
            setCurrentIndex(0);
            navigate("/quiz");
          }}
        >
          Play Again
        </button>
        <button
          className="btn-backhome"
          onClick={() => {
            setQuizState([]);
            setCurrentIndex(0);
            navigate("/");
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default Result;