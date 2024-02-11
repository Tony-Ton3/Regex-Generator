import React, { useState } from "react";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { convertPromptToRegex, applyRegexToInputText } from "../api/geminiApi";
// import errorHandler from "../utils/error.js";

export default function InputForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({ regex: "", transformedText: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: String(e.target.value.trim()) });
    console.log(formData.prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.prompt || !formData.input) {
      // errorHandler(400, "Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    console.log("submitting form triggered");

    try {
      const regex = await convertPromptToRegex(formData.prompt);
      const transformedText = await applyRegexToInputText(regex, formData.input);
      console.log(regex);
      console.log(transformedText);
      setResults({ regex, transformedText });
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* info side*/}
        <div className="flex-1">
          <a className="self-center whitespace-nowrap text-4xl sm:text-4xl font-semibold dark:text-white">
            <span className="px-3 py-2 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white">
              Regex
            </span>
            Generator
          </a>
          <p className="text-sm mt-5 italic font-bold">
            Use the power of AI to generate regex pattern
          </p>
        </div>

        {/* input side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-5">
              <Label value="Write me a JavaScript regular expressions that..." />
              <TextInput
                type="text"
                placeholder='Enter a prompt -e.g "remove all words with a vowel"'
                id="prompt"
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <Label value="Enter a string:" />
              <TextInput
                type="text"
                placeholder="text..."
                id="input"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="w-80 bg-gradient-to-r from-emerald-500 to to-black"
                type="submit"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3"> Converting... </span>
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Generated Regex: {results.regex}</span>
          </div>
          {/* {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
}
