const API_URL = "https://studyspark-l8x6.onrender.com";

export async function generateFlashcards(topic) {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate flashcards.");
  }

  return data;
}
