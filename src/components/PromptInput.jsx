function PromptInput({ topic, setTopic, onGenerate, loading }) {
  return (
    <div className="prompt-section">
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic or paste your study notes..."
        rows="5"
      />

      <button
        onClick={onGenerate}
        disabled={loading || !topic.trim()}
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  );
}

export default PromptInput;
