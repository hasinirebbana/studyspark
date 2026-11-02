
import { useState } from "react";

function QuizMode({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleAnswer(option) {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    setAnswers((previous) => [...previous, option]);

    if (option === currentQuestion.correctAnswer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (currentIndex + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((previous) => previous + 1);
      setSelectedAnswer("");
    }
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const wrongQuestions = questions.filter(
      (_, index) => answers[index] !== questions[index].correctAnswer
    );

    return (
      <div className="quiz-section">
        <h2>Quiz Completed!</h2>
        <p>Your score: {score} / {questions.length}</p>

        {wrongQuestions.length > 0 && (
          <button
            onClick={() => {
              setCurrentIndex(
                questions.findIndex(
                  (question) => answers[questions.indexOf(question)] !== question.correctAnswer
                )
              );
              setFinished(false);
              setSelectedAnswer("");
            }}
          >
            Review Incorrect Answers
          </button>
        )}

        <button onClick={restartQuiz}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-section">
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      <h3>{currentQuestion.question}</h3>

      {currentQuestion.options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={Boolean(selectedAnswer)}
          className={
            selectedAnswer && option === currentQuestion.correctAnswer
              ? "correct-answer"
              : selectedAnswer === option
              ? "wrong-answer"
              : ""
          }
        >
          {option}
        </button>
      ))}

      {selectedAnswer && (
        <div>
          <p>{currentQuestion.explanation}</p>
          <button onClick={nextQuestion}>
            {currentIndex + 1 === questions.length
              ? "See Results"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizMode;
