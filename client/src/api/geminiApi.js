import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
let promptInject = "";

async function generateRegexFromPrompt(prompt) {
  try {

    const firstWord = prompt.split(" ")[0]; 
    
    if(firstWord == "matches"){
      promptInject = "Check if a text string matches the regular expression pattern and returns 'MATCHED' or 'DOES NOT EXIST' without explanation, if return value is 'MATCHED', in addition to this return value show where in the input text the match was found by displaying all of the input text and add asterisks around where the word matches, if matches is 'DOES NOT EXIST' return 'DOES NOT EXIST' without explanation, ignore punctuation and capitalization in input text";
    }else if(firstWord == "extracts"){
      promptInject = "Extract the first matching substring from the provided text based on a regular expression pattern, if there exists multiple matching substring list all matching substrings in a vertical list using '-', and return only the matching substring or substrings without explanation, if no match is found return 'not found'";
    }

    const initialPrompt = `Generate a basic and intuitive regular expression that matches the following pattern: ${prompt}. Please provide the regular expression in a format that can be easily copied and pasted into a regex-enabled text editor or programming language, DO NOT EXPLAIN THE GENERATED REGULAR EXPRESSION!, also take into consideration of upper and lowercase in input text`;
    const result = await model.generateContent(initialPrompt);
    const response = result.response;
    const regex = response.text();
    return regex;
  } catch (error) {
    console.error("Error generating regular expression from prompt:", error);
    throw error;
  }
}

async function applyRegexToInputText(regex, inputText) {
  try {
    const curPrompt = `Apply the following regular expression: ${regex} to the following text: ${inputText}, ${promptInject}`;
    const result = await model.generateContent(curPrompt);
    const response = result.response;
    const convertedText = response.text();
    return convertedText;
  } catch (error) {
    console.error("Error applying regex to input text:", error);
    throw error;
  }
}

export {generateRegexFromPrompt, applyRegexToInputText };
