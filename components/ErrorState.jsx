function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}

export default ErrorState;
