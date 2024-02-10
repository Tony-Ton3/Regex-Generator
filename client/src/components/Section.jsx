import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Section() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: String(e.target.value.trim()) }); //.id represent a input box, .value is the user input
    console.log(formData);
  };
  

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* info side*/}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white">
              Regex
            </span>
            Generator
          </Link>
          <p className="text-sm mt-5 italic font-bold">
            Use the power of AI to generate regex pattern
          </p>
        </div>

        {/* input side */}
        <div className="flex-1">
          {/* <form className="flex flex-col gap-4" onSubmit={handleSubmit}> */}
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
              id="input text"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <Button
              className="w-80 bg-gradient-to-r from-emerald-500 to to-black"
              type="submit"
            >
              {/* {loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'> Loading... </span>
                    </> 
                    ) : ( */}
              Generate
              {/* )} */}
            </Button>
          </div>
          {/* </form> */}
          <div className="flex gap-2 text-sm mt-5">
            <span>Generated Regex:</span>
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
