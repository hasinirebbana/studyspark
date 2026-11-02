
import { useState } from "react";
import { generateFlashcards } from "./api";
import PromptInput from "./components/PromptInput";
import FlashcardDeck from "./components/FlashcardDeck";
import ProgressBar from "./components/ProgressBar";
import ErrorState from "./components/ErrorState";
import QuizMode from "./components/QuizMode";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(0);
  const [quiz, setQuiz] = useState([]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setCards([]);
    setReviewed(0);
    setQuiz([]);

    try {
      const data = await generateFlashcards(topic);
      setCards(data.cards);
      setQuiz(data.quiz);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>StudySpark</h1>
        <p>Your AI-powered study companion</p>
      </header>

      <main className="main-content">
        <section className="intro">
          <h2>Turn your notes into flashcards</h2>
          <p>Enter a topic or paste your notes to start learning.</p>
        </section>

        <PromptInput
          topic={topic}
          setTopic={setTopic}
          onGenerate={handleGenerate}
          loading={loading}
        />

        {loading && (
          <div className="loading-state">
            <p>Generating your flashcards...</p>
          </div>
        )}

        {error && (
          <ErrorState
            message={error}
            onRetry={handleGenerate}
          />
        )}

        {cards.length > 0 && (
          <section className="results-section">
            <h2>Your flashcards</h2>

            <ProgressBar
              current={reviewed}
              total={cards.length}
            />

            <FlashcardDeck cards={cards} />
            {quiz.length > 0 && (
  <QuizMode questions={quiz} />
)}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
