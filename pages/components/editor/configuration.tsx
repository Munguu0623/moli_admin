import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import { StyleInlineTool } from "editorjs-style";
import Tooltip from "editorjs-tooltip";
import { CloudImage } from "./uploud-image/image";
import Paragraph from "@editorjs/paragraph";
import _ from "lodash/debounce";

type propType = {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
};

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Нийтлэлийн гарчиг !!!",
        },
      },
    ],
  };
};
const EDITTOR_HOLDER_ID = "editorjs";

const CustomEditor = (props: propType) => {
  const { setContent, content } = props;
  const isInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!isInstance.current) {
      initEditor();
    }
    return () => {
      if (isInstance.current) {
        isInstance.current.destroy();
        isInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
      onReady: () => {
        isInstance.current = editor;
      },
      onChange: () => {
        contents();
      },
      autofocus: true,
      tools: {
        style: StyleInlineTool,
        tooltip: {
          class: Tooltip,
          config: {
            location: "left",
            highlightColor: "#FFEFD5",
            underline: true,
            backgroundColor: "#154360",
            textColor: "#FDFEFE",
          },
        },
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1,
          },
        },
        paragraph: Paragraph,
        raw: RawTool,
        linkTool: LinkTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                return onFileChange(file).then((imageUrl) => {
                  return {
                    success: 1,
                    file: {
                      url: imageUrl,
                    },
                  };
                });
              },
            },
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        code: {
          class: CodeTool,
          inlineToolbar: true,
        },
      },
    });

    async function contents() {
      const output = await editor.save();
      const content = JSON.stringify(output);
      setContent(content);
    }
  };

  const onFileChange = async (file: File) => {
    // Implement your image upload logic here
  };

  return (
    <div className="Editor_class">
      <div id={EDITTOR_HOLDER_ID}></div>
    </div>
  );
};

export default CustomEditor;
