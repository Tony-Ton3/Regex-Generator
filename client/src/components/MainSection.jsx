import React, { useState } from "react";
import { motion } from "framer-motion";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { generateRegexFromPrompt, applyRegexToInputText } from "../api/geminiApi";

export default function MainSection() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({ regex: "", transformedText: "" });
  // const [prompted, setPrompted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: String(e.target.value.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.prompt && !formData.input) {
      setError("Please enter a prompt and input text.");
      return;
    } else if (formData.prompt.length > 256 || formData.input.length > 256) { //regex becomes error prone if prompt or input is too long
      setError("Prompt or input text must be less than 256 characters.");
      return;
    } 

    setLoading(true);
    setError(null);

    try {

      // if(!prompted){ //prompt the model only once on first generation
      //   const initial = await initialPrompt();
      //   setPrompted(true);
      //   console.log(initial);
      // }
      
      const regex = await generateRegexFromPrompt(formData.prompt);
      const transformedText = await applyRegexToInputText(regex, formData.input);

      console.log("REGEX: " + regex);
      console.log("OUTPUT: " + transformedText);

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

          {/* give fade in animation to display text */}
          <motion.div
            id="animated-text"
            className="text-sm mt-5 italic font-bold"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              layout: { display: "inline-block", letterSpacing: "-0.05em" },
              transition: { duration: 2.5 },
            }}
          >
            Simplify your regex creation process with AI.
          </motion.div>
          <div className="flex gap-2 text-sm mt-5">
            <span>Generated Regex: {results.regex}</span>
          </div>
        </div>

        {/* input side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label value="Generate a regular expressions that..." />
              <TextInput
                type="text"
                placeholder='Start prompt with "matches" or "extracts"'
                id="prompt"
                onChange={handleChange}
              />
              {formData.prompt && (
                <p className="text-xs opacity-50 mb-0">Character Count: {formData.prompt.length}</p>
              )}
            </div>
            <div className="mb-3">
              <Label value="Enter a string:" />
              <TextInput
                type="text"
                placeholder="text..."
                id="input"
                onChange={handleChange}
              />
              {formData.input && (
                <p className="text-xs opacity-50">Character Count: {formData.input.length}</p>
              )}

            </div>
            {error && ( //prompts user if error occurs
              <Alert className="m" color="failure">
                {error}
              </Alert>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                gradientDuoTone="tealToLime"
                size="xl"
                outline
              >
                {loading ? ( //loading will be false once the response is received
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
        </div>
      </div>

      {/* markdown editor where the output will be displayed */}
      <div className="mt-10 mb-40">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <MarkdownEditor
              value={results.transformedText}
              height="300px"
              hideToolbar="false"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
