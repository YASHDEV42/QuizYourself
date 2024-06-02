"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Quiz = ({ quiz }) => {
  const [selections, setSelections] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [result, setResult] = useState(false);
  const router = useRouter();
  const handleConfirm = () => {
    if (result) {
      router.push("/quizzes");
    }
  };

  const handleOptionChange = (questionIndex, selectedOptionIndex) => {
    setSelections({
      ...selections,
      [questionIndex]: selectedOptionIndex,
    });
  };

  const checkAnswers = () => {
    window.scrollTo(0, 0);
    let count = 0;
    quiz.questions.forEach((question, index) => {
      if (question.answer === selections[index]) {
        count++;
      }
    });
    setCorrectAnswers(count);
    setResult(true);
  };

  useEffect(() => {
    const initialSelections = {};
    quiz.questions.forEach((_, index) => {
      initialSelections[index] = null;
    });
    setSelections(initialSelections);
  }, [quiz.questions]);
  if (!quiz) return <div>Loading...</div>;
  return (
    <section id="takeQuiz">
      {!result ? (
        <div id="container">
          <h1 id="quizTitle">Quiz Title: {quiz.title}</h1>
          <div id="questions">
            {quiz.questions.map((question, index) => (
              <div key={index} id="question">
                <h2>
                  {index + 1}: {question.question}
                </h2>
                <ul>
                  {question.choices.map((option, optionIndex) => (
                    <li id="option" key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${index}`}
                          value={optionIndex}
                          checked={selections[index] === optionIndex}
                          onChange={() =>
                            handleOptionChange(index, optionIndex)
                          }
                        />
                        <span>
                          {optionIndex + 1}: {option}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button id="secondary-btn" onClick={checkAnswers}>
            Check Answers
          </button>
        </div>
      ) : (
        <div id="result">
          <h2>Total correct answers: {correctAnswers}</h2>
          <div>
            {quiz.questions.map((question, index) => (
              <h4 key={index}>
                Question {index + 1}:{" "}
                {question.answer === selections[index] ? (
                  <span id="correct">Correct</span>
                ) : (
                  <span id="incorrect">Incorrect</span>
                )}
              </h4>
            ))}
          </div>
          <button id="secondary-btn" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
          <button id="primary-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}
    </section>
  );
};

export default Quiz;
