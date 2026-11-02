import { useState } from "react";

function FlashcardDeck({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  function nextCard() {
    setCurrentIndex((index) => (index + 1) % cards.length);
    setFlipped(false);
  }

  function previousCard() {
    setCurrentIndex((index) => (index - 1 + cards.length) % cards.length);
    setFlipped(false);
  }

  return (
    <div className="deck-section">
      <p>
        Card {currentIndex + 1} of {cards.length}
      </p>

      <div
        className="flashcard"
        onClick={() => setFlipped(!flipped)}
      >
        <h3>{flipped ? currentCard.answer : currentCard.question}</h3>
        <p>Click to {flipped ? "see question" : "reveal answer"}</p>
      </div>

      <div className="card-controls">
        <button onClick={previousCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default FlashcardDeck;