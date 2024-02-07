import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuizStateContext } from "../../App";
import "./Quiz.css";

function Quiz(props) {
  const { indexState, question, length } = props;
  const { currIndex, setCurrentIndex } = indexState;

  const { quizState, setQuizState } = useContext(QuizStateContext);
  const navigate = useNavigate();

  const handleOptionClick = (selected) => {
    const selectedOption = question[`option${selected}`];

    handleQuizState(selectedOption, question);

    if (selectedOption === question.answer) {
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer!");
    }

    handleNextQues();
  };

  const handleQuizState = (selectedOption, question) => {
    const isCorrect = selectedOption === question.answer;
    const updatedAttemptedQuestions = [...quizState];

    const existingAttempt = updatedAttemptedQuestions.find(
      (attempted) => attempted.question === question.question
    );

    if (existingAttempt) {
      existingAttempt.selectedOption = selectedOption;
    } else {
      updatedAttemptedQuestions.push({
        question: question.question,
        selectedOption,
        isCorrect,
      });
    }

    setQuizState(updatedAttemptedQuestions);
  };

  const handleNextQues = () => {
    setCurrentIndex((currIndex + 1) % length);
  };

  const handlePrevQues = () => {
    setCurrentIndex((currIndex - 1 + length) % length);
  };

  const handleQuit = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      navigate("/");
    } else {
      console.log("Continue your quiz");
    }
  };

  return (
    <div className="quiz">
      <div className="container">
        <h2>Question</h2>
        <p className="track">
          <span>{currIndex + 1}</span> of <span>{length}</span>
        </p>
        <span className="ques">{question.question}</span>
        <div className="options">
          {["A", "B", "C", "D"].map((option) => (
            <div
              key={option}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {question[`option${option}`]}
            </div>
          ))}
        </div>
        <div className="action">
          <button className="prev" onClick={handlePrevQues}>
            Previous
          </button>
          <button className="next" onClick={handleNextQues}>
            Next
          </button>
          <button className="quit" onClick={handleQuit}>
            Quit
          </button>
          <Link to="/result" className="finish">
            Finish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
