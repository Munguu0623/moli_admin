import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
interface EditorProps {
  // Other props here...
  value: string; // Add the value prop
  setValue: (newValue: string) => void;
}
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Editor({ value, setValue }: EditorProps) {

  // Update the onChange function to handle the event object correctly
  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };

  return (
      <MDEditor value={value} onChange={handleEditorChange} />
  );
}

export default Editor;
