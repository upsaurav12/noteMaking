import { useContext, useState } from "react";
import { ThemeContext } from "../context/Theme";



interface Note {
  title: string;
  description: string;
}

export const Note = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [note, setNote] = useState<Note[]>([]);
  const themeState = useContext(ThemeContext);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim()) return;
      setNote((prev) => [...prev, { title, description }]);
      setTitle("");
      setDescription("");
  };

  const handleDelete = (index: number) => {
      setNote(note.filter((_, key) => key !== index));
  };

  const { theme, setTheme } = themeState;
  const handleTheme = () => {
      setTheme((prev) => !prev);
  };

  return (
      <div className={`max-w-2xl mx-auto p-6 ${theme ? 'bg-gray-800' : 'bg-gray-50'}  rounded-xl transition-all duration-300`}>
          {/* Toggle Theme Button */}
          <div className="flex justify-end mb-6">
              <button
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 
                      ${theme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={handleTheme}
              >
                  {theme ? '☀️ Light' : '🌙 Dark'}
              </button>
          </div>

          <h2 className={`text-3xl font-bold mb-6 text-center ${theme ? 'text-white' : 'text-gray-800'}`}>
              📝 Note Maker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                  <input
                      type="text"
                      className={`w-full p-3 rounded-lg border-2 outline-none ${theme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'} 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Note Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
              </div>
              <div className="relative">
                  <textarea
                      className={`w-full p-3 rounded-lg border-2 outline-none ${theme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'} 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                      placeholder="Your note description..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
              <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium 
                      hover:bg-blue-700 transition-all duration-200 active:scale-95"
              >
                  Add Note
              </button>
          </form>

          {note.length > 0 && (
              <div className="mt-8">
                  <h3 className={`text-xl font-semibold mb-4 ${theme ? 'text-gray-200' : 'text-gray-700'}`}>
                      📌 Your Notes ({note.length})
                  </h3>
                  <div className="space-y-4">
                      {note.map((n, index) => (
                          <div
                              key={index}
                              className={`p-4 rounded-lg shadow-md relative group transform transition-all duration-200 hover:-translate-y-1 
                                  ${theme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                          >
                              <h4 className="text-lg font-semibold mb-2">{n.title}</h4>
                              <p className={`${theme ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-wrap`}>
                                  {n.description}
                              </p>
                              <button
                                  onClick={() => handleDelete(index)}
                                  className="absolute top-2 right-2 text-red-500 hover:text-red-600 
                                      opacity-0 group-hover:opacity-100 transition-all duration-200"
                              >
                                  ✕
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>
  );
};