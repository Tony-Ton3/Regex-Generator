import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Assuming Gemini model

async function convertPromptToRegex(prompt) {
  try {
    const curPrompt = "Convert the following prompt to a regular expression: " + prompt;
    const result = await model.generateContent(curPrompt);
    const response = result.response;
    const regex = response.text();
    return regex;
  } catch (error) {
    console.error("Error converting prompt to regex:", error);
    throw error; 
  }
}

async function applyRegexToInputText(regex, inputText) {
  try{
    const curPrompt = "Apply the following regular expression to the following text: " + regex + " " + inputText;
    const result = await model.generateContent(curPrompt);
    const response = result.response;
    const convertedText = response.text();
    return convertedText;
  } catch (error) {
    console.error("Error applying regex to input text:", error);
    throw error;
  }
}

export { convertPromptToRegex, applyRegexToInputText };

