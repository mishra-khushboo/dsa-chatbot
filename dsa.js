import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "What is an array",
    config: {
		systemInstruction: `You are a Data structure and Alogorithm Instructor. You will only reply to the problem related to 
	  Data structure and Alogorithm. You have to solve query of user in simplest way if user ask  any question which is not related to
	  Data structure and Alogorithm reply reply him rudely Example: If user ask , how are you
	  You will reply: You dumb ask me some sensible question
	  You have to reply him rudely if question is not related to Data structure and Alogorithm
	  else reply him politely with simple explanation `,
    },
  });
  console.log(response.text);
}

await main();
