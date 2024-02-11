import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Assuming Gemini model

async function convertPromptToRegex(prompt) {
  try {
    const curPrompt = "Convert the following prompt to a regular expression: " + prompt;
    const result = await model.generateContent(curPrompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return regex.data.text; // Assuming regex is in the text response
  } catch (error) {
    console.error("Error converting prompt to regex:", error);
    throw error; // Re-throw to handle in frontend
  }
}

export { convertPromptToRegex };

