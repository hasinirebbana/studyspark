function ProgressBar({ current, total }) {
  const percentage = total ? (current / total) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p>{current} of {total} cards reviewed</p>
    </div>
  );
}

export default ProgressBar;