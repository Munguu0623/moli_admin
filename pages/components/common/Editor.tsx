import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Editor() {
  const [value, setValue] = useState("**нийтлэл бичэх хэсэг**");

  // Update the onChange function to handle the event object correctly
  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
  };

  return (
    <div>
      <MDEditor value={value} onChange={handleEditorChange} />
    </div>
  );
}

export default Editor;
