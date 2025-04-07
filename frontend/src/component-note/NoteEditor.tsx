import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import React from "react";

export const NoteEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editorRef.current && !editorRef.current.hasChildNodes()) {
      const quill = new Quill(editorRef.current, { theme: "snow" });

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, []);

  return (
    <div>
      <div ref={editorRef} />
      <div className="preview" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
