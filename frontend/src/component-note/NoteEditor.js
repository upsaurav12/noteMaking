import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
export const NoteEditor = () => {
    const editorRef = useRef(null);
    const [content, setContent] = useState("");
    useEffect(() => {
        if (editorRef.current && !editorRef.current.hasChildNodes()) {
            const quill = new Quill(editorRef.current, { theme: "snow" });
            quill.on("text-change", () => {
                setContent(quill.root.innerHTML);
            });
        }
    }, []);
    return (_jsxs("div", { children: [_jsx("div", { ref: editorRef }), _jsx("div", { className: "preview", dangerouslySetInnerHTML: { __html: content } })] }));
};
