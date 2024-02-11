import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";

export default function OutputForm() {
  const mdStr = `# output goes here`;
  return (
    <div className="mt-10 mb-40">
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      <div className="flex-1">
        <MarkdownEditor value={mdStr} height="300px" hideToolbar="false" onChange={(value, viewUpdate) => {}} />
      </div>
    </div>
    </div>
  );
}
