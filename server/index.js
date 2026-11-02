import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudySpark backend is running!");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        error: "Please enter a topic or notes.",
      });
    }

    const prompt = `
Generate 5 flashcards and 5 multiple-choice quiz questions
about the following topic:

${topic}

Return ONLY valid JSON in this exact format:

{
  "cards": [
    {
      "question": "Question here",
      "answer": "Answer here"
    }
  ],
  "quiz": [
    {
      "question": "Question here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation here"
    }
  ]
}

Rules:
- Generate exactly 5 flashcards.
- Generate exactly 5 quiz questions.
- Each quiz question must have 4 options.
- The correctAnswer must match one of the options exactly.
- Return valid JSON only, without markdown or extra text.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    if (
      !Array.isArray(result.cards) ||
      result.cards.length === 0 ||
      !result.cards.every(
        (card) =>
          typeof card.question === "string" &&
          typeof card.answer === "string"
      )
    ) {
      return res.status(502).json({
        error: "Invalid flashcard format returned by AI.",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Generation error:", error.message);

    res.status(500).json({
      error: "Unable to generate flashcards. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
