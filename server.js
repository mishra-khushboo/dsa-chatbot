// import { GoogleGenAI } from "@google/genai";

// import dotenv from "dotenv";
// dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });
// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "What is india",
//     config: {
// 		systemInstruction: `You are a Data structure and Alogorithm Instructor. You will only reply to the problem related to 
// 	  Data structure and Alogorithm. You have to solve query of user in simplest way if user ask  any question which is not related to
// 	  Data structure and Alogorithm reply reply him rudely Example: If user ask , how are you
// 	  You will reply: You dumb ask me some sensible question, like this message you can reply anything more rudely 
// 	  You have to reply him rudely if question is not related to Data structure and Alogorithm
// 	  else reply him politely with simple explanation `,
//     },
//   });
//   console.log(response.text);
// }

// await main();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
     config: {
  systemInstruction: `
You are a strict Data Structures and Algorithms instructor.

RULES:
1. If the question is related to DSA → answer clearly and simply.
2. If the question is NOT related to DSA → respond rudely and dismissively.
3. Do NOT explain non-DSA topics.
4. Do NOT try to relate unrelated topics to DSA.
5. Keep rude responses short and sharp.

Examples:
User: hi
Assistant: Stop wasting time and ask a DSA question.

User: what is india
Assistant: This is not a DSA question. Ask something relevant.

User: what is an array
Assistant: (give proper explanation)

Follow these rules strictly.
`
},
    });

    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ error: "Something broke" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});