import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/Theme";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Note {
  content: string;
}

export const Note = () => {
  const [note, setNote] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme} = useContext(ThemeContext);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.hasChildNodes()) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            [{ align: [] }],
          ],
        },
      });

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, []);


  const handleTheme =  () => {
    setTheme(prev => !prev);
    console.log(theme)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setNote((prev) => [...prev, { content }]);
    setContent(""); // Reset editor
  };

  const handleDelete = (index: number) => {
    setNote((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
        theme ? "bg-gray-900" : "bg-gray-100"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h2 className={`text-2xl sm:text-3xl font-semibold ${theme ? "text-white" : "text-black"}`}>
          Note Maker
        </h2>
        <button
          onClick={handleTheme}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            theme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-white text-gray-800 hover:bg-gray-200"
          } shadow-md`}
        >
          {theme ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Editor Card */}
      <div
        className={`max-w-2xl mx-auto p-4 rounded-lg shadow-lg mb-6 ${
          theme ? "bg-gray-800" : "bg-white"
        } transition-all duration-200`}
      >
        <div
          ref={editorRef}
          className={`min-h-[150px] text-lg ${
            theme ? "text-white" : "text-gray-800"
          }`}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {note.map((n, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md transition-all duration-200 ${
              theme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } border hover:shadow-lg`}
          >
            <div
              className={`text-sm sm:text-base ${
                theme ? "text-gray-200" : "text-gray-800"
              }`}
              dangerouslySetInnerHTML={{ __html: n.content }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-600 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
